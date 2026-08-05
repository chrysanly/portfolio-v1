<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('contact_tiles', function (Blueprint $table): void {
            $table->id();
            $table->ulid('public_id')->unique();

            // App\Enums\ContactChannel — one tile per channel.
            $table->string('channel', 20)->unique();

            $table->string('title', 60);
            $table->string('value_label', 160);
            $table->string('href', 255);

            // e.g. "PREFERRED" on the first tile.
            $table->string('badge_label', 24)->nullable();

            $table->unsignedSmallInteger('position');
            $table->boolean('is_visible')->default(true);
            $table->timestamps();

            $table->index(['is_visible', 'position'], 'idx_contact_tiles_visible_position');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contact_tiles');
    }
};
