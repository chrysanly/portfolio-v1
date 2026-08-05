<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\CapabilityItem;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin CapabilityItem
 */
final class CapabilityItemResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->public_id,
            'label' => $this->label,
            'position' => $this->position,
            'isVisible' => $this->is_visible,
        ];
    }
}
