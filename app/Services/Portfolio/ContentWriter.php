<?php

declare(strict_types=1);

namespace App\Services\Portfolio;

use App\Exceptions\DuplicateContentException;
use Illuminate\Database\DatabaseManager;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\UniqueConstraintViolationException;
use Throwable;

/**
 * The write mechanics shared by every content Action: one transaction, one
 * duplicate-to-domain-error translation, one cache bust.
 *
 * Actions stay one-business-operation each (RULES §3-S) without twenty-six
 * copies of the same try/catch (RULES §3-DRY).
 */
final readonly class ContentWriter
{
    public function __construct(
        private DatabaseManager $db,
        private PortfolioCache $cache,
    ) {}

    /**
     * @template TModel of Model
     *
     * @param  class-string<TModel>  $model
     * @param  array<string, mixed>  $attributes
     * @return TModel
     */
    public function create(string $model, array $attributes, string $subject): Model
    {
        return $this->write(function () use ($model, $attributes, $subject): Model {
            try {
                return $model::query()->create($attributes);
            } catch (UniqueConstraintViolationException) {
                throw DuplicateContentException::for($subject);
            }
        });
    }

    /**
     * @template TModel of Model
     *
     * @param  TModel  $model
     * @param  array<string, mixed>  $attributes
     * @return TModel
     */
    public function update(Model $model, array $attributes, string $subject): Model
    {
        return $this->write(function () use ($model, $attributes, $subject): Model {
            try {
                $model->fill($attributes)->save();
            } catch (UniqueConstraintViolationException) {
                throw DuplicateContentException::for($subject);
            }

            return $model;
        });
    }

    public function delete(Model $model): void
    {
        $this->write(function () use ($model): Model {
            $model->delete();

            return $model;
        });
    }

    /**
     * @template TResult of Model
     *
     * @param  callable(): TResult  $operation
     * @return TResult
     *
     * @throws Throwable
     */
    private function write(callable $operation): Model
    {
        $result = $this->db->transaction($operation);

        // Busting after commit means a visitor can never read a cache entry
        // rebuilt from an uncommitted transaction.
        $this->cache->flush();

        return $result;
    }
}
