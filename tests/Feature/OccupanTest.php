<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class OccupanTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_store_occupant(): void
    {
        $response = $this->post(route('occupant.store'));

        $response->assertStatus(200);
    }
}
