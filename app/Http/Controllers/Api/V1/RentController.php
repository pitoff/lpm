<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\CreateRentRequest;
use App\Http\Resources\CreateRentResource;
use App\Mail\sendRentReceipt;
use App\Models\Occupant;
use App\Models\Rent;
use App\Models\Space;
use App\Models\User;
use App\Services\RentService;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Traits\ApiResponse;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class RentController extends Controller
{
    use ApiResponse;

    protected $rentService;

    public function __construct(RentService $rentService)
    {
        $this->rentService = $rentService;
    }

    public function index()
    {
        $rents = Rent::orderBy('id', 'desc')->get();
        return $this->success(CreateRentResource::collection($rents), "Rents recovered successfully", 200);
    }

    public function show(Rent $rent)
    {
        return $this->success(new CreateRentResource($rent), "Rent data", 200);
    }

    public function store(CreateRentRequest $request)
    {
        $result = $this->rentService->storeRent($request);
        // return $result;
        switch($result){
            case "amount_err":
                return $this->error('Please amount must be even...', 400);
                break;
            case "date_err":
                return $this->error('Rent already exist for this period', 400);
                break;
            case $result['create_success'] == true:
                return $this->success(new CreateRentResource($result['created']), "Rent created successfully", 200);
                break;
            case $result['create_success'] == false:
                return $this->error("Rent could not be created", 400);
                break;
        }

    }

    public function update()
    {
    }

    public function rentReceipt(Rent $rent)
    {
        try {
            return $this->success(new CreateRentResource($rent), "Rent receipt retrieved successfully", 200);
        } catch (ModelNotFoundException $e) {
            return $this->error("Receipt not found", 404);
        }
    }

    public function forwardReceipt(Rent $rent)
    {
        $occupantId = Rent::where('id', $rent->id)->with('occupant', function ($query) {
            $query->with('user');
        })->first();
        if ($occupantId->occupant->user->email == '') {
            return $this->error('User does not have email address', 404);
        } else {
            //send email
            Mail::to($occupantId->occupant->user->email)->send(new sendRentReceipt($rent));
            return $this->success("Email sent", "Email Successfully sent to " . $occupantId->occupant->user->email, 200);
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
            $occupantId = Occupant::where('user_id', Auth::user()->id)->value('id');
            $lastRecord = Rent::where('occupant_id', $occupantId)->latest()->first();
            if ($lastRecord->getAttributes()['to'] < $date) {
                return $this->success(new CreateRentResource($lastRecord), "Due payment retrieved", 200);
            } else {
                return $this->success("No Due payment", "No Due payment", 200);
            }
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

    public function rentPaymentHistoryPublic(Request $request)
    {
        try {
            $history = Rent::where('occupant_id', $request->occupant_id)
                ->whereRaw("YEAR(paid_at) = ?", $request->year)
                ->get();
            return $this->success(CreateRentResource::collection($history), "Rent history recovered successfully", 200);
        } catch (\Throwable $th) {
            //throw $th;
            return $th->getMessage();
        }
    }

    public function rentReceiptPublic(Rent $rent)
    {
        try {
            return $this->success(new CreateRentResource($rent), "Rent receipt retrieved successfully", 200);
        } catch (ModelNotFoundException $e) {
            return $this->error("Receipt not found", 404);
        }
    }
}
