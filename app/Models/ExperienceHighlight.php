<?php

declare(strict_types=1);

namespace App\Models;

use App\Models\Concerns\HasPublicId;
use App\Models\Concerns\Orderable;
use Database\Factories\ExperienceHighlightFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * One bullet under an experience entry.
 *
 * @property int $id
 * @property string $public_id
 * @property int $experience_id
 * @property string $description
 * @property int $position
 * @property bool $is_visible
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Experience $experience
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static> visible()
 * @method static \Illuminate\Database\Eloquent\Builder<static> ordered()
 */
#[Fillable(['experience_id', 'description', 'position', 'is_visible'])]
final class ExperienceHighlight extends Model
{
    /** @use HasFactory<ExperienceHighlightFactory> */
    use HasFactory, HasPublicId;

    /** @use Orderable<self> */
    use Orderable;

    /**
     * @return BelongsTo<Experience, $this>
     */
    public function experience(): BelongsTo
    {
        return $this->belongsTo(Experience::class);
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
