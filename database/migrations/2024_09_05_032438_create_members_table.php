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
        Schema::create('members', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('full_name');
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->string('position')->nullable();
            $table->string('country')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('province')->nullable();
            $table->string('address')->nullable();
            $table->enum('member_type', ['employee', 'guest'])->nullable()->default('guest');
            $table->foreignUuid('campaign_id')->nullable()->references('id')->on('campaigns');
            $table->foreignUuid('company_id')->nullable()->references('id')->on('companies');
            $table->foreignUuid('department_id')->nullable()->references('id')->on('departments');
            $table->boolean('checked_in')->default(false);
            $table->string('member_code');
            $table->string('member_keyword')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('members');
    }
};
