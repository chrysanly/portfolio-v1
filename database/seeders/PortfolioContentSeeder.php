<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Enums\AccentMarker;
use App\Enums\ContactChannel;
use App\Enums\SectionKey;
use App\Models\CapabilityGroup;
use App\Models\ContactTile;
use App\Models\Experience;
use App\Models\PageSection;
use App\Models\ProfileFact;
use App\Models\SiteSetting;
use App\Models\Stat;
use App\Models\Work;
use Illuminate\Database\Seeder;

/**
 * The real portfolio content, verbatim from docs/mockups/CJ Roma Portfolio.html.
 *
 * Idempotent: every row is matched on its unique business key, so re-running
 * after an edit in the admin restores the shipped baseline without duplicating
 * anything (SCHEMA §A6, RULES §9.3 — real content, never lorem ipsum).
 */
final class PortfolioContentSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedSettings();
        $this->seedSections();
        $this->seedStats();
        $this->seedProfileFacts();
        $this->seedCapabilities();
        $this->seedExperiences();
        $this->seedWorks();
        $this->seedContactTiles();
    }

    private function seedSettings(): void
    {
        SiteSetting::query()->updateOrCreate(['singleton_key' => 'x'], [
            'brand_label' => 'CJ ROMA — ENGINEERING PROFILE',
            'availability_label' => 'AVAILABLE FOR HIRE',

            'hero_eyebrow' => 'SENIOR FULL-STACK DEVELOPER',
            'hero_headline_lead' => 'Chrysanly John C. Roma builds systems that',
            'hero_headline_highlight' => 'grow, not just run.',
            'hero_summary' => '5+ years shipping Laravel and Node.js applications, RESTful APIs and enterprise ERP systems. Proven on role-based access control, service–repository architecture, database optimisation and real-time integration — with a track record of leading teams and mentoring engineers along the way.',

            'portrait_path' => 'images/cj-portrait.jpeg',
            'portrait_alt' => 'Chrysanly John C. Roma',
            'portrait_badge_start' => 'ID · CJR',
            'portrait_badge_end' => 'STABLE',

            'profile_lead' => 'I lead development teams, review code and mentor engineers — and I’m still the one in the repository refactor, the aging report, the middleware guarding every module.',
            'profile_closing' => 'Financial aging across debit and credit balances, asset depreciation, RBAC middleware, OAuth/OTP authentication, real-time events over Pusher and Firebase — with Repository and Service Layer architecture underneath all of it. AI-assisted workflows are part of how I ship faster without lowering the bar.',

            'contact_headline_lead' => 'Got a system that needs to',
            'contact_headline_highlight' => 'hold up',
            'contact_headline_tail' => 'under real load?',

            'footer_start' => 'CHRYSANLY JOHN C. ROMA · SENIOR FULL-STACK DEVELOPER',
            'footer_end' => 'DUBAI, UAE · 2026',

            'email' => 'chrys.romao21@gmail.com',
            'whatsapp_url' => 'https://wa.me/971529258013',
            'phone_number' => '+971 52 925 8013',
            'resume_path' => 'CJ_Roma_Resume.pdf',

            'meta_title' => 'CJ Roma | Senior Full-Stack Developer',
            'meta_description' => 'Chrysanly John C. Roma — Senior Full-Stack Developer in Dubai. Laravel, React, Node.js, enterprise ERP, RBAC and real-time integration.',

            'accent_hue' => 170,
            'default_theme' => 'system',
        ]);
    }

    private function seedSections(): void
    {
        $sections = [
            [SectionKey::Hero, 'OVERVIEW', 'Overview', null],
            [SectionKey::Profile, 'PROFILE', 'Profile', null],
            [SectionKey::Capabilities, 'CAPABILITIES', 'Capabilities', null],
            [SectionKey::Experience, 'EXPERIENCE', 'Experience', '— click a row to expand'],
            [SectionKey::Work, 'SELECTED WORK', 'Selected work', null],
            [SectionKey::Contact, 'CONTACT', 'Contact', null],
        ];

        foreach ($sections as $position => [$key, $navLabel, $heading, $note]) {
            PageSection::query()->updateOrCreate(['key' => $key], [
                'nav_label' => $navLabel,
                'heading' => $heading,
                'note' => $note,
                'position' => $position + 1,
                'is_visible' => true,
            ]);
        }
    }

    private function seedStats(): void
    {
        $stats = [
            ['YEARS OF EXPERIENCE', '5+', true],
            ['COMPANIES', '5', false],
            ['ERP MODULES OWNED', '4', false],
        ];

        foreach ($stats as $position => [$label, $value, $isAccent]) {
            Stat::query()->updateOrCreate(['label' => $label], [
                'value' => $value,
                'is_accent' => $isAccent,
                'position' => $position + 1,
                'is_visible' => true,
            ]);
        }
    }

    private function seedProfileFacts(): void
    {
        $facts = [
            ['Full name', 'Chrysanly John Corpuz Roma', false],
            ['Title', 'Senior Full-Stack Developer', false],
            ['Location', 'Dubai, UAE · GMT+4', false],
            ['Date of birth', '24 June 1997', false],
            ['Civil status', 'Single', false],
            ['Languages', 'Filipino, English', false],
            ['Education', 'BS Information Technology — Our Lady of Lourdes College, Valenzuela City, 2020', false],
            ['Availability', 'Open to senior full-stack roles & freelance', true],
        ];

        foreach ($facts as $position => [$label, $value, $isAccent]) {
            ProfileFact::query()->updateOrCreate(['label' => $label], [
                'value' => $value,
                'is_accent' => $isAccent,
                'position' => $position + 1,
                'is_visible' => true,
            ]);
        }
    }

    private function seedCapabilities(): void
    {
        $groups = [
            ['Languages & Frameworks', AccentMarker::Primary, [
                'PHP', 'JavaScript', 'Dart', 'SQL', 'HTML', 'CSS/SCSS', 'Laravel 7–12', 'Node.js',
                'Vue 3', 'React', 'Angular 7–10', '.NET Web API', 'Flutter', 'Ionic 5',
            ]],
            ['Databases', AccentMarker::Secondary, [
                'MySQL', 'MariaDB', 'PostgreSQL', 'MongoDB', 'Firebase Firestore',
            ]],
            ['Architecture & Practices', AccentMarker::Primary, [
                'SOLID Principles', 'Repository Pattern', 'Service Layer Pattern', 'RESTful API Design',
                'RBAC', 'TDD', 'Clean Code', 'Conventional Commits', 'Agile/Scrum',
            ]],
            ['Authentication & Security', AccentMarker::Secondary, [
                'Laravel Sanctum', 'Laravel Passport OAuth', 'Twilio OTP', 'JWT',
            ]],
            ['Tools & Platforms', AccentMarker::Primary, [
                'Git', 'GitHub', 'GitLab', 'Azure', 'AWS', 'Firebase', 'Docker', 'Postman', 'JIRA',
                'Figma', 'Composer', 'NPM', 'Vite', 'Webpack',
            ]],
            ['Testing', AccentMarker::Secondary, [
                'PHPUnit', 'Pest', 'Firebase Emulator',
            ]],
            ['AI-Assisted Development', AccentMarker::Primary, [
                'AI-driven code integration', 'Performance optimisation', 'Workflow automation',
            ]],
        ];

        foreach ($groups as $groupPosition => [$name, $marker, $items]) {
            $group = CapabilityGroup::query()->updateOrCreate(['name' => $name], [
                'marker' => $marker,
                'position' => $groupPosition + 1,
                'is_visible' => true,
            ]);

            foreach ($items as $itemPosition => $label) {
                $group->items()->updateOrCreate(['label' => $label], [
                    'position' => $itemPosition + 1,
                    'is_visible' => true,
                ]);
            }
        }
    }

    private function seedExperiences(): void
    {
        $experiences = [
            [
                'period' => 'NOV 25 — NOW',
                'role' => 'Senior Full-Stack Developer',
                'company' => 'Almutakamela Vehicle Testing & Registration · Dubai, UAE',
                'current' => true,
                'open' => true,
                'highlights' => [
                    'Led development of a modular ERP system in Laravel spanning four core modules: Dashboard, Finance, Mobile CIS, and API App',
                    'Implemented role-based middleware for authentication and permission management, securing access across all modules by user role',
                    'Built the Finance module with role-permissioned accounting pages, financial aging logic for debit and credit balances, and asset depreciation tracking',
                    'Developed the Mobile CIS module to manage client service appointments based on customer information',
                    'Delivered the Dashboard module to configure mobile API data categories and service listings',
                    'Built secure REST APIs with Laravel Sanctum to power mobile app authentication and integration',
                    'Refactored core business logic using Repository and Service Layer patterns, improving code reusability, Eloquent query performance, and maintainability',
                    'Reviewed developer code and mentored team members to uphold clean architecture and coding standards',
                    'Applied AI-assisted tools to streamline integration tasks, optimise performance, and automate repetitive workflows',
                ],
            ],
            [
                'period' => 'MAR—AUG 25',
                'role' => 'Senior PHP Developer',
                'company' => 'OmniQuest PH (Unilab) · Philippines',
                'current' => false,
                'open' => false,
                'highlights' => [
                    'Managed a single project comprising four interconnected systems integrated with a central CRM, ensuring seamless data flow and functionality across all platforms',
                    'Developed a dynamic CRM registration module reusable across multiple events, improving flexibility and reducing setup time for new campaigns',
                    'Authored technical documentation to establish a structured local-to-beta-to-live deployment workflow, improving release stability and reducing risk to production',
                    'Updated database stored procedures and functions to align with evolving client requirements, improving data accuracy and system performance',
                ],
            ],
            [
                'period' => 'NOV22—FEB25',
                'role' => 'Web Developer',
                'company' => 'ThinkBit Solutions Phils. Inc · Philippines',
                'current' => false,
                'open' => false,
                'highlights' => [
                    'Led full-stack Laravel development for multiple high-performance web applications with real-time features, API integrations, and secure authentication',
                    'Managed Agile processes including sprint planning, backlog grooming, and stand-ups while mentoring junior developers',
                    'Developed real-time backend systems using Pusher, Firebase, and Twilio APIs; integrated Google Maps, Monday.com, and AWS S3',
                    'Refactored legacy Laravel 5 systems to current versions, optimising APIs and database performance',
                    'Built secure authentication solutions including Twilio OTP and Laravel Passport OAuth',
                    'Developed a proof-of-concept facial recognition login system with activity logging and API integration',
                ],
            ],
            [
                'period' => 'JAN21—OCT22',
                'role' => 'Mid Software Developer',
                'company' => 'TourismoPH · Philippines',
                'current' => false,
                'open' => false,
                'highlights' => [
                    'Built a JWT-secured booking system with real-time availability, RESTful APIs, and React front-end enhancements',
                    'Developed a vendor management system, migrating a Laravel CMS to Node.js with subscription features and Angular dashboards documented via Swagger',
                    'Created a membership system for a government website with bulk CSV uploads and dynamic region and category reporting',
                    'Applied Agile methodologies for sprint planning, backlog management, and iterative delivery',
                ],
            ],
            [
                'period' => 'NOV18—DEC20',
                'role' => 'Junior Web Developer',
                'company' => 'V. Zuniga Logistics · Philippines',
                'current' => false,
                'open' => false,
                'highlights' => [
                    'Developed and maintained internal web applications using PHP and ASP.NET, implementing business requirements and resolving application issues',
                    'Assisted in the migration, enhancement, and maintenance of the ZAP Inventory Management System, contributing to feature development and workflow improvements',
                    'Designed and maintained database queries, generated operational reports, and supported inventory management processes',
                    'Collaborated with senior developers and business users to troubleshoot, test, and deploy application updates',
                    'Performed basic system administration and provided technical support for hardware, software, and network-related issues when required',
                ],
            ],
        ];

        foreach ($experiences as $position => $entry) {
            $experience = Experience::query()->updateOrCreate(
                ['role' => $entry['role'], 'company' => $entry['company']],
                [
                    'period_label' => $entry['period'],
                    'is_current' => $entry['current'],
                    'is_expanded_by_default' => $entry['open'],
                    'position' => $position + 1,
                    'is_visible' => true,
                ],
            );

            foreach ($entry['highlights'] as $highlightPosition => $description) {
                $experience->highlights()->updateOrCreate(['description' => $description], [
                    'position' => $highlightPosition + 1,
                    'is_visible' => true,
                ]);
            }
        }
    }

    private function seedWorks(): void
    {
        $works = [
            [
                'eyebrow' => 'ERP · LARAVEL · RBAC',
                'title' => 'Modular ERP — four modules',
                'description' => 'Dashboard, Finance, Mobile CIS, API App. Aging balances, depreciation, RBAC middleware, Sanctum APIs.',
                'media_label' => 'ERP finance screen',
            ],
            [
                'eyebrow' => 'CRM · INTEGRATION',
                'title' => 'Four systems, one CRM',
                'description' => 'Unified platforms for Unilab, a reusable event registration module, a documented release workflow.',
                'media_label' => 'CRM registration screen',
            ],
            [
                'eyebrow' => 'REAL-TIME · AUTH',
                'title' => 'Real-time platforms & secure auth',
                'description' => 'Pusher/Firebase/Twilio events, OTP + OAuth, a facial-recognition login POC.',
                'media_label' => 'Real-time app screen',
            ],
            [
                'eyebrow' => 'BOOKING · JWT · REACT',
                'title' => 'JWT-secured booking platform',
                'description' => 'Real-time availability, RESTful APIs and React front-end work for TourismoPH.',
                'media_label' => 'Booking availability screen',
            ],
            [
                'eyebrow' => 'MIGRATION · NODE · ANGULAR',
                'title' => 'Vendor management, CMS to Node',
                'description' => 'A Laravel CMS migrated to Node.js with subscriptions and Angular dashboards documented via Swagger.',
                'media_label' => 'Vendor dashboard screen',
            ],
            [
                'eyebrow' => 'INVENTORY · PHP · ASP.NET',
                'title' => 'ZAP Inventory Management',
                'description' => 'Migration and upkeep of the warehouse inventory system, with operational reporting.',
                'media_label' => 'Inventory report screen',
            ],
        ];

        foreach ($works as $position => $work) {
            Work::query()->updateOrCreate(['title' => $work['title']], [
                'eyebrow' => $work['eyebrow'],
                'description' => $work['description'],
                'media_label' => $work['media_label'],
                'image_path' => null,
                'position' => $position + 1,
                'is_visible' => true,
            ]);
        }
    }

    private function seedContactTiles(): void
    {
        $tiles = [
            [ContactChannel::Email, 'Email', 'chrys.romao21@gmail.com', 'mailto:chrys.romao21@gmail.com', 'PREFERRED'],
            [ContactChannel::Resume, 'Résumé', 'CJ_Roma_Resume.pdf', '/CJ_Roma_Resume.pdf', null],
            [ContactChannel::WhatsApp, 'WhatsApp', '+971 52 925 8013', 'https://wa.me/971529258013', null],
            [ContactChannel::Phone, 'Call', 'Mon–Sat · GMT+4', 'tel:+971529258013', null],
        ];

        foreach ($tiles as $position => [$channel, $title, $valueLabel, $href, $badge]) {
            ContactTile::query()->updateOrCreate(['channel' => $channel], [
                'title' => $title,
                'value_label' => $valueLabel,
                'href' => $href,
                'badge_label' => $badge,
                'position' => $position + 1,
                'is_visible' => true,
            ]);
        }
    }
}
