<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\ContactChannel;
use App\Models\Concerns\HasPublicId;
use App\Models\Concerns\Orderable;
use Database\Factories\ContactTileFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * One tile in the contact strip.
 *
 * @property int $id
 * @property string $public_id
 * @property ContactChannel $channel
 * @property string $title
 * @property string $value_label
 * @property string $href
 * @property string|null $badge_label
 * @property int $position
 * @property bool $is_visible
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static> visible()
 * @method static \Illuminate\Database\Eloquent\Builder<static> ordered()
 */
#[Fillable([
    'channel',
    'title',
    'value_label',
    'href',
    'badge_label',
    'position',
    'is_visible',
])]
final class ContactTile extends Model
{
    /** @use HasFactory<ContactTileFactory> */
    use HasFactory, HasPublicId;

    /** @use Orderable<self> */
    use Orderable;

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'channel' => ContactChannel::class,
            'position' => 'integer',
            'is_visible' => 'boolean',
        ];
    }
}
