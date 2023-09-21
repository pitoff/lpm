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
        // Calculate the end of the month for the given date
        $endOfMonth = $carbonDate->endOfMonth();
        $rentDueAt = $endOfMonth->addMonths($monthsCovered);
        // Get the last date of the month for the new calculated date
        $lastDateOfMonth = $rentDueAt->endOfMonth();
        $formatedRentDueAt = $lastDateOfMonth->format('Y-m-d');

        $data['to'] = $formatedRentDueAt;
        $data['payment_status'] = 1;
        $data['space_amount'] = $getSpaceAmount->space_price;
        $data['remaining'] = $getSpaceAmount->space_price - $amountPaid;

        $existingRent = Rent::where('occupant_id', $data['occupant_id'])->orderBy('id', 'desc')->first();

        if ($existingRent && (($data['from']) <= ($existingRent->getAttributes()['to']))) {
            return "date_err";
        }

        if ($existingRent) {
            if ($existingRent->remaining == 0) {
                if ($amountPaid % $existingRent->monthly_price !== 0) {
                    return "amount_err";
                }
                $data['monthly_price'] = $existingRent->monthly_price;
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
            if ($amountPaid % $getSpaceAmount->monthly_price !== 0) {
                return "amount_err";
            }
            $data['monthly_price'] = $getSpaceAmount->monthly_price;
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
