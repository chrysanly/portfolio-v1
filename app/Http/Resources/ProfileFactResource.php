<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\ProfileFact;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin ProfileFact
 */
final class ProfileFactResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->public_id,
            'label' => $this->label,
            'value' => $this->value,
            'isAccent' => $this->is_accent,
            'position' => $this->position,
            'isVisible' => $this->is_visible,
        ];
    }
}
