<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CreateRentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'occupant_id' => $this->occupant_id,
            'occupant' => $this->occupant->user,
            'space_id' => $this->space_id,
            'space' => $this->space,
            'property' => $this->space->property,
            'amount_paid' => $this->amount_paid,
            'originalAmountPaid' => $this->originalAmountAttribute(),
            'year' => $this->year,
            'from' => $this->from,
            'originalFrom' => $this->originalFromAttribute(),
            'to' => $this->to,
            // 'originalTo' => $this->originalToAttribute(),
            'paid_at' => $this->paid_at,
            'payment_method_id' => $this->payment_method_id
        ];
    }

    protected function originalFromAttribute()
    {
        // Retrieve the original (unmodified) attribute value
        return $this->resource->getRawOriginal('from');
    }

    // protected function originalToAttribute()
    // {
    //     return $this->resource->getRawOriginal('to');
    // }

    protected function originalAmountAttribute()
    {
        return $this->resource->getRawOriginal('amount_paid');
    }

}
