<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreatePropertyRequest extends FormRequest
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
            'property_type_id' => 'required',
            'p_name' => 'required|string',
            'num_of_space' => 'required|numeric',
            'p_desc' => 'required',
            'state_id' => 'required',
            'lga_id' => 'required',
            'p_city' => 'required|string',
            'p_address' => 'required|string',
            'p_image' => 'nullable',
        ];
    }
}
