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
        'p_state',
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

}
