<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('stats', function (Blueprint $table): void {
            $table->id();
            $table->ulid('public_id')->unique();

            // One stat per label: the uniqueness rule lives here, not only in
            // validation (SCHEMA §A4).
            $table->string('label', 60)->unique();
            $table->string('value', 16);
            $table->boolean('is_accent')->default(false);
            $table->unsignedSmallInteger('position');
            $table->boolean('is_visible')->default(true);
            $table->timestamps();

            $table->index(['is_visible', 'position'], 'idx_stats_visible_position');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('stats');
    }
};
