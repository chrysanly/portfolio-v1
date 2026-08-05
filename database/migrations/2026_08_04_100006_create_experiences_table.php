<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('experiences', function (Blueprint $table): void {
            $table->id();
            $table->ulid('public_id')->unique();

            // Free-form because the mockup prints compact ranges verbatim
            // ("2025 — NOW", "NOV22—FEB25") rather than formatted dates.
            $table->string('period_label', 24);
            $table->string('role', 100);
            $table->string('company', 200);

            $table->boolean('is_current')->default(false);
            $table->boolean('is_expanded_by_default')->default(false);
            $table->unsignedSmallInteger('position');
            $table->boolean('is_visible')->default(true);
            $table->timestamps();

            $table->unique(['role', 'company'], 'uniq_experiences_role_company');
            $table->index(['is_visible', 'position'], 'idx_experiences_visible_position');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('experiences');
    }
};
