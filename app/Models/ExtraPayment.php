<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExtraPayment extends Model
{
    use HasFactory;

    protected $fillable = [
        'rent_id',
        'amount',
        'description',
    ];
}
