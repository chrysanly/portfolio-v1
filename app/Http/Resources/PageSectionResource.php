<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\PageSection;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin PageSection
 */
final class PageSectionResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->public_id,
            'key' => $this->key->value,
            'anchor' => $this->key->anchor(),
            'navLabel' => $this->nav_label,
            'heading' => $this->heading,
            'note' => $this->note,
            'position' => $this->position,
            'isVisible' => $this->is_visible,
        ];
    }
}
