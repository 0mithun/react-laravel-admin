<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\UpdateInfoRequest;
use App\Http\Requests\UserCreateRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Requests\UpdatePasswordRequest;
use App\Http\Resources\UserResource;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    public function index(){

        $users = User::with('role')->paginate();
        return UserResource::collection($users);
    }

    public function show($id){
        $user = User::find($id);

        return new UserResource($user);
    }

    public function store(UserCreateRequest $request){
        // $data = $request->except('password');
        // $data['password'] = Hash::make('123');
        // $user = User::create($data);
        $user = User::create($request->only(['first_name','last_name','email','role_id']) + ['password'=> Hash::make($request->password)]);

        return response(new UserResource($user), Response::HTTP_CREATED);
    }

    public function update(UserUpdateRequest $request, $id){
        $user = User::findOrFail($id);
        $user->update($request->only(['first_name','last_name','email','role_id']));

        return response(new UserResource($user), Response::HTTP_ACCEPTED);
    }

    public function destroy($id){
        $user = User::findOrFail($id);
        $user->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }

    public function user(){
        $user = auth()->user();

        return response(new UserResource($user), Response::HTTP_OK);
    }

    public function updateInfo(UpdateInfoRequest $request){
        $user = auth()->user();

        $user->update($request->only(['first_name','last_name','email']));
        return response(new UserResource($user), Response::HTTP_ACCEPTED);
    }

    public function updatePassword(UpdatePasswordRequest $request){
        $user = auth()->user();
        $user->update(['password'=> Hash::make($request->password)]);

        return response(new UserResource($user), Response::HTTP_ACCEPTED);
    }
}
