<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\UserCreateRequest;
use App\Http\Requests\UserUpdateRequest;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    public function index(){

        return User::paginate();
    }

    public function show($id){
        return User::find($id);
    }

    public function store(UserCreateRequest $request){
        // $data = $request->except('password');
        // $data['password'] = Hash::make('123');
        // $user = User::create($data);
        $user = User::create($request->only(['first_name','last_name','email']) + ['password'=> Hash::make($request->password)]);

        return response($user, Response::HTTP_CREATED);
    }

    public function update(UserUpdateRequest $request, $id){
        $user = User::findOrFail($id);
        $user->update($request->only(['first_name','last_name','email']));

        return response($user, Response::HTTP_ACCEPTED);
    }

    public function destroy($id){
        $user = User::findOrFail($id);
        $user->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }
}
