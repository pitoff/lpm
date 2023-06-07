<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\OccupantController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\PropertyTypeController;
use App\Http\Controllers\SpaceController;
use App\Http\Controllers\StateLgaController;
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
    Route::apiResource('/property-type', PropertyTypeController::class);

    //occupant
    Route::apiResource('/occupant', OccupantController::class);

    //property
    Route::apiResource('/property', PropertyController::class);

    //spaces
    Route::apiResource('/space', SpaceController::class);
    Route::get('/property-spaces/{id}', [SpaceController::class, 'propertySpaces']);

    //state and lga
    Route::get('/states', [StateLgaController::class, 'states']);
    Route::get('/lga/{id}', [StateLgaController::class, 'lgas']);
});

Route::post('/login', [AuthController::class, 'login']);