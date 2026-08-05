<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('page_sections', function (Blueprint $table): void {
            $table->id();
            $table->ulid('public_id')->unique();

            // Structural key, mirrors App\Enums\SectionKey — one row per section.
            $table->string('key', 30)->unique();
            $table->string('nav_label', 40);
            $table->string('heading', 80);

            // Optional aside next to the heading, e.g. "— click a row to expand".
            $table->string('note', 120)->nullable();

            $table->unsignedSmallInteger('position');
            $table->boolean('is_visible')->default(true);
            $table->timestamps();

            $table->index(['is_visible', 'position'], 'idx_page_sections_visible_position');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('page_sections');
    }
};
