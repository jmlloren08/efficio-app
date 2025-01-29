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
        Schema::create('accomplishments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->date('week_ending_date');
            $table->text('accomplishments_this_week');
            $table->text('action_items_next_week');
            $table->decimal('planned_hours_worked', 8, 2)->default(0.00);
            $table->decimal('actual_hours_worked', 8, 2)->default(0.00);
            $table->boolean('need_help')->default(false);
            $table->text('issues_or_concerns');
            $table->text('attachments')->nullable();
            $table->enum('attachment_type', ['file', 'link'])->nullable();
            $table->string('label')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accomplishments');
    }
};
