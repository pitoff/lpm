<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @OA\Schema(
 *      title="Store Property type request",
 *      description="Store Property type request body data",
 *      type="object",
 *      required={"name"}
 * )
 */
class PropertyTypeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @OA\Property(
     *      title="name",
     *      description="Name of the new property type",
     *      example="Hotel"
     * )
     *
     * @var string
     */
    public $name;

    /**
     * @OA\Property(
     *      title="description",
     *      description="Description of the new property type",
     *      example="Hotel"
     * )
     *
     * @var string
     */
    public $description;

    public function rules(): array
    {
        return [
            'name' => "required|string",
            "description" => "required"
        ];
    }
}
