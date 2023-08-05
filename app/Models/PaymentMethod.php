<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentMethod extends Model
{
    use HasFactory;

    public $fillable = [
        'bank',
        'acc_number',
        'acc_name',
        'is_active'
    ];

    public function rent()
    {
        return $this->hasMany(Rent::class);
    }
}
