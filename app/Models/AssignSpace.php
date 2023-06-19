<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssignSpace extends Model
{
    use HasFactory;

    protected $fillable = [
        'occupant_id',
        'property_id',
        'space_id',
    ];
}
