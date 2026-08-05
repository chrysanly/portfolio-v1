<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\ContactTile;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin ContactTile
 */
final class ContactTileResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->public_id,
            'channel' => $this->channel->value,
            'channelLabel' => $this->channel->label(),
            'isDownload' => $this->channel->isDownload(),
            'title' => $this->title,
            'valueLabel' => $this->value_label,
            'href' => $this->href,
            'badgeLabel' => $this->badge_label,
            'position' => $this->position,
            'isVisible' => $this->is_visible,
        ];
    }
}
