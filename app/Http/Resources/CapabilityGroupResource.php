<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\CapabilityGroup;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin CapabilityGroup
 */
final class CapabilityGroupResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->public_id,
            'name' => $this->name,
            'marker' => $this->marker->value,
            'position' => $this->position,
            'isVisible' => $this->is_visible,

            // Resolved to a plain array here rather than left as a lazy resource
            // collection: this payload is cached, and only arrays and scalars
            // survive a cache round-trip predictably. `relationLoaded` keeps the
            // N+1 guard that `whenLoaded` gave us.
            'items' => $this->relationLoaded('items')
                ? CapabilityItemResource::collection($this->items)->resolve()
                : [],
        ];
    }
}
