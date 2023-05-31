<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Traits\ApiResponse;

class AuthController extends Controller
{
    use ApiResponse;

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']); //removes it from credentials

        if(!Auth::attempt($credentials, $remember)){
            return $this->error("The Provided credentials are not correct", 422);
        }
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token,
            'message' => "Login successfull"
        ]);
        return $this->success(['user' => $user, 'token' => $token], "User successfully logged In", 200);
    }

    public function logout(Request $request)
    {
        $user = Auth::user();
        $user->currentAccessToken()->delete();
        return response([
            'success' => true
        ]);
    }

    public function verifyUser(Request $request)
    {
        return $request->user();
    }
}
