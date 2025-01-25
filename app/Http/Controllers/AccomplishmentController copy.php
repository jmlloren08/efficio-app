<?php

namespace App\Http\Controllers;

use App\Models\Accomplishment;
use App\Models\Office;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AccomplishmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $user = $request->user();
            $officeId = $user->office_id;
            $userRole = $user->user_role;
            // Determine accessible office IDs based on user role
            $officeIds = collect();
            // Handle different cases based on role
            switch ($userRole) {
                case 'Secretary':
                    // Secretary can view all accomplishments across all offices
                    $officeIds = $this->getOfficeDescendants(null);
                    break;
                case 'Undersecretary':
                    // Undersecretary can view all under the user's office and its descendants
                    $officeIds = $this->getOfficeDescendants($officeId)->prepend($officeId);
                    break;
                case 'Director':
                    // Director can view all accomplishments under their office and its descendants
                    $officeIds = $this->getOfficeDescendants($officeId)->prepend($officeId);
                    break;
                case 'Division Chief':
                    // Division Chief can view only their immediate office and its users
                    $officeIds->push($officeId);
                    break;
                case 'Staff':
                    // Staff can view only their own accomplishments
                    $officeIds->push($officeId);
                    break;
                default:
                    // If no specific role, restrict to own accomplishments
                    $officeIds->push($officeId);
                    break;
            }
            // Fetch accomplishments for users in those offices
            $accomplishments = Accomplishment::whereHas('user', function ($query) use ($officeIds, $userRole, $user) {
                if ($userRole === 'Staff') {
                    $query->where('id', $user->id); // Staff sees only their own accomplishments
                } else {
                    $query->whereIn('office_id', $officeIds);
                }
            })
                ->with('user:id,name,office_id,user_role')
                ->select(
                    'week_ending_date',
                    'accomplishments_this_week',
                    'action_items_next_week',
                    'issues_or_concerns',
                    'attachments',
                    'label',
                    'user_id'
                )
                ->orderBy('week_ending_date', 'desc')
                ->get();

            return inertia('Reports', ['accomplishments' => $accomplishments]);

            dd($accomplishments);
        } catch (\Exception $e) {
            Log::error('Error fetching accomplishments: ' . $e->getMessage());
            return response()->json(['error' => 'Error fetching staff'], 500);
        }
    }
    private function getOfficeDescendants($officeId)
    {
        $descendants = collect();
        // Fetch direct children of the given office
        $childOffices = Office::where('parent_id', $officeId)->pluck('id');
        foreach ($childOffices as $childId) {
            $descendants->push($childId);
            // Recursively fetch descendants of child offices
            $descendants = $descendants->merge($this->getOfficeDescendants($childId));
        }
        return $descendants;
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
        try {

            $validatedData = $request->validate([
                'week_ending_date' => 'required|date|date_format:Y-m-d',
                'accomplishments_this_week' => 'required|string|max:2000',
                'action_items_next_week' => 'required|string|max:2000',
                'issues_or_concerns' => 'required|string|max:2000',
                'attachments' => 'nullable|file|mimes:jpg,jpeg,png,pdf,ppt,pptx,xls,xlsx,doc,docx|max:2048',
                'label' => 'nullable|string|max:255',
            ]);

            if (!$validatedData) {
                return response()->json(['error' => 'Validation failed'], 422);
            }

            $attachmentPath = null;
            if ($request->hasFile('attachments')) {
                $attachmentPath = $request->file('attachments')->store('accomplishments', 'public');
            }

            Accomplishment::create([
                'user_id' => auth()->user()->id,
                'week_ending_date' => $validatedData['week_ending_date'],
                'accomplishments_this_week' => $validatedData['accomplishments_this_week'],
                'action_items_next_week' => $validatedData['action_items_next_week'],
                'issues_or_concerns' => $validatedData['issues_or_concerns'],
                'attachments' => $attachmentPath ?? null,
                'label' => $validatedData['label'] ?? null
            ]);

            return response()->json(['message' => 'Accomplishment added successfully']);
        } catch (\Exception $e) {
            Log::error('Error creating Accomplishment: ' . $e->getMessage());
            return response()->json(['error' => 'Error creating Accomplishment'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Accomplishment $accomplishment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Accomplishment $accomplishment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Accomplishment $accomplishment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Accomplishment $accomplishment)
    {
        //
    }
}
