<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;

class PropertySpaceAndOccupantResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $spacesArray = [];

        foreach ($this->space as $space) {
            $spaceArray = [
                'id' => $space->id,
                'space_name' => $space->space_name,
                'space_description' => $space->space_description,
                'space_price' => $space->space_price,
                'monthly_price' => $space->monthly_price,
                'space_status' => $space->space_status,
                'created_at' => $space->created_at,
                'updated_at' => $space->updated_at,
                'occupant' => $space->assignSpace,
            ];
    
            $spacesArray[] = $spaceArray;
        }

        return [
            'id' => $this->id,
            'property_type_name' => $this->propertyType->name,
            'p_name' => $this->p_name,
            'num_of_space' => $this->num_of_space,
            'p_desc' => $this->p_desc,
            'state_id' => $this->state->id,
            'lga_id' => $this->lga->id,
            'p_city' => $this->p_city,
            'p_address' => $this->p_address,
            'image_url' => $this->p_image ? URL::to($this->p_image) : null,
            'spaces' => $spacesArray,
        ];
    }
}
