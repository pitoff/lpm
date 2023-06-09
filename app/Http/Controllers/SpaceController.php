<?php

namespace App\Http\Controllers;

use App\Http\Requests\SpaceRequest;
use App\Http\Requests\UpdateSpaceRequest;
use App\Http\Resources\CreatePropertyResource;
use App\Http\Resources\SpaceResource;
use App\Models\Occupant;
use App\Models\Property;
use App\Models\Space;
use Illuminate\Http\Request;
use App\Traits\ApiResponse;
use Illuminate\Support\Facades\Validator;

class SpaceController extends Controller
{
    use ApiResponse;

    public function index()
    {
        $properties = Property::all();
        return $this->success(CreatePropertyResource::collection($properties), "List of properties", 200);
    }

    public function propertySpaces($property)
    {
        $spaces = Space::where('property_id', $property)->get();
        return $this->success(SpaceResource::collection($spaces), "List of spaces", 200);
    }

    public function emptySpaces($property)
    {
        $spaces = Space::where('property_id', $property)->where('space_status', 0)->get();
        return $this->success(SpaceResource::collection($spaces), "List of empty spaces", 200);
    }

    public function spaceStatus()
    {
        //return all space status
        $status = [
            ['id' => "1", 'name' => "Occupied"],
            ['id' => "0", 'name' => "Empty"]
        ];
        return $this->success($status, "status list", 200);
    }

    public function store(SpaceRequest $request)
    {
        try {
            $validatedData = $request->validated();
            //use array_column to get the property of an object in  array
            $propertySpaces = array_column($validatedData['spaces'], 'property_id');
            //get number of spaces for the property
            $spaces = Property::where('id', $propertySpaces[0])->value('num_of_space');
            //get already created spaces with the property_id
            $createdSpaces = Space::where('property_id', $propertySpaces[0])->count();
            //get about to create space count
            $newSpaceCount = count($validatedData['spaces']);

            if (($newSpaceCount + $createdSpaces) > $spaces) {
                return $this->error("Sorry you can no longer create space for this property", 400);
            }

            $newData = $validatedData['spaces'];
            $currentDateTime = now();
            $spaceData = [];

            foreach ($newData as $data) {
                $data['created_at'] = $currentDateTime;
                $data['updated_at'] = $currentDateTime;
                $spaceData[] = $data;
            }
            $space = Space::insert($spaceData);
            return $this->success($space, "Space created successfully", 201);
        } catch (\Throwable $th) {
            //throw $th;
            return $this->error($th->getMessage(), 400);
        }
    }

    public function show(Space $space)
    {
        return $this->success(new SpaceResource($space), 'Property space retrieved', 200);
    }

    public function update(Space $space, UpdateSpaceRequest $request)
    {
        try {
            $space->update($request->validated());
            return $this->success(new SpaceResource($space), "space updated", 200);
        } catch (\Throwable $th) {
            //throw $th;
            return $this->error($th, 400);
        }
    }

    public function destroy()
    {
    }
}
