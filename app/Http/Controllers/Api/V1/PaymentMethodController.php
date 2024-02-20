<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\PaymentMethod;
use App\Http\Requests\StorePaymentMethodRequest;
use App\Http\Requests\UpdatePaymentMethodRequest;
use App\Http\Resources\PaymentMethodResource;
use App\Traits\ApiResponse;

class PaymentMethodController extends Controller
{
    use ApiResponse;

    /**
     * Display a listing of the resource.
     */


    /**
     * @OA\Get(
     *      path="/payment-method",
     *      operationId="getPaymentMethods",
     *      tags={"Payment Methods"},
     *      summary="List of payment method",
     *      description="Returns list of available payment method",
     *      security={ {"bearer_token": {} }},
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *          @OA\JsonContent(ref="#/components/schemas/PropertyTypeResource")
     *       ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthenticated",
     *      ),
     *      @OA\Response(
     *          response=403,
     *          description="Forbidden"
     *      )
     *     )
     */ 
    public function index()
    {
        $paymentMethods = PaymentMethod::all();
        return $this->success(PaymentMethodResource::collection($paymentMethods), "list of payment methods", 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePaymentMethodRequest $request)
    {
        try {
            $data = $request->validated();
            $data['is_active'] = 0;
            $paymentMethod = PaymentMethod::create($data);
            return $this->success(new PaymentMethodResource($paymentMethod), "Payment method created successfully", 200);
        } catch (\Throwable $th) {
            //throw $th;
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(PaymentMethod $paymentMethod)
    {
        return $this->success(new PaymentMethodResource($paymentMethod), "Payment method retrieved", 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePaymentMethodRequest $request, PaymentMethod $paymentMethod)
    {
        try {
            $data = $request->validated();
            $paymentMethod->update($data);
            return $this->success(new PaymentMethodResource($paymentMethod), "Payment method updated", 200);
        } catch (\Throwable $th) {
            //throw $th;
        }
    }

    public function toggleActive($id)
    {
        try {

            $toggle = PaymentMethod::where('id', $id)->value('is_active');
            if ($toggle == 1) {
                PaymentMethod::where('id', $id)->update([
                    'is_active' => 0
                ]);
            }
            if ($toggle == 0) {
                $existingActive = PaymentMethod::where('is_active', 1)->exists();
                if ($existingActive) {
                    return $this->error("There is an existing active payment method", 422);
                }
                PaymentMethod::where('id', $id)->update([
                    'is_active' => 1
                ]);
            }
        } catch (\Throwable $th) {
            //throw $th;
            return $this->error($th->getMessage(), 404);
        }
    }

    public function activeMethod()
    {
        try {
            return $this->success(new PaymentMethodResource(PaymentMethod::where('is_active', 1)->first()), 'Active payment method retrieved', 200);
        } catch (\Throwable $th) {
            //throw $th;
            return $this->error($th->getMessage(), 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PaymentMethod $paymentMethod)
    {
        //
    }
}
