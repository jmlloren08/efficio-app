<?php

namespace App\Http\Controllers;

use App\Jobs\ProcessOllamaRequest;
use App\Models\Accomplishment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class OllamaController extends Controller
{
    public function getOllamaResponse(Request $request)
    {
        try {
            $validatedQuery = $request->validate([
                'query' => 'required|string|max:2000',
            ]);
            // Fetch data from database
            $fetchData = Cache::remember('accomplishments', 3600, function () {
                return Accomplishment::select('week_ending_date', 'accomplishments_this_week', 'action_items_next_week', 'planned_hours_worked', 'actual_hours_worked',  'need_help', 'issues_or_concerns', 'label')
                    ->latest('week_ending_date')
                    ->take(10) // Limit to the last 100 accomplishments
                    ->get();
            });
            // Summarize the data to reduce its size
            $summarizedData = $fetchData->map(function ($item) {
                return [
                    'week_ending_date' => $item->week_ending_date,
                    'summary' => substr($item->accomplishments_this_week, 0, 100)
                ];
            });
            // Prepare the input prompt for Ollama
            $inputPrompt = "Based on the following data: "  . "\n" . json_encode($summarizedData) . "\n" . "Answer the following question: " . "\n" . $validatedQuery['query'];
            // Log::info($inputPrompt);
            // Generate a unique request ID
            $requestId = uniqid('ollama_');
            // Dispatch the Ollama processing job asynchronously
            ProcessOllamaRequest::dispatch($inputPrompt, $requestId)->onQueue('ollama');
            // Return response
            return response()->json([
                'message' => 'Your request is being processed. Please wait...',
                'request_id' => $requestId
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching Ollama response: ' . $e->getMessage());
            return response()->json(['message' => 'Error fetching Ollama response'], 500);
        }
    }
    public function checkOllamaResult($requestId)
    {
        // Fetch the result from the database or cache
        $result = Cache::get('ollama_result_' . $requestId);
        // Log::info("Checking result for: $requestId, Found: " . ($result ? 'Yes' : 'No'));
        if ($result) {
            return response()->json([
                'status' => 'completed',
                'response' => $result
            ]);
        } else {
            return response()->json([
                'status' => 'pending'
            ]);
        }
    }
}
