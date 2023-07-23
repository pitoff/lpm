<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers;
use App\Models\AssignSpace;
use App\Models\Occupant;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Traits\ApiResponse;

class ProfileController extends Controller
{
    use ApiResponse;

    public function index()
    {
        $data['user'] = User::where('id', Auth::user()->id)->first(['lastname', 'firstname', 'email']);
        $data['occupant'] = Occupant::where('user_id', Auth::user()->id)->first();
        $data['space'] = AssignSpace::where('occupant_id', $data['occupant']->id)->with('space', 'property')->get();
        
        return $this->success($data, "Profile details retrieved", 200);
    }
}
