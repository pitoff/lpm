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
            'year' => $this->year,
            'from' => $this->from,
            // 'from_month' => $this->getFromAttribute($this->from),
            'to' => $this->to,
            // 'to_month' => $this->getToAttribute($this->to),
            'paid_at' => $this->paid_at,
        ];
    }
}
