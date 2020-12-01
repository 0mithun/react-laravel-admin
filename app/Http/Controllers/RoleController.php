<?php

namespace App\Http\Controllers;

use DB;
use App\Role;
use Illuminate\Http\Request;
use App\Http\Resources\RoleResource;
use Gate;
use Symfony\Component\HttpFoundation\Response;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        Gate::authorize('view','roles');
        $roles = Role::all();
        return RoleResource::collection($roles);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Gate::authorize('edit','roles');
        $role = Role::create($request->only('name'));

        if($permissions = $request->permissions){
            $role->permissions()->sync($permissions);
        }

        return response(new RoleResource($role), Response::HTTP_ACCEPTED);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function show(Role $role)
    {
        Gate::authorize('view','roles');
        return new RoleResource($role);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Role $role)
    {
        Gate::authorize('edit','roles');
        $role->update($request->only('name'));

        DB::table('role_permission')->where('role_id', $role->id)->delete();
        if($permissions = $request->permissions){
            $role->permissions()->sync($permissions);
        }

        return response(new RoleResource($role), Response::HTTP_ACCEPTED);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function destroy(Role $role)
    {
        Gate::authorize('edit','roles');
        DB::table('role_permission')->where('role_id', $role->id)->delete();
        $role->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }
}
