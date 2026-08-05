<?php

declare(strict_types=1);

namespace App\Models;

use App\Models\Concerns\HasPublicId;
use App\Models\Concerns\Orderable;
use Database\Factories\StatFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * One tile in the headline figures strip.
 *
 * @property int $id
 * @property string $public_id
 * @property string $label
 * @property string $value
 * @property bool $is_accent
 * @property int $position
 * @property bool $is_visible
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static> visible()
 * @method static \Illuminate\Database\Eloquent\Builder<static> ordered()
 */
#[Fillable(['label', 'value', 'is_accent', 'position', 'is_visible'])]
final class Stat extends Model
{
    /** @use HasFactory<StatFactory> */
    use HasFactory, HasPublicId;

    /** @use Orderable<self> */
    use Orderable;

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'is_accent' => 'boolean',
            'position' => 'integer',
            'is_visible' => 'boolean',
        ];
    }
}
