<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


// Route::get('/users','UserController@index');
// Route::get('/users/{id}', 'UserController@show');
// Route::post('/users','UserController@create');
// Route::put('/users/{id}','UserController@update');
// Route::delete('/users/{id}','UserController@destroy');


Route::post('login','AuthController@login');
Route::post('register','AuthController@register');


Route::group(['middleware' => 'auth:api'], function () {
    Route::apiResource('users','UserController');

    Route::get('user','UserController@user');
    Route::put('user/info','UserController@updateInfo');
    Route::put('user/password','UserController@updatePassword');

    Route::resource('roles','RoleController');
    Route::resource('products', 'ProductController');
    Route::post('upload','ImageController@upload');

    Route::resource('orders', 'OrderController')->only(['index','show']);
    Route::get('export','OrderController@export');

    Route::resource('permissions', 'PermissionController')->only(['index']);

});



