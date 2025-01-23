<?php

namespace App\Http\Controllers;

use App\Models\Office;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class OfficeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $offices = Office::select('id', 'name')
                ->orderBy('name', 'asc')
                ->get();

            return response()->json($offices);
        } catch (\Exception $e) {
            Log::error('Error fetching offices: ' . $e->getMessage());
            return response()->json(['error' => 'Error fetching offices'], 500);
        }
    }
    public function getSubOffices(Request $request)
    {
        try {
            $officeId = $request->office_id;
            $subOffices = Office::select('parent_id', $officeId)->get(['id', 'name']);
            return response()->json($subOffices);
        } catch (\Exception $e) {
            Log::error('Error fetching sub offices: ' . $e->getMessage());
            return response()->json(['error' => 'Error fetching sub offices'], 500);
        }
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Office $office)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Office $office)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Office $office)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Office $office)
    {
        //
    }
}
