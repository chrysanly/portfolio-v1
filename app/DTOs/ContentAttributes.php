<?php

declare(strict_types=1);

namespace App\DTOs;

use Illuminate\Foundation\Http\FormRequest;

/**
 * The validated content values crossing from HTTP into an Action.
 *
 * Actions never see the request, the session, or the PIN: they see this object
 * (ARCHITECTURE §3 — data arrives via DTO). The PIN is deliberately dropped
 * here so it can never reach a model's fill().
 */
final readonly class ContentAttributes
{
    /**
     * @param  array<string, mixed>  $values
     */
    private function __construct(private array $values) {}

    public static function fromRequest(FormRequest $request): self
    {
        /** @var array<string, mixed> $validated */
        $validated = $request->validated();

        unset($validated['pin']);

        return new self($validated);
    }

    /**
     * @param  array<string, mixed>  $values
     */
    public static function fromArray(array $values): self
    {
        unset($values['pin']);

        return new self($values);
    }

    /**
     * Attach a value the client is not allowed to choose — a parent foreign key
     * resolved from the route, for instance.
     */
    public function with(string $key, mixed $value): self
    {
        return new self([...$this->values, $key => $value]);
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        return $this->values;
    }
}
