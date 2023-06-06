<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;

class CreatePropertyResource extends JsonResource
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
            'property_type_id' => $this->propertyType->id,
            'property_type_name' => $this->propertyType->name,
            'p_name' => $this->p_name,
            'num_of_space' => $this->num_of_space,
            'p_desc' => $this->p_desc,
            'state_id' => $this->state->id,
            'lga_id' => $this->lga->id,
            'p_city' => $this->p_city,
            'p_address' => $this->p_address,
            'image_url' => $this->p_image ? URL::to($this->p_image) : null,
        ];
    }
}
