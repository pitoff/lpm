<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateRentRequest extends FormRequest
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
            'occupant_id' => 'required',
            'space_id' => 'required',
            'amount_paid' => 'required',
            'payment_method_id' => 'required',
            'from' => 'required',
            'paid_at' => 'required',
        ];
    }
}
