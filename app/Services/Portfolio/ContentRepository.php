<?php

declare(strict_types=1);

namespace App\Services\Portfolio;

use App\Models\CapabilityGroup;
use App\Models\ContactTile;
use App\Models\Experience;
use App\Models\PageSection;
use App\Models\ProfileFact;
use App\Models\SiteSetting;
use App\Models\Stat;
use App\Models\Work;
use Illuminate\Database\Eloquent\Collection;

/**
 * The read side of portfolio content.
 *
 * Every query lives here so controllers stay orchestration-only and the public
 * page and the admin screens can never drift on ordering or eager loading.
 */
final readonly class ContentRepository
{
    public function settings(): SiteSetting
    {
        return SiteSetting::query()->firstOrFail();
    }

    /**
     * @return Collection<int, PageSection>
     */
    public function sections(bool $onlyVisible = false): Collection
    {
        return PageSection::query()
            ->when($onlyVisible, fn ($query) => $query->visible())
            ->ordered()
            ->get();
    }

    /**
     * @return Collection<int, Stat>
     */
    public function stats(bool $onlyVisible = false): Collection
    {
        return Stat::query()
            ->when($onlyVisible, fn ($query) => $query->visible())
            ->ordered()
            ->get();
    }

    /**
     * @return Collection<int, ProfileFact>
     */
    public function profileFacts(bool $onlyVisible = false): Collection
    {
        return ProfileFact::query()
            ->when($onlyVisible, fn ($query) => $query->visible())
            ->ordered()
            ->get();
    }

    /**
     * @return Collection<int, CapabilityGroup>
     */
    public function capabilityGroups(bool $onlyVisible = false): Collection
    {
        return CapabilityGroup::query()
            ->when($onlyVisible, fn ($query) => $query->visible())
            ->with(['items' => function ($query) use ($onlyVisible): void {
                $query->when($onlyVisible, fn ($items) => $items->visible())->ordered();
            }])
            ->ordered()
            ->get();
    }

    /**
     * @return Collection<int, Experience>
     */
    public function experiences(bool $onlyVisible = false): Collection
    {
        return Experience::query()
            ->when($onlyVisible, fn ($query) => $query->visible())
            ->with(['highlights' => function ($query) use ($onlyVisible): void {
                $query->when($onlyVisible, fn ($highlights) => $highlights->visible())->ordered();
            }])
            ->ordered()
            ->get();
    }

    /**
     * @return Collection<int, Work>
     */
    public function works(bool $onlyVisible = false): Collection
    {
        return Work::query()
            ->when($onlyVisible, fn ($query) => $query->visible())
            ->ordered()
            ->get();
    }

    /**
     * @return Collection<int, ContactTile>
     */
    public function contactTiles(bool $onlyVisible = false): Collection
    {
        return ContactTile::query()
            ->when($onlyVisible, fn ($query) => $query->visible())
            ->ordered()
            ->get();
    }
}
