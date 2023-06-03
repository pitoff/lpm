<?php

namespace App\Http\Controllers;

use App\Http\Requests\OccupantRequest;
use App\Http\Resources\OccupantResource;
use App\Models\Occupant;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Traits\ApiResponse;

class OccupantController extends Controller
{
    use ApiResponse;

    public function index()
    {
        return $this->success(OccupantResource::collection(Occupant::all()), "list of occupants", 200);
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
        $occupant = Occupant::create([
            'user_id' => $user->id,
            'phone_no' => $data['phone_no'],
            'gender' => $data['gender'],
            'marital_status' => $data['marital_status'],
            'year_in' => $data['year_in'],
            'year_out' => $data['year_out'],
            // 'image_url'
        ]);
        if($user && $occupant){
            return $this->success(new OccupantResource($occupant), "Occupant created successfully", 200);
        }

        return $this->error("Error occured", 400);
    }

    public function show(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        //
    }
}
