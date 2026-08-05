<?php

declare(strict_types=1);

namespace App\Enums;

/**
 * The fixed set of page sections. Labels and headings are editable content;
 * the keys are structural and therefore code, not data.
 */
enum SectionKey: string
{
    case Hero = 'hero';
    case Profile = 'profile';
    case Capabilities = 'capabilities';
    case Experience = 'experience';
    case Work = 'work';
    case Contact = 'contact';

    public function label(): string
    {
        return match ($this) {
            self::Hero => __('Overview'),
            self::Profile => __('Profile'),
            self::Capabilities => __('Capabilities'),
            self::Experience => __('Experience'),
            self::Work => __('Selected work'),
            self::Contact => __('Contact'),
        };
    }

    /**
     * The DOM anchor the sticky nav scrolls to.
     */
    public function anchor(): string
    {
        return $this->value;
    }
}
