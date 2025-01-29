<?php

namespace App\Http\Controllers;

use App\Models\Accomplishment;
use Illuminate\Http\Request;
use Illuminate\Process\Exceptions\ProcessFailedException;
use Illuminate\Support\Facades\Log;
use Symfony\Component\Process\Process;

class OllamaController extends Controller
{
    public function getOllamaResponse(Request $request)
    {
        try {
            $validatedQuery = $request->validate([
                'query' => 'required|string|max:2000',
            ]);
            // Fetch data from database
            $fetchData = Accomplishment::select('week_ending_date', 'accomplishments_this_week', 'action_items_next_week', 'planned_hours_worked', 'actual_hours_worked',  'need_help', 'issues_or_concerns', 'label')
                ->orderBy('week_ending_date', 'desc')
                ->get();
            // Prepare the input prompt for Ollama
            $inputPrompt = "Based on the following data: "  . "\n" . json_encode($fetchData) . "\n" . "Answer the following question: " . "\n" . $validatedQuery['query'];
            Log::info($inputPrompt);
            // Prepare the command
            $command = ['ollama', 'run', 'llama3.2:1b-instruct-fp16', $inputPrompt];
            // Execute the command
            $process = new Process($command);
            $process->run();

            if (!$process->isSuccessful()) {
                Log::error('Error running Ollama command: ' . $process->getErrorOutput());
                throw new ProcessFailedException($process);
            }
            // Get the response from Ollama
            $response = $process->getOutput();
            // Return the response as JSON
            return response()->json(['message' => $response]);
        } catch (\Exception $e) {
            Log::error('Error fetching Ollama response: ' . $e->getMessage());
            return response()->json(['message' => 'Error fetching Ollama response'], 500);
        }
    }
}
