<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PropertyTypeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function() {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/verify-user', [AuthController::class, 'verifyUser']);

    //property type
    Route::apiResource('property-type', PropertyTypeController::class);

    //occupant
});

Route::post('/login', [AuthController::class, 'login']);