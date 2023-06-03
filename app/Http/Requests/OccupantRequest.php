<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OccupantRequest extends FormRequest
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
            'firstname' => 'required',
            'lastname' => 'required',
            'email' => 'nullable|unique:users,email',
            'phone_no' => 'required|unique:occupants,phone_no',
            'gender' => 'required',
            'marital_status' => 'nullable',
            'year_in' => 'required',
            'year_out' => 'nullable',
            'image_url' => 'nullable',
        ];
    }
}
