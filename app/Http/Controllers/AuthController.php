<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\RegisterRequest;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function login(Request $request){
        if(Auth::attempt($request->only(['email','password']))){
            $user = Auth::user();
            $token = $user->createToken('Laravel Personal Access Client')->accessToken;

            return [
                'token' => $token,
            ];
        }

        return response(['error'=>'Invalid Credentials'], Response::HTTP_UNAUTHORIZED);
    }

    public function register(RegisterRequest $request){
        $user = User::create($request->only(['first_name','last_name','email',]) + ['password'=> Hash::make($request->password) ,'role_id'=> 3]);

        return response($user, Response::HTTP_CREATED);
    }

    public function logout(Request $request){
        Auth::logout();
        $request->session()->invalidate();
        return response(null, Response::HTTP_NO_CONTENT);
    }
}
