<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Auth::routes();


// Frontend route
Route::get('/{path?}', function () {
    return view('layouts.frontend');
})->where('path', '[^admin]*');



// Admin route

Route::get('/admin/{path?}', function () {
    return view('layouts.backend');
})->where('path', '.*');


// Route::get('/admin/dashboard', function () {
//     return view('layouts.backend');
// })->where('path', '.*');