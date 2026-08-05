<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\Experience;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Experience
 */
final class ExperienceResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->public_id,
            'periodLabel' => $this->period_label,
            'role' => $this->role,
            'company' => $this->company,
            'isCurrent' => $this->is_current,
            'isExpandedByDefault' => $this->is_expanded_by_default,
            'position' => $this->position,
            'isVisible' => $this->is_visible,

            // Plain array, for the same reason as CapabilityGroupResource::items.
            'highlights' => $this->relationLoaded('highlights')
                ? ExperienceHighlightResource::collection($this->highlights)->resolve()
                : [],
        ];
    }
}
