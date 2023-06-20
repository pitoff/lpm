<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'firstname' => 'peter',
                'lastname' => 'chukwuma',
                'role' => 1,
                'email' => "peteroffodile@gmail.com",
                'password' => "12345",
                'status' => 1
            ],
        ];

        foreach($users as $user){
            User::create($user);
        }
    }
}
