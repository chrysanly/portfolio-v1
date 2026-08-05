<?php

declare(strict_types=1);

namespace App\Enums;

/**
 * The kind of contact tile, which decides how the link behaves in the browser
 * (mailto, download, tel, external) — never a free-text field (SCHEMA §A3).
 */
enum ContactChannel: string
{
    case Email = 'email';
    case Resume = 'resume';
    case WhatsApp = 'whatsapp';
    case Phone = 'phone';
    case Link = 'link';

    public function label(): string
    {
        return match ($this) {
            self::Email => __('Email'),
            self::Resume => __('Résumé download'),
            self::WhatsApp => __('WhatsApp'),
            self::Phone => __('Phone call'),
            self::Link => __('External link'),
        };
    }

    /**
     * Whether the anchor should carry a `download` attribute.
     */
    public function isDownload(): bool
    {
        return $this === self::Resume;
    }

    /**
     * @return array<int, array{value: string, label: string}>
     */
    public static function options(): array
    {
        return array_map(
            static fn (self $case): array => ['value' => $case->value, 'label' => $case->label()],
            self::cases(),
        );
    }
}
