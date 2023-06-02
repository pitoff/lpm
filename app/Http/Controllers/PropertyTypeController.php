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
     *      operationId="getPropertyTypeList",
     *      tags={"Property Type"},
     *      summary="List of property type",
     *      description="Returns list of property types",
     *      security={ {"bearer_token": {} }},
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *          @OA\JsonContent(ref="#/components/schemas/PropertyTypeResource")
     *       ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthenticated",
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
        try {
            $propertyType = PropertyType::create($request->validated());
            return $this->success(new PropertyTypeResource($propertyType), "Property types created successfully", 200);
        } catch (\Throwable $th) {
            // return $th;
            return $this->error($th, 400);
        }

    }

    public function show(string $id)
    {
        //
    }

    /**
     * @OA\Put(
     *      path="/property-type/{id}",
     *      operationId="updateProperyType",
     *      tags={"Property Type"},
     *      summary="Update existing property type",
     *      description="Returns updated property type data",
     *      security={ {"bearer_token": {} }},
     *      @OA\Parameter(
     *          name="id",
     *          description="Property type id",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="integer"
     *          )
     *      ),
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="#/components/schemas/PropertyTypeRequest")
     *      ),
     *      @OA\Response(
     *          response=202,
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
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Resource Not Found"
     *      )
     * )
     */
    public function update(PropertyTypeRequest $request, PropertyType $propertyType)
    {
        try {
            $propertyType->update($request->validated());
            return $this->success(new PropertyTypeResource($propertyType), "property type updated", 200);
        } catch (\Throwable $th) {
            //throw $th;
            return $this->error($th, 400);
        }
    }

    /**
     * @OA\Delete(
     *      path="/property-type/{id}",
     *      operationId="deleteProperyType",
     *      tags={"Property Type"},
     *      summary="delete existing property type",
     *      description="Deletes record and returns no content",
     *      security={ {"bearer_token": {} }},
     *      @OA\Parameter(
     *          name="id",
     *          description="Project id",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="integer"
     *          )
     *      ),
     *      @OA\Response(
     *          response=204,
     *          description="Successful operation",
     *          @OA\JsonContent()
     *       ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthenticated",
     *      ),
     *      @OA\Response(
     *          response=403,
     *          description="Forbidden"
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Resource Not Found"
     *      )
     * )
     */
    public function destroy(PropertyType $propertyType)
    {
        try {
            $propertyType->delete();
            return $this->success("", "property type deleted", 200);
        } catch (\Exception $e) {
            return $this->error($e->getMessage(), 400);
        }
        
    }
}
