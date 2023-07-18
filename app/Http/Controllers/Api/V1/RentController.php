<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\CreateRentRequest;
use App\Http\Resources\CreateRentResource;
use App\Models\Rent;
use App\Models\Space;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Traits\ApiResponse;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class RentController extends Controller
{
    use ApiResponse;

    public function index()
    {
        $rents = Rent::all();
        return $this->success(CreateRentResource::collection($rents), "Rents recovered successfully", 200);
    }

    public function store(CreateRentRequest $request)
    {
        $data = $request->validated();
        $getSpaceAmount = Space::where('id', $data['space_id'])->value('space_price');
        $amountPaid = $data['amount_paid'];
        $amountPerMonth = $getSpaceAmount/12;
        $monthsCovered = ($amountPaid/$amountPerMonth) - 1;

        $carbonDate = Carbon::parse($data['from']);
        $data['year'] = $carbonDate->year;
        $rentDueAt = $carbonDate->addMonths($monthsCovered);
        $formatedRentDueAt = $rentDueAt->format('Y-m-d');
        $data['to'] = $formatedRentDueAt;
        $data['payment_status'] = 1;

        $createRent = Rent::create($data);
        if($createRent){
            return $this->success(new CreateRentResource($createRent), "Rent created successfully", 200);
        }else{
            return $this->error("Could not create rent", 400);
        }

    }

    public function rentReceipt(Rent $rent)
    {
        try {
            return $this->success(new CreateRentResource($rent), "Rent receipt retrieved successfully", 200);
        } catch (ModelNotFoundException $e) {
            return $this->error("Receipt not found", 404);
        }
    }

    public function rentDue(Rent $rent, $date)
    {
        // return "good";
        // $due = $rent->groupBy('occupant_id')->orderBy('id', 'DESC')->get();
        $due = $rent->orderBy('id', 'ASC')->groupBy('occupant_id')->get();
        return $this->success($due, "good", 200);
    }
}
