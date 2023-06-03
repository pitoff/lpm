<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OccupantResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'firstname' => $this->user->firstname,
            'lastname' => $this->user->lastname,
            'email' => $this->user->email,
            'phone_no' => $this->phone_no,
            'gender' => $this->gender,
            'marital_status' => $this->marital_status,
            'year_in' => $this->year_in,
            'year_out' => $this->year_out,
        ];
    }
}
