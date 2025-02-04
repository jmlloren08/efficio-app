<?php

namespace App\Http\Controllers;

use App\Models\Accomplishment;
use App\Models\Label;
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
            $accomplishments = $this->fetchAccomplishments($request);
            return inertia('Reports', ['accomplishments' => $accomplishments]);
        } catch (\Exception $e) {
            Log::error('Error fetching accomplishments: ' . $e->getMessage());
            return response()->json(['error' => 'Error fetching staff'], 500);
        }
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        try {
            $accomplishments = $this->fetchAccomplishments($request);
            $labels = Label::select('name')
                ->orderBy('name', 'asc')
                ->get();
            return inertia('Accomplishments/Create', [
                'labels' => $labels,
                'accomplishments' => $accomplishments
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching labels: ' . $e->getMessage());
            return response()->json(['error' => 'Error fetching labels'], 500);
        }
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
                'planned_hours_worked' => 'required|numeric',
                'actual_hours_worked' => 'required|numeric',
                'need_help' => 'required|boolean',
                'issues_or_concerns' => 'required|string|max:2000',
                'attachments' => 'required|' . ($request->input('attachment_type') === 'file' ? 'file|mimes:jpg,jpeg,png,pdf,ppt,pptx,xls,xlsx,doc,docx|max:2048' : 'string|url|max:1000'),
                'attachment_type' => 'required|string|in:file,link',
                'label' => 'required|string|max:255'
            ]);
            $attachmentPath = null;
            if ($request->hasFile('attachments')) {
                $attachmentPath = $request->file('attachments')->store('accomplishments', 'public');
            }
            Accomplishment::create([
                'user_id' => auth()->user()->id,
                'week_ending_date' => $validatedData['week_ending_date'],
                'accomplishments_this_week' => $validatedData['accomplishments_this_week'],
                'action_items_next_week' => $validatedData['action_items_next_week'],
                'planned_hours_worked' => $validatedData['planned_hours_worked'],
                'actual_hours_worked' => $validatedData['actual_hours_worked'],
                'need_help' => $validatedData['need_help'],
                'issues_or_concerns' => $validatedData['issues_or_concerns'],
                'attachments' => $attachmentPath ?? $validatedData['attachments'],
                'attachment_type' => $validatedData['attachment_type'] ?? null,
                'label' => $validatedData['label'] ?? null
            ]);
            return redirect(route('reports.create'))->with('success', "Well done! You've successfully submitted an accomplishment.");
        } catch (\Exception $e) {
            Log::error('Error creating Accomplishment: ' . $e->getMessage());
            return redirect(route('reports.index'))->with('error', "Error creating accomplishment: " . $e->getMessage());
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
    private function fetchAccomplishments(Request $request)
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
            return Accomplishment::whereHas('user', function ($query) use ($officeIds, $userRole, $user) {
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
                    'planned_hours_worked',
                    'actual_hours_worked',
                    'need_help',
                    'issues_or_concerns',
                    'attachments',
                    'label',
                    'updated_at',
                    'user_id'
                )
                ->latest('week_ending_date')
                ->paginate(10);
        } catch (\Exception $e) {
            Log::error('Error fetching accomplishments: ' . $e->getMessage());
            return response()->json(['error' => 'Error fetching accomplishments'], 500);
        }
    }
    private function getOfficeDescendants($officeId)
    {
        try {
            $descendants = collect();
            // Fetch direct children of the given office
            $childOffices = Office::where('parent_id', $officeId)->pluck('id');
            foreach ($childOffices as $childId) {
                $descendants->push($childId);
                // Recursively fetch descendants of child offices
                $descendants = $descendants->merge($this->getOfficeDescendants($childId));
            }
            return $descendants;
        } catch (\Exception $e) {
            Log::error('Error fetching office descendants: ' . $e->getMessage());
            return response()->json(['error' => 'Error fetching office descendants'], 500);
        }
    }
}