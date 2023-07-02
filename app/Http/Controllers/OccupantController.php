<?php

namespace App\Http\Controllers;

use App\Http\Requests\OccupantRequest;
use App\Http\Requests\UpdateOccupantRequest;
use App\Http\Resources\OccupantResource;
use App\Models\AssignSpace;
use App\Models\Occupant;
use App\Models\Property;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Traits\ApiResponse;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class OccupantController extends Controller
{
    use ApiResponse;

    public function index()
    {
        $occupants = Occupant::with('user')->get();
        return $this->success(OccupantResource::collection($occupants), "list of occupants", 200);
    }

    public function propertiesAndOccupants()
    {
        $occupants = Occupant::leftJoin('assign_spaces', 'assign_spaces.occupant_id', 'occupants.id')
        ->leftJoin('properties', 'properties.id', 'assign_spaces.property_id')
        ->leftJoin('users', 'users.id', 'occupants.user_id')
        ->leftJoin('spaces', 'spaces.property_id', 'assign_spaces.property_id')
        ->where('assign_spaces.assign_status', 1)
        ->select('occupants.*', 'p_name', 'firstname', 'lastname', 'space_name', 'space_price')->get();

        return response()->json(["data" => $occupants] ,200);
    }

    public function store(OccupantRequest $request)
    {
        $data = $request->validated();
        $user = User::create([
            'firstname' => $data['firstname'],
            'lastname' => $data['lastname'],
            'email' => $data['email'],
            'password' => '12345',
            'role' => User::OCCUPANT,
            'status' => 1
        ]);

        if(isset($data['image'])){
            $relativePath = $this->saveImage($data['image']);
            $data['image'] = $relativePath;
        }
        $data['user_id'] = $user->id;
        $occupant = Occupant::create($data);
        
        if($user && $occupant){
            return $this->success(new OccupantResource($occupant), "Occupant created successfully", 200);
        }

        return $this->error("Error occured", 400);
    }

    public function show(Occupant $occupant, Request $request)
    {
        return $this->success(new OccupantResource($occupant), "occupant data", 200);
    }

    public function update(UpdateOccupantRequest $request, Occupant $occupant)
    {
        $data = $request->validated();
        if(isset($data['image'])){
            $relativePath = $this->saveImage($data['image']);
            $data['image'] = $relativePath;

            if($occupant->image){
                $absolutePath = public_path($occupant->image);
                File::delete($absolutePath);
            }
        }
        //update user and occupant
        User::where('id', $occupant->user_id)->update([
            'firstname' => $data['firstname'],
            'lastname' => $data['lastname'],
            'email' => $data['email']
        ]);
        $occupant->update($data);
    }

    public function destroy(string $id)
    {
        //
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

        $dir = 'occupantsImages/';
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
