<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    use HasFactory;

    protected $fillable = [
        'property_type_id',
        'p_name',
        'num_of_space',
        'p_desc',
        'state_id',
        'lga_id',
        'p_city',
        'p_address',
        'p_image',
        'created_by',
        'updated_by',
        'deleted_by'
    ];

    public function propertyType()
    {
        return $this->belongsTo(PropertyType::class);
    }

    public function state()
    {
        return $this->belongsTo(State::class);
    }

    public function lga()
    {
        return $this->belongsTo(LGA::class);
    }

    public function space()
    {
        return $this->hasMany(Space::class);
    }

}
