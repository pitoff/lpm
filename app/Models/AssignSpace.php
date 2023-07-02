<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssignSpace extends Model
{
    use HasFactory;

    public $fillable = [
        'occupant_id',
        'property_id',
        'space_id',
        'assign_status'
    ];

    public function space()
    {
        return $this->belongsTo(Space::class);
    }

    // public function occupant()
    // {
    //     return $this->belongsTo(Occupant::class);
    // }
}
