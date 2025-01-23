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
        'issues_or_concerns',
        'attachments',
        'label'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}