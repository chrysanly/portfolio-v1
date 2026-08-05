<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\ExperienceHighlight;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin ExperienceHighlight
 */
final class ExperienceHighlightResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->public_id,
            'description' => $this->description,
            'position' => $this->position,
            'isVisible' => $this->is_visible,
        ];
    }
}
