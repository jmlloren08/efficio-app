<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

class ProcessOllamaRequest implements ShouldQueue
{
    use Queueable, Dispatchable, InteractsWithQueue, SerializesModels;
    protected $inputPrompt;
    protected $requestId;
    /**
     * Create a new job instance.
     */
    public function __construct($inputPrompt, $requestId)
    {
        $this->inputPrompt = $inputPrompt;
        $this->requestId = $requestId;
    }
    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            // Log::info('Processing Ollama request with input: ' . $this->inputPrompt);
            // Prepare the command
            $command = ['ollama', 'run', 'llama3.2:1b-instruct-fp16', $this->inputPrompt];
            // Execute the command
            $process = new Process($command);
            $process->run();
            // Check if the process is unsuccessful
            if (!$process->isSuccessful()) {
                Log::error('Error running Ollama command: ' . $process->getErrorOutput());
                throw new ProcessFailedException($process);
            }
            // Get the response from Ollama
            $response = trim($process->getOutput());
            // Save the response to the cache
            Cache::put('ollama_result_' . $this->requestId, $response, 3600);
            // Log::info('Ollama response: ' . $response);
        } catch (\Exception $e) {
            Log::error('Error processing Ollama request: ' . $e->getMessage());
        }
    }
}
