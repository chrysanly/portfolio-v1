<?php

declare(strict_types=1);

namespace App\Models;

use App\Models\Concerns\HasPublicId;
use App\Models\Concerns\Orderable;
use Database\Factories\ExperienceFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * One role in the experience accordion.
 *
 * @property int $id
 * @property string $public_id
 * @property string $period_label
 * @property string $role
 * @property string $company
 * @property bool $is_current
 * @property bool $is_expanded_by_default
 * @property int $position
 * @property bool $is_visible
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Collection<int, ExperienceHighlight> $highlights
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static> visible()
 * @method static \Illuminate\Database\Eloquent\Builder<static> ordered()
 */
#[Fillable([
    'period_label',
    'role',
    'company',
    'is_current',
    'is_expanded_by_default',
    'position',
    'is_visible',
])]
final class Experience extends Model
{
    /** @use HasFactory<ExperienceFactory> */
    use HasFactory, HasPublicId;

    /** @use Orderable<self> */
    use Orderable;

    /**
     * @return HasMany<ExperienceHighlight, $this>
     */
    public function highlights(): HasMany
    {
        return $this->hasMany(ExperienceHighlight::class);
    }

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'is_current' => 'boolean',
            'is_expanded_by_default' => 'boolean',
            'position' => 'integer',
            'is_visible' => 'boolean',
        ];
    }
}
