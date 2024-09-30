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
        Schema::create('campaigns', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->string("name");
            $table->longText("content")->nullable();
            $table->string("image")->nullable();
            $table->text("campaign_type")->nullable();
            $table->dateTime("start_date")->nullable();
            $table->dateTime("end_date")->nullable();
            $table->dateTime("valid_from")->nullable();
            $table->dateTime("valid_to")->nullable();
            $table->enum('status', ['publish', 'unpublish', 'pending'])->default('pending');
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('campaigns');
    }
};
