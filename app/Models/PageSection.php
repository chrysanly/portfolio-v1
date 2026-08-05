<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\SectionKey;
use App\Models\Concerns\HasPublicId;
use App\Models\Concerns\Orderable;
use Database\Factories\PageSectionFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * Nav label + heading for one section of the page.
 *
 * @property int $id
 * @property string $public_id
 * @property SectionKey $key
 * @property string $nav_label
 * @property string $heading
 * @property string|null $note
 * @property int $position
 * @property bool $is_visible
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static> visible()
 * @method static \Illuminate\Database\Eloquent\Builder<static> ordered()
 */
#[Fillable(['key', 'nav_label', 'heading', 'note', 'position', 'is_visible'])]
final class PageSection extends Model
{
    /** @use HasFactory<PageSectionFactory> */
    use HasFactory, HasPublicId;

    /** @use Orderable<self> */
    use Orderable;

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'key' => SectionKey::class,
            'position' => 'integer',
            'is_visible' => 'boolean',
        ];
    }
}
