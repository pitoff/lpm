<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Space extends Model
{
    use HasFactory;

    protected $fillable = [
        'property_id',
        'space_name',
        'space_description',
        'space_price',
        'monthly_price',
        'space_status'
    ];

    public function spaceStatus()
    {
        return $this->space_status === 1 ? 'Occupied' : 'Empty';
    }

    public function property()
    {
        return $this->belongsTo(Property::class);
    }

    public function assignSpace()
    {
        return $this->hasMany(AssignSpace::class);
    }

    // public function occupant()
    // {
    //     return $this->belongsTo(Occupant::class);
    // }
}
