<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     title="Property Type",
 *     description="Property type model",
 *     @OA\Xml(
 *         name="Property type"
 *     )
 * )
 */

class PropertyType extends Model
{
    use HasFactory;

    /**
     * @OA\Property(
     *      title="name",
     *      description="Name of the new property type",
     *      example="Hotel"
     * )
     *
     * @var string
     */
    private $name;

    /**
     * @OA\Property(
     *      title="description",
     *      description="Description of the new property type",
     *      example="Hotel"
     * )
     *
     * @var string
     */
    private $description;

    protected $fillable = [
        'name',
        'description',
    ];
}
