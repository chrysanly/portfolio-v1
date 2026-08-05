<?php

declare(strict_types=1);

namespace App\Models;

use App\Models\Concerns\HasPublicId;
use App\Models\Concerns\Orderable;
use Database\Factories\WorkFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * One card in the Selected work grid.
 *
 * @property int $id
 * @property string $public_id
 * @property string $eyebrow
 * @property string $title
 * @property string $description
 * @property string $media_label
 * @property string|null $image_path
 * @property int $position
 * @property bool $is_visible
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static> visible()
 * @method static \Illuminate\Database\Eloquent\Builder<static> ordered()
 */
#[Fillable([
    'eyebrow',
    'title',
    'description',
    'media_label',
    'image_path',
    'position',
    'is_visible',
])]
final class Work extends Model
{
    /** @use HasFactory<WorkFactory> */
    use HasFactory, HasPublicId;

    /** @use Orderable<self> */
    use Orderable;

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
