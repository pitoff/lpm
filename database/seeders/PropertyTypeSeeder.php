<?php

namespace Database\Seeders;

use App\Models\PropertyType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PropertyTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $propertyTypes = [
            [
                'name' => 'Bungalow',
                'description' => 'bungalow house'
            ],
            [
                'name' => 'Storey Building',
                'description' => 'series of flats'
            ],
            [
                'name' => 'Plaza',
                'description' => 'consist of different spaces for business'
            ]
        ];

        foreach($propertyTypes as $property){
            PropertyType::create($property);
        }
    }
}
