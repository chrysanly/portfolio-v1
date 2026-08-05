<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('works', function (Blueprint $table): void {
            $table->id();
            $table->ulid('public_id')->unique();
            $table->string('eyebrow', 80);
            $table->string('title', 140)->unique();
            $table->string('description', 400);

            // Caption shown inside the placeholder tile when no image is set.
            $table->string('media_label', 80);
            $table->string('image_path', 255)->nullable();

            $table->unsignedSmallInteger('position');
            $table->boolean('is_visible')->default(true);
            $table->timestamps();

            $table->index(['is_visible', 'position'], 'idx_works_visible_position');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('works');
    }
};
