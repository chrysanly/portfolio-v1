<?php

declare(strict_types=1);

namespace App\Enums;

enum ThemeMode: string
{
    case System = 'system';
    case Light = 'light';
    case Dark = 'dark';

    public function label(): string
    {
        return match ($this) {
            self::System => __('Follow the visitor’s system'),
            self::Light => __('Light'),
            self::Dark => __('Dark'),
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
