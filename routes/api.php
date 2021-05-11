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

//Frontend
Route::get('/category','Api\FrontendController@getCategory');
//GetAllMenu
Route::get('/all-menu','Api\FrontendController@getAllMenu');
//GetMenu
Route::get('/get/{id}/menu','Api\FrontendController@getMenu');
//GetMenuData
Route::get('/menu/{id}/data','Api\FrontendController@getMenuData');












Route::post('admin/login', 'Api\UserController@login');


Route::get('admin/category/index','Api\CategoryController@index');
Route::post('admin/category/store','Api\CategoryController@store');
Route::get('admin/category/{id}/edit','Api\CategoryController@edit');
Route::post('admin/category/{id}/update','Api\CategoryController@update');
Route::get('admin/category/{id}/delete','Api\CategoryController@delete');




Route::get('admin/product/index','Api\ProductController@index');
Route::post('admin/product/store','Api\ProductController@store');
Route::get('admin/product/{id}/edit','Api\ProductController@edit');
Route::post('admin/product/{id}/update','Api\ProductController@update');
Route::get('admin/product/{id}/delete','Api\ProductController@delete');

Route::group(['middleware' => 'auth:api'], function () {
    
    //Category
 

});

