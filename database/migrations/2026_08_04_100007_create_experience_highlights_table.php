<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('experience_highlights', function (Blueprint $table): void {
            $table->id();
            $table->ulid('public_id')->unique();
            $table->foreignId('experience_id')->constrained()->cascadeOnDelete();
            $table->string('description', 400);
            $table->unsignedSmallInteger('position');
            $table->boolean('is_visible')->default(true);
            $table->timestamps();

            // Same bullet twice under one role is always a mistake.
            $table->unique(['experience_id', 'description'], 'uniq_experience_highlights_entry_text');
            $table->index(['experience_id', 'is_visible', 'position'], 'idx_experience_highlights_entry_visible_position');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('experience_highlights');
    }
};
