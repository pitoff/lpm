<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\LgaResource;
use App\Http\Resources\StateResource;
use App\Models\LGA;
use App\Models\State;
use Illuminate\Http\Request;
use App\Traits\ApiResponse;

class StateLgaController extends Controller
{
    use ApiResponse;

    public function states()
    {
        return $this->success(StateResource::collection(State::all()), "List of states", 200);
    }

    public function lgas(Request $request, $id)
    {
        return $this->success(LgaResource::collection(LGA::where('state_id', $id)->get()), "List of lga", 200);
    }
}
