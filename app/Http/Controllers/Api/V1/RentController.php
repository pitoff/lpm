<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\CreateRentRequest;
use App\Http\Resources\CreateRentResource;
use App\Models\Occupant;
use App\Models\Rent;
use App\Models\Space;
use App\Models\User;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Traits\ApiResponse;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class RentController extends Controller
{
    use ApiResponse;

    public function index()
    {
        $rents = Rent::orderBy('id', 'desc')->get();
        return $this->success(CreateRentResource::collection($rents), "Rents recovered successfully", 200);
    }

    public function store(CreateRentRequest $request)
    {
        $data = $request->validated();
        $getSpaceAmount = Space::where('id', $data['space_id'])->value('space_price');
        $amountPaid = $data['amount_paid'];
        $amountPerMonth = $getSpaceAmount / 12;
        $monthsCovered = ($amountPaid / $amountPerMonth) - 1;

        $carbonDate = Carbon::parse($data['from']);
        $data['year'] = $carbonDate->year;
        $rentDueAt = $carbonDate->addMonths($monthsCovered);
        $formatedRentDueAt = $rentDueAt->format('Y-m-d');
        $data['to'] = $formatedRentDueAt;
        $data['payment_status'] = 1;

        $createRent = Rent::create($data);
        if ($createRent) {
            return $this->success(new CreateRentResource($createRent), "Rent created successfully", 200);
        } else {
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

    public function rentDue($date)
    {
        if (Auth::user()->role == User::ADMIN) {
            //last records for each occupant id
            $lastRecords = Rent::whereIn('id', function ($query) {
                $query->selectRaw('MAX(id)')->from('rents')->groupBy('occupant_id');
            })->get();

            $dueArray = [];
            foreach ($lastRecords as $value) {
                if ($value->getAttributes()['to'] < $date) {
                    $dueArray[] = $value;
                }
            }
            return $this->success(CreateRentResource::collection($dueArray), "good", 200);
        } else {
            //last records for logged in occupant id
            $occupantId = Occupant::where('user_id', Auth::user()->id)->select('id')->first();
            $lastRecords = Rent::where('occupant_id', '=', $occupantId->id)->toSql();

            // $dueArray = [];
            // foreach ($lastRecords as $value) {
            //     if ($value->getAttributes()['to'] < $date) {
            //         $dueArray[] = $value;
            //     }
            // }
            return $lastRecords;
            return $this->success(CreateRentResource::collection($lastRecords), "good", 200);
        }
    }

    public function rentPaymentHistory(Request $request)
    {
        if (Auth::user()->role == User::ADMIN) {
            $request->validate([
                'occupant_id' => 'required',
                'year' => 'required'
            ]);
            try {
                $history = Rent::where('occupant_id', $request->occupant_id)
                    ->whereRaw("YEAR(paid_at) = ?", $request->year)
                    ->get();
                return $this->success(CreateRentResource::collection($history), "Rent history recovered successfully", 200);
            } catch (\Throwable $th) {
                //throw $th;
                return $th->getMessage();
            }
        } else {
            $occupantId = Occupant::where('user_id', Auth::user()->id)->value('id');
            try {
                $history = Rent::where('occupant_id', $occupantId)
                    ->whereRaw("YEAR(paid_at) = ?", $request->year)
                    ->get();
                return $this->success(CreateRentResource::collection($history), "Rent history recovered successfully", 200);
            } catch (\Throwable $th) {
                //throw $th;
                return $th->getMessage();
            }
        }
    }
}
