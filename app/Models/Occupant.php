<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Occupant extends Model
{
    use HasFactory;

    public $fillable = [
        'user_id',
        'phone_no',
        'gender',
        'marital_status',
        'year_in',
        'year_out',
        'image'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // public function space()
    // {
    //     return $this->hasMany(Space::class);
    // }

    public function getFullNameAttribute()
    {
        return ucfirst($this->user->lastname).' '.ucfirst($this->user->firstname);
    }

    public function assignSpace()
    {
        return $this->hasMany(AssignSpace::class);
    }

}
