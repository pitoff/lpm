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
                'name' => 'Duplex',
                'description' => 'One storey'
            ],
            [
                'name' => 'plaza',
                'description' => 'consisting of different spaces for business'
            ]
        ];

        foreach($propertyTypes as $property){
            PropertyType::create($property);
        }
    }
}
