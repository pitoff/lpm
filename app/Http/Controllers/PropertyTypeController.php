<?php

namespace App\Http\Controllers;

use App\Http\Requests\PropertyTypeRequest;
use App\Http\Resources\PropertyTypeResource;
use App\Models\PropertyType;
use Illuminate\Http\Request;
use App\Traits\ApiResponse;

class PropertyTypeController extends Controller
{
    use ApiResponse;

    /**
     * @OA\Get(
     *      path="/property-type",
     *      tags={"Property Type"},
     *      summary="List of property type",
     *      description="Returns list of property types",
     *      security={ {"bearer_token": {} }},
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *          
     *       ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthorized",
     *      ),
     *      @OA\Response(
     *          response=403,
     *          description="Forbidden"
     *      )
     *     )
     */
    public function index()
    {
        return $this->success(PropertyTypeResource::collection(PropertyType::all()), "Property types retrieved", 200);
    }

    /**
     * @OA\Post(
     *      path="/property-type",
     *      operationId="storePropertyType",
     *      tags={"Property Type"},
     *      summary="Store new property type",
     *      description="Returns property type data",
     *      security={ {"bearer_token": {} }},
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="#/components/schemas/PropertyTypeRequest")
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Successful operation",
     *          @OA\JsonContent(ref="#/components/schemas/PropertyType")
     *       ),
     *      @OA\Response(
     *          response=400,
     *          description="Bad Request"
     *      ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthenticated",
     *      ),
     *      @OA\Response(
     *          response=403,
     *          description="Forbidden"
     *      )
     * )
     */
    public function store(PropertyTypeRequest $request)
    {
        // $data = $request->validated();
        try {
            $propertyType = PropertyType::create($request->validated());
            if ($propertyType) {
                return $this->success(new PropertyTypeResource($propertyType), "Property types created successfully", 200);
            }
        } catch (\Throwable $th) {
            return $th;
        }

        // return $this->error("", 400);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
