<?php

use App\Http\Controllers\Api\V1\AssignSpaceController;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\OccupantController;
use App\Http\Controllers\Api\V1\PaymentMethodController;
use App\Http\Controllers\Api\V1\ProfileController;
use App\Http\Controllers\Api\V1\PropertyController;
use App\Http\Controllers\Api\V1\PropertyTypeController;
use App\Http\Controllers\Api\V1\RentController;
use App\Http\Controllers\Api\V1\SpaceController;
use App\Http\Controllers\Api\V1\StateLgaController;
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
    Route::get('/properties-and-occupant', [OccupantController::class, 'propertiesAndOccupants']);

    //fetch occupant of a space
    Route::get('/occupant-space/{spaceId}', [OccupantController::class, 'OccupantSpace']);

    //property
    Route::apiResource('/property', PropertyController::class);

    //profile
    Route::get('/profile-details', [ProfileController::class, 'index']);

    //payment method setup
    Route::apiResource('/payment-method', PaymentMethodController::class);
    Route::patch('/toggle-payment-method/{id}', [PaymentMethodController::class, 'toggleActive']);
    Route::get('/active-payment-method', [PaymentMethodController::class, 'activeMethod']);

    //spaces
    Route::apiResource('/space', SpaceController::class);
    Route::get('/space-status', [SpaceController::class, 'spaceStatus']);
    Route::get('/property-spaces/{property}', [SpaceController::class, 'propertySpaces']);
    Route::get('/empty-spaces/{property}', [SpaceController::class, 'emptySpaces']);
    Route::post('/assign-space', [AssignSpaceController::class, 'assignSpace']);

    //state and lga
    Route::get('/states', [StateLgaController::class, 'states']);
    Route::get('/lga/{id}', [StateLgaController::class, 'lgas']);

    //Rent
    Route::get('/rents', [RentController::class, 'index']);
    Route::get('/rent-receipt/{rent}', [RentController::class, 'rentReceipt']);
    Route::get('/rent-due/{date}', [RentController::class, 'rentDue']);
    Route::post('/rent-payment-history', [RentController::class, 'rentPaymentHistory']);
    Route::post('/create-paid-rent', [RentController::class, 'store']);
});

Route::post('/login', [AuthController::class, 'login']);