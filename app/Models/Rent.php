<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rent extends Model
{
    use HasFactory;

    public $fillable = [
        'occupant_id',
        'space_id',
        'amount_paid',
        'year',
        'from',
        'to',
        'paid_at',
        'payment_status'
    ];
}
