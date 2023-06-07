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
        'space_status'
    ];

    public function property()
    {
        return $this->belongsTo(Property::class);
    }
}
