<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SpaceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'spaces' => "present|array",
            'spaces.*.property_id' => 'required|integer',
            'spaces.*.space_name' => 'required|string',
            'spaces.*.space_description' => 'required|string',
            'spaces.*.space_price' => 'required',
            'spaces.*.space_status' => 'required',
        ];
    }
}
