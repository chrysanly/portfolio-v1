<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\AccentMarker;
use App\Models\Concerns\HasPublicId;
use App\Models\Concerns\Orderable;
use Database\Factories\CapabilityGroupFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * A capability row: one label plus its tag list.
 *
 * @property int $id
 * @property string $public_id
 * @property string $name
 * @property AccentMarker $marker
 * @property int $position
 * @property bool $is_visible
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Collection<int, CapabilityItem> $items
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static> visible()
 * @method static \Illuminate\Database\Eloquent\Builder<static> ordered()
 */
#[Fillable(['name', 'marker', 'position', 'is_visible'])]
final class CapabilityGroup extends Model
{
    /** @use HasFactory<CapabilityGroupFactory> */
    use HasFactory, HasPublicId;

    /** @use Orderable<self> */
    use Orderable;

    /**
     * @return HasMany<CapabilityItem, $this>
     */
    public function items(): HasMany
    {
        return $this->hasMany(CapabilityItem::class)
            ->orderBy('position');
    }

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'marker' => AccentMarker::class,
            'position' => 'integer',
            'is_visible' => 'boolean',
        ];
    }
}
