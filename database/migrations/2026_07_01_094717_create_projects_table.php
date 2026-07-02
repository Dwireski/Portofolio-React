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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->string('category'); // video_production, video_editing, graphic_design
            $table->string('video_url')->nullable(); // Link YouTube/Vimeo
            $table->string('thumbnail_path'); // Path gambar dari Cloud Storage
            $table->boolean('is_featured')->default(false); // Untuk highlight di homepage
            $table->integer('year')->nullable(); // Tahun project dibuat
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};