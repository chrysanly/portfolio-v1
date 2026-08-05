<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\Work;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Work
 */
final class WorkResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->public_id,
            'eyebrow' => $this->eyebrow,
            'title' => $this->title,
            'description' => $this->description,
            'mediaLabel' => $this->media_label,
            'imagePath' => $this->image_path,
            'imageUrl' => $this->image_path === null ? null : asset($this->image_path),
            'position' => $this->position,
            'isVisible' => $this->is_visible,
        ];
    }
}
