<?php

namespace App\Http\Controllers;

use App\Http\Requests\SpaceRequest;
use App\Http\Resources\CreatePropertyResource;
use App\Http\Resources\SpaceResource;
use App\Models\Property;
use App\Models\Space;
use Illuminate\Http\Request;
use App\Traits\ApiResponse;

class SpaceController extends Controller
{
    use ApiResponse;

    public function index()
    {
        $spaces = Property::with('space')->get();
        return $this->success(CreatePropertyResource::collection($spaces), "List of spaces", 200);
    }

    public function spaceStatus()
    {
        //return status for space
    }

    public function store(SpaceRequest $request)
    {
        try {
            $space = Space::create($request->validated());
            return $this->success(new SpaceResource($space), "Space created successfully", 200);
        } catch (\Throwable $th) {
            //throw $th;
            return $this->error($th->getMessage(), 400);
        }
    }

    public function show()
    {

    }

    public function update()
    {

    }

    public function destroy()
    {

    }

    public function propertySpaces()
    {

    }
}
