<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\CreatePropertyRequest;
use App\Http\Resources\CreatePropertyResource;
use App\Http\Resources\PropertySpaceAndOccupantResource;
use App\Models\Property;
use Illuminate\Http\Request;
use App\Traits\ApiResponse;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class PropertyController extends Controller
{
    use ApiResponse;

    public function index()
    {
        return $this->success(CreatePropertyResource::collection(Property::all()), "List of properties", 200);
    }

    public function store(CreatePropertyRequest $request)
    {
        $data = $request->validated();
        try {
            if(isset($data['p_image'])){
                $relativePath = $this->saveImage($data['p_image']);
                $data['p_image'] = $relativePath;
            }
            $property = Property::create($data);
            return $this->success(new CreatePropertyResource($property), "Property created successfully", 200);
        } catch (\Throwable $th) {
            //throw $th;
            return $this->error($th->getMessage(), 400);
        }
        
    }

    public function show(Property $property, Request $request)
    {
        try {
            return $this->success(new CreatePropertyResource($property), "property", 200);
        } catch (\Throwable $th) {
            //throw $th;
            return $this->error($th->getMessage(), 404);
        }
    }

    //should return property as grand parent, space as parent, and list of past and current occupants as children
    public function propertySpaceAndOccupant(Property $property){
        try {
            return $this->success(new PropertySpaceAndOccupantResource($property), "property space and occupant", 200);
        } catch (\Throwable $th) {
            //throw $th;
            return $this->error($th->getMessage(), 404);
        }
    }

    public function update(CreatePropertyRequest $request, Property $property)
    {
        $data = $request->validated();
        if(isset($data['p_image'])){
            $relativePath = $this->saveImage($data['p_image']);
            $data['p_image'] = $relativePath;

            if($property->p_image){
                $absolutePath = public_path($property->p_image);
                File::delete($absolutePath);
            }
        }
        $property->update($data);
        return $this->success(new CreatePropertyResource($property), "property updated", 200);
    }

    public function destroy(Property $property)
    {
        try {
            $property->delete();
            return $this->success("", "property deleted", 200);
        } catch (\Exception $e) {
            return $this->error($e->getMessage(), 400);
        }
    }

    private function saveImage($image)
    {
        /**from the front end we will read the file and convert it to base64
         * and accept it that way from back end too**/

         //starts with data image, contains /, contains aplha numeric, has semicolon, has base64 string
        if(preg_match('/^data:image\/(\w+);base64,/', $image, $type)){
            //take out base64 encoded text without mime type
            //so taking out from position of comma + 1
            $image = substr($image, strpos($image, ',') + 1);
            //get file extension
            $type = strtolower($type[1]); //jpg, png, gif

            //check if file is an image
            if(!in_array($type, ['jpg', 'jpeg', 'gif', 'png'])){
                throw new \Exception("invalid image type");
                
            }
            $image = str_replace(' ', '+', $image);
            $image = base64_decode($image);

            if($image === false){
                throw new \Exception('base64_decode failed');
            }
        }else{
            throw new \Exception("did not match data URI with image data");
            
        }

        $dir = 'propertyImages/';
        $file = Str::random().'.'.$type;
        $absolutePath = public_path($dir);
        $relativePath = $dir.$file;
        if(!File::exists($absolutePath)){
            File::makeDirectory($absolutePath, 0755, true);
        }
        file_put_contents($relativePath, $image);
        return $relativePath;
    }
}
