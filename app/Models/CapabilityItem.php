<?php

declare(strict_types=1);

namespace App\Models;

use App\Models\Concerns\HasPublicId;
use App\Models\Concerns\Orderable;
use Database\Factories\CapabilityItemFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * One technology tag inside a capability group.
 *
 * @property int $id
 * @property string $public_id
 * @property int $capability_group_id
 * @property string $label
 * @property int $position
 * @property bool $is_visible
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read CapabilityGroup $group
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static> visible()
 * @method static \Illuminate\Database\Eloquent\Builder<static> ordered()
 */
#[Fillable(['capability_group_id', 'label', 'position', 'is_visible'])]
final class CapabilityItem extends Model
{
    /** @use HasFactory<CapabilityItemFactory> */
    use HasFactory, HasPublicId;

    /** @use Orderable<self> */
    use Orderable;

    /**
     * @return BelongsTo<CapabilityGroup, $this>
     */
    public function group(): BelongsTo
    {
        return $this->belongsTo(CapabilityGroup::class, 'capability_group_id');
    }

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'position' => 'integer',
            'is_visible' => 'boolean',
        ];
    }
}
