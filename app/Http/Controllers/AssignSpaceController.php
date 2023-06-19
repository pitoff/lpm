<?php

namespace App\Http\Controllers;

use App\Models\Occupant;
use App\Models\Space;
use Illuminate\Http\Request;
use App\Traits\ApiResponse;

class AssignSpaceController extends Controller
{
    use ApiResponse;

    public function assignSpace($occupant, Request $request)
    {
        $request->validate([
            'user_id' => 'required',
            'space_id' => 'required|integer',
        ]);

        //check if user and space exists
        $user = Occupant::where('id', $request->user_id)->exists();
        $space = Space::where('id', $request->space_id)->exists();
        if($user && $space){
            try {
                Occupant::create([
                    'space_id' => $request->space_id
                ]);
                return $this->success("space assigned", "space successfully assigned to occupant", 200);
            } catch (\Throwable $th) {
                //throw $th;
                return $this->error($th, 400);
            }
        }
    }
}
