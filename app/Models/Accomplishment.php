<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Accomplishment extends Model
{
    protected $fillable = [
        'user_id',
        'week_ending_date',
        'accomplishments_this_week',
        'action_items_next_week',
        'planned_hours_worked',
        'actual_hours_worked',
        'need_help',
        'issues_or_concerns',
        'attachments',
        'attachment_type',
        'label'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}