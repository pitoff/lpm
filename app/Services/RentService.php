<?php

namespace App\Services;

use App\Models\Rent;
use Carbon\Carbon;
use App\Models\Space;

class RentService
{

    public function storeRent($request)
    {
        $data = $request->validated();
        $getSpaceAmount = Space::where('id', $data['space_id'])->first(['space_price', 'monthly_price']);
        $amountPaid = $data['amount_paid'];
        $amountPerMonth = $getSpaceAmount->monthly_price; // 12;
        $monthsCovered = ($amountPaid / $amountPerMonth) - 1;
     
        $carbonDate = Carbon::parse($data['from']);
        $data['year'] = $carbonDate->year;
        //this gives rent due at as first day of that month
        $rentDueAt = $carbonDate->addMonths($monthsCovered);
        $formatedRentDueAt = $rentDueAt->format('Y-m-d');

        $data['to'] = $formatedRentDueAt;
        $data['payment_status'] = 1;
        $data['space_amount'] = $getSpaceAmount->space_price;
        $data['remaining'] = $getSpaceAmount->space_price - $amountPaid;

        $existingRent = Rent::where('occupant_id', $data['occupant_id'])->orderBy('id', 'desc')->first();

        if ($existingRent && (($data['from']) <= ($existingRent->getAttributes()['to']))) {
            return "date_err";
        }

        if ($existingRent) {
            //subsequent rent entry uses this, after the first entry
            if ($existingRent->remaining == 0) {
                if ($amountPaid % $amountPerMonth !== 0) {
                    return "amount_err";
                }
                if ($amountPaid > $getSpaceAmount->space_price) {
                    return "amount_err";
                }
                $data['monthly_price'] = $amountPerMonth;
                $createRent = Rent::create($data);
                if ($createRent)
                    return [
                        "create_success" => true,
                        "created" => $createRent
                    ];
            } else {
                $oldBalance = $existingRent->remaining;
                $data['remaining'] = $oldBalance - $data['amount_paid'];
                //amount err should be checked against monthly_price
                if ( $data['amount_paid'] % $existingRent->monthly_price !== 0) {
                    return "amount_err";
                }
                if ($amountPaid > $oldBalance) {
                    return "amount_err";
                }
                $monthsCovered = ($data['amount_paid'] / $existingRent->monthly_price) - 1;
                $carbonDate = Carbon::parse($data['from']);
                $data['year'] = $carbonDate->year;
                $rentDueAt = $carbonDate->addMonths($monthsCovered);
                $formatedRentDueAt = $rentDueAt->format('Y-m-d');
                $data['to'] = $formatedRentDueAt;
                $data['space_amount'] = $existingRent->space_amount;
                $data['monthly_price'] = $existingRent->monthly_price;
                $createRent = Rent::create($data);
                if ($createRent)
                    return [
                        "create_success" => true,
                        "created" => $createRent
                    ];
            }
        } else {
            //first entry into rent table
            if ($amountPaid % $amountPerMonth !== 0) {
                return "amount_err";
            }
            if ($amountPaid > $getSpaceAmount->space_price) {
                return "amount_err";
            }
            $data['monthly_price'] = $amountPerMonth;
            $createRent = Rent::create($data);
            if ($createRent)
                return [
                    "create_success" => true,
                    "created" => $createRent
                ];
        }

        return ["create_success" => false];

    }

}
