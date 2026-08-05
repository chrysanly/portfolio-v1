<?php

declare(strict_types=1);

namespace App\Services\Portfolio;

use App\Http\Resources\CapabilityGroupResource;
use App\Http\Resources\ContactTileResource;
use App\Http\Resources\ExperienceResource;
use App\Http\Resources\PageSectionResource;
use App\Http\Resources\ProfileFactResource;
use App\Http\Resources\SiteSettingResource;
use App\Http\Resources\StatResource;
use App\Http\Resources\WorkResource;

/**
 * Builds the single shaped payload the public page renders from.
 *
 * Resources do the shaping; this class decides what is published and keeps the
 * result cached until a write busts it.
 */
final readonly class PortfolioContentService
{
    public function __construct(
        private ContentRepository $content,
        private PortfolioCache $cache,
    ) {}

    /**
     * @return array<string, mixed>
     */
    public function published(): array
    {
        return $this->cache->remember(fn (): array => [
            'settings' => SiteSettingResource::make($this->content->settings())->resolve(),
            'sections' => PageSectionResource::collection($this->content->sections(onlyVisible: true))->resolve(),
            'stats' => StatResource::collection($this->content->stats(onlyVisible: true))->resolve(),
            'profileFacts' => ProfileFactResource::collection($this->content->profileFacts(onlyVisible: true))->resolve(),
            'capabilityGroups' => CapabilityGroupResource::collection($this->content->capabilityGroups(onlyVisible: true))->resolve(),
            'experiences' => ExperienceResource::collection($this->content->experiences(onlyVisible: true))->resolve(),
            'works' => WorkResource::collection($this->content->works(onlyVisible: true))->resolve(),
            'contactTiles' => ContactTileResource::collection($this->content->contactTiles(onlyVisible: true))->resolve(),
        ]);
    }
}
