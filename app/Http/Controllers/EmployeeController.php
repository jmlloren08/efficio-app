<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class EmployeeController extends Controller
{
    public function index()
    {
        try {

            $employees = Employee::where('name', 'email', 'status')->get();

            return response()->json($employees);
        } catch (\Exception $e) {
            Log::error('Error fetching employees: ' . $e->getMessage());
            return response()->json(['error' => 'Error fetching employees'], 500);
        }
    }
    public function store(Request $request)
    {
        try {

            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:employees'
            ]);

            Employee::create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email']
            ]);

            return response()->json(['message' => 'Employee added successfully']);
        } catch (\Exception $e) {
            Log::error('Error creating employee: ' . $e->getMessage());
            return response()->json(['error' => 'Error creating employee'], 500);
        }
    }
    public function update(Request $request, Employee $employee)
    {
        try {

            if (!$employee) {
                return response()->json(['message' => 'Employee not found'], 404);
            }

            $validatedData = $request->validate(['status' => 'required']);

            $employee->update(['status' => $validatedData['status']]);

            return redirect()->back();
        } catch (\Exception $e) {
            Log::error('Error updating employee: ' . $e->getMessage());
            return response()->json(['error' => 'Error updating employee'], 500);
        }
    }
    public function destroy(Employee $employee)
    {
        try {
        } catch (\Exception $e) {
            Log::error('Error deleting employee: ' . $e->getMessage());
            return response()->json(['error' => 'Error deleting employee'], 500);
        }
    }
}
