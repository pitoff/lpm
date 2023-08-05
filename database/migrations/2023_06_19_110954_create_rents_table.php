<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('rents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('occupant_id')->constrained();
            $table->unsignedBigInteger('space_id')->nullable();
            $table->foreign('space_id')->references('id')->on('spaces');
            $table->integer('amount_paid');
            $table->foreignId('payment_method_id')->constrained();
            $table->integer('year');
            $table->date('from');
            $table->date('to');
            $table->date('paid_at');
            $table->integer('payment_status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rents');
    }
};
