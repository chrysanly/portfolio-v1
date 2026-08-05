<?php

declare(strict_types=1);

namespace App\Enums;

/**
 * Which of the two brand accents a marker/value uses. Kept as an enum rather
 * than a colour string so the palette lives in CSS tokens only (DESIGN §2).
 */
enum AccentMarker: string
{
    case Primary = 'primary';
    case Secondary = 'secondary';

    public function label(): string
    {
        return match ($this) {
            self::Primary => __('Primary accent'),
            self::Secondary => __('Secondary accent'),
        };
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
