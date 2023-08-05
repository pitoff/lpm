<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\LoginRequest;
use App\Mail\ResetPassword;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Traits\ApiResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    use ApiResponse;

    /**
     * Authentication
     * @OA\Post(
     *      path="/login",
     *      tags={"Auth"},
     *      summary="User login",
     *      description="User provides credentials to log in to the system",
     * 
     *      @OA\RequestBody(
     *         required=true,
     *          @OA\JsonContent(
     *              required={"email","password"},
     *              @OA\Property(property="email", type="string", example="email"),
     *              @OA\Property(property="password", type="string", example="password"),
     *          ),
     *      ),
     * 
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *       ),
     * 
     *      @OA\Response(
     *          response=403,
     *          description="Forbidden"
     *      )
     *     )
     */
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

    public function sendPasswordResetLink(Request $request)
    {
        $request->validate([
            'email' => 'required'
        ]);

        $passwordToken = Str::random(20);
        $getUser = User::where('email', $request->email)->first();
        $time = date('H:i:s');
        $expire_at = date('H:i:s', strtotime('+10 minutes', strtotime($time)));

        if(!$getUser){
            return $this->error("Whoops! Record not found", 404);
        }

        $reset = DB::table('password_reset_tokens')->where('email', $request->email)->first();
        if(!$reset){
            $createReset = DB::table('password_reset_tokens')->insert([
                'email' => $request->email,
                'token' => $passwordToken,
                'expire_at' => $expire_at
            ]);
            if(!$createReset){
                return $this->error("Whoops! something went wrong!", 400);
            }
            Mail::to($request->email)->send(new ResetPassword($passwordToken, $request->email));
            return $this->success('', 'Password reset link has been sent to your email', 200);
        }else{
            $updateReset = DB::table('password_reset_tokens')->where('email', $request->email)->update([
                'token' => $passwordToken,
                'expire_at' => $expire_at
            ]);
            if(!$updateReset){
                return $this->error("Whoops! something went wrong!", 400);
            }
            Mail::to($request->email)->send(new ResetPassword($passwordToken, $request->email));
            return $this->success('', 'Password reset link has been sent to your email', 200);
        }

    }
    
    public function resetPassword($token = null)
    {
        try{
            $getUserToken = DB::table('password_reset_tokens')->where('token', $token)->first(['email', 'expire_at', 'token']);
            if($getUserToken)
            {
                //check for token expiry time
                #....return token validity
        
                if ((date('H:i:s') > $getUserToken->expire_at)) {
                    return $this->error("Token has expired!", 400);
                }else{
                    $res['user'] = [
                        'email' => $getUserToken->email,
                        'token' => $getUserToken->token
                    ];
                    return $this->success($res, 'Proceed to change password', 200);
                }
    
            }else{
                return $this->error("Token mismatch!", 400);
            }
            //return $token
        }catch(\Throwable $catchedError){
            return $this->error([$catchedError], 400);
            // return $this->error("Token mismatch!", 400);
        }
        
    }

    public function updateNewPass(Request $request)
    {
        $request->validate([
            'password'  => 'required|confirmed',
            'email'     => 'required|email'
        ]);
            
            $updatePass = User::where('email', $request->email)->update([
                'password' => Hash::make($request->password)
            ]);
            if ($updatePass) {
                DB::table('password_reset_tokens')->where('email', $request->email)->delete();
                $data = User::where('email', $request->email)->first(['lastname', 'email', 'updated_at']);
                return $this->success($data, 'Password reset was success', 200);
            }else{
                return $this->error('Sorry, unable to reset your password!', 401);
            }
        
    }
}
