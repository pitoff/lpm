<?php

namespace Tests\Feature;

use App\Models\Occupant;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class OccupanTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_store_occupant(): void
    {
        // Create a user and authenticate them
        $user = User::create([
            'firstname' => 'Peter',
            'lastname' => 'Offodile',
            'role' => User::ADMIN,
            'email' => 'peteradmin@gmail.com',
            'password' => '12345',
            'status' => 1
        ]);

        $this->actingAs($user, 'sanctum');

        // Mock data for occupant creation
        $data = [
            'firstname' => 'Nwalie',
            'lastname' => 'Chukwuma',
            'email' => 'chuma@gmail.com',
            'phone_no' => '09033221122',
            'gender' => 'male',
            'marital_status' => 'married',
            'year_in' => now()->format('Y-m-d'),
            // 'image' => UploadedFile::fake()->image('avatar.jpg'), // Simulating an image upload
        ];

        // Perform the POST request
        $response = $this->post(route('occupant.store'), $data);

        // Assert successful response
        $response->assertStatus(200)
            ->assertJson([
                'status' => 'Request was successful',
                'message' => 'Occupant created successfully',
            ]);

        // Assert database entries
        // $this->assertDatabaseHas('users', [
        //     'firstname' => 'Peter',
        //     'lastname' => 'Chukwuma',
        //     'email' => 'peter@gmail.com',
        //     'role' => User::OCCUPANT,
        // ]);

        // $this->assertDatabaseHas('occupants', [
        //     'phone_no' => '09033221122',
        //     'gender' => 'male',
        //     'year_in' => now()->format('Y-m-d'),
        // ]);
    }
}
