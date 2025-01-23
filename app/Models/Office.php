<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Office extends Model
{
    protected $fillable = [
        'name',
        'parent_id'
    ];
    public function parent()
    {
        return $this->belongsTo(Office::class, 'parent_id');
    }
    public function children()
    {
        return $this->hasMany(Office::class, 'parent_id');
    }
    public function users()
    {
        return $this->hasMany(User::class);
    }
    public function suboffices()
    {
        return $this->hasMany(SubOffice::class);
    }
}
