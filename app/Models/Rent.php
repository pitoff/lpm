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
        'space_amount',
        'monthly_price',
        'amount_paid',
        'remaining',
        'payment_method_id',
        'year',
        'from',
        'to',
        'paid_at',
        'payment_status'
    ];

    public function occupant()
    {
        return $this->belongsTo(Occupant::class);
    }

    public function space()
    {
        return $this->belongsTo(Space::class);
    }

    public function paymentMethod()
    {
        return $this->belongsTo(PaymentMethod::class);
    }

    public function getAmountPaidAttribute($value)
    {
        return number_format($value, 2);
    }

    public function getFromAttribute($value)
    {
        return date('F-Y', strtotime($value));
    }

    public function getToAttribute($value)
    {
        return date('F-Y', strtotime($value));
    }
}
