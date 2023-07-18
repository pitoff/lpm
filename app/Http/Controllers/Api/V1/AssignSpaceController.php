<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\AssignSpace;
use App\Models\Occupant;
use App\Models\Space;
use Illuminate\Http\Request;
use App\Traits\ApiResponse;

class AssignSpaceController extends Controller
{
    use ApiResponse;

    public function assignSpace(Request $request)
    {
        $request->validate([
            'user_id' => 'required',
            'property_id' => 'required|integer',
            'space_id' => 'required|integer',
        ]);

        //check if user, property and space exists
        $user = Occupant::where('id', $request->user_id)->exists();
        $property = Occupant::where('id', $request->property_id)->exists();
        $space = Space::where('id', $request->space_id)->exists();
        
        if($user && $property && $space){
            //check whether space is empty at the moment, if empty then you can assign space to occupant
            if(Space::where('id', $request->space_id)->value('space_status') === 0){
                try {
                    AssignSpace::create([
                        'occupant_id' => $request->user_id,
                        'property_id' => $request->property_id,
                        'space_id' => $request->space_id,
                        'assign_status' => 1,
                    ]);
                    Space::where('id', $request->space_id)->update([
                        'space_status' => 1
                    ]);
                    return $this->success("Space assigned", "Space successfully assigned to occupant", 200);
                } catch (\Throwable $th) {
                    //throw $th;
                    return $this->error($th, 400);
                }
            }else{
                return $this->success("", "Space is currently occupied", 422);
            }
        }
    }
}
