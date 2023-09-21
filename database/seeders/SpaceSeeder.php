<?php

namespace Database\Seeders;

use App\Models\Space;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SpaceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $spaces = [
            [
                'property_id' => 1,
                'space_name' => "flat 1 (ground floor)",
                'space_description' => "3 bedroom flat with 1 kitchen 2 toilet's and bathroom",
                'space_price' => 300000,
                'space_status' => 0
            ],
            [
                'property_id' => 3,
                'space_name' => "Shop",
                'space_description' => "A room for business",
                'space_price' => 48000,
                'space_status' => 0
            ]
        ];

        foreach($spaces as $space){
            Space::create($space);
        }


    }
}
