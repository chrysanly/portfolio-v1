<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('capability_items', function (Blueprint $table): void {
            $table->id();
            $table->ulid('public_id')->unique();

            // A tag belongs to exactly one group and dies with it.
            $table->foreignId('capability_group_id')->constrained()->cascadeOnDelete();

            $table->string('label', 60);
            $table->unsignedSmallInteger('position');
            $table->boolean('is_visible')->default(true);
            $table->timestamps();

            $table->unique(['capability_group_id', 'label'], 'uniq_capability_items_group_label');
            $table->index(['capability_group_id', 'is_visible', 'position'], 'idx_capability_items_group_visible_position');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('capability_items');
    }
};
