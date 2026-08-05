<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('capability_groups', function (Blueprint $table): void {
            $table->id();
            $table->ulid('public_id')->unique();
            $table->string('name', 80)->unique();

            // App\Enums\AccentMarker
            $table->string('marker', 20)->default('primary');

            $table->unsignedSmallInteger('position');
            $table->boolean('is_visible')->default(true);
            $table->timestamps();

            $table->index(['is_visible', 'position'], 'idx_capability_groups_visible_position');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('capability_groups');
    }
};
