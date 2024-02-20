<?php

namespace Database\Seeders;

use App\Models\Property;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PropertySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $property = [
            [
                'property_type_id' => 2,
                'p_name' => "Offodile Chukwuma Peter Nwalie's compound",
                'num_of_space' => 1,
                'p_desc' => "A one storey building consisting two flats, ground floor for rent",
                'state_id' => 4,
                'lga_id' => 74,
                'p_city' => "Amaenyi Awka Town",
                'p_address' => "No 2 Community school road ayomnaokpala, umuayom",
                'p_image' => "",
            ],
            [
                'property_type_id' => 1,
                'p_name' => "Nwalie's Bungalow Property",
                'num_of_space' => 9,
                'p_desc' => "A Bungalow consisting of different rooms, single and self contained",
                'state_id' => 4,
                'lga_id' => 74,
                'p_city' => "Ifite Awka Town",
                'p_address' => "No 8 Isiorji community, Ifite",
                'p_image' => "",
            ],
            [
                'property_type_id' => 3,
                'p_name' => "Nwalie's Shop",
                'num_of_space' => 1,
                'p_desc' => "A Bungalow consisting of different spaces rented for business purposes",
                'state_id' => 4,
                'lga_id' => 74,
                'p_city' => "Amaenyi Awka Town",
                'p_address' => "No 6 Umuoramma avenue, Awka south",
                'p_image' => "",
            ],
        ];

        foreach($property as $p){
            Property::create($p);
        }
    }
}
