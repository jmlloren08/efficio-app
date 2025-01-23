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
        Schema::create('hierarchies', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('supervisor_id');
            $table->foreign('supervisor_id')->references('id')->on('users')->onDelete('cascade');
            $table->unsignedBigInteger('subordinate_id');
            $table->foreign('subordinate_id')->references('id')->on('users')->onDelete('cascade');
            $table->unsignedBigInteger('supervisor_office_id');
            $table->foreign('supervisor_office_id')->references('id')->on('offices')->onDelete('cascade');
            $table->unsignedBigInteger('subordinate_office_id');
            $table->foreign('subordinate_office_id')->references('id')->on('offices')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hierarchies');
    }
};
