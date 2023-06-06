<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LGA extends Model
{
    use HasFactory;

    protected $fillable = [
        'state_id', 'lga'
    ];

    public function state()
    {
        return $this->belongsTo(State::class);
    }
}
