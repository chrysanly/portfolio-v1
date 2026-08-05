<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('site_settings', function (Blueprint $table): void {
            $table->id();
            $table->ulid('public_id')->unique();

            // Guarantees the singleton at the database level: a second row is
            // impossible, so the app never has to guess which row is "the" one.
            $table->char('singleton_key', 1)->default('x')->unique();

            // Header
            $table->string('brand_label', 80);
            $table->string('availability_label', 60);

            // Hero
            $table->string('hero_eyebrow', 80);
            $table->string('hero_headline_lead', 200);
            $table->string('hero_headline_highlight', 80);
            $table->text('hero_summary');
            $table->string('portrait_path', 255);
            $table->string('portrait_alt', 160);
            $table->string('portrait_badge_start', 24);
            $table->string('portrait_badge_end', 24);

            // Profile section prose
            $table->text('profile_lead');
            $table->text('profile_closing');

            // Contact headline, split so only the middle span carries the gradient
            $table->string('contact_headline_lead', 160);
            $table->string('contact_headline_highlight', 60);
            $table->string('contact_headline_tail', 160);

            // Footer
            $table->string('footer_start', 200);
            $table->string('footer_end', 120);

            // Reachability — PII, see SCHEMA Part B
            $table->string('email', 255);
            $table->string('whatsapp_url', 255);
            $table->string('phone_number', 20);
            $table->string('resume_path', 255);

            // SEO
            $table->string('meta_title', 120);
            $table->string('meta_description', 255);

            // Presentation defaults
            $table->unsignedSmallInteger('accent_hue')->default(170);
            $table->string('default_theme', 10)->default('system');

            $table->timestamps();
        });

        if (DB::connection()->getDriverName() !== 'sqlite') {
            DB::statement('ALTER TABLE site_settings ADD CONSTRAINT chk_site_settings_accent_hue CHECK (accent_hue BETWEEN 0 AND 360)');
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('site_settings');
    }
};
