<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SpaceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'property_id' => $this->property->id,
            'space_name' => $this->space_name,
            'space_description' => $this->space_description,
            'space_price' => $this->space_price,
            'space_status' => $this->space_status,
        ];
    }
}
