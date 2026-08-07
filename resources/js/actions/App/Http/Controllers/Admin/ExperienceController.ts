import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ExperienceController::index
 * @see app/Http/Controllers/Admin/ExperienceController.php:29
 * @route '/admin/experiences'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/experiences',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ExperienceController::index
 * @see app/Http/Controllers/Admin/ExperienceController.php:29
 * @route '/admin/experiences'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExperienceController::index
 * @see app/Http/Controllers/Admin/ExperienceController.php:29
 * @route '/admin/experiences'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ExperienceController::index
 * @see app/Http/Controllers/Admin/ExperienceController.php:29
 * @route '/admin/experiences'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ExperienceController::index
 * @see app/Http/Controllers/Admin/ExperienceController.php:29
 * @route '/admin/experiences'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ExperienceController::index
 * @see app/Http/Controllers/Admin/ExperienceController.php:29
 * @route '/admin/experiences'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ExperienceController::index
 * @see app/Http/Controllers/Admin/ExperienceController.php:29
 * @route '/admin/experiences'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Admin\ExperienceController::store
 * @see app/Http/Controllers/Admin/ExperienceController.php:36
 * @route '/admin/experiences'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/experiences',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ExperienceController::store
 * @see app/Http/Controllers/Admin/ExperienceController.php:36
 * @route '/admin/experiences'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExperienceController::store
 * @see app/Http/Controllers/Admin/ExperienceController.php:36
 * @route '/admin/experiences'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\ExperienceController::store
 * @see app/Http/Controllers/Admin/ExperienceController.php:36
 * @route '/admin/experiences'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ExperienceController::store
 * @see app/Http/Controllers/Admin/ExperienceController.php:36
 * @route '/admin/experiences'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\ExperienceController::update
 * @see app/Http/Controllers/Admin/ExperienceController.php:43
 * @route '/admin/experiences/{experience}'
 */
export const update = (args: { experience: string | { public_id: string } } | [experience: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/experiences/{experience}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\ExperienceController::update
 * @see app/Http/Controllers/Admin/ExperienceController.php:43
 * @route '/admin/experiences/{experience}'
 */
update.url = (args: { experience: string | { public_id: string } } | [experience: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { experience: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'public_id' in args) {
            args = { experience: args.public_id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    experience: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        experience: typeof args.experience === 'object'
                ? args.experience.public_id
                : args.experience,
                }

    return update.definition.url
            .replace('{experience}', parsedArgs.experience.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExperienceController::update
 * @see app/Http/Controllers/Admin/ExperienceController.php:43
 * @route '/admin/experiences/{experience}'
 */
update.put = (args: { experience: string | { public_id: string } } | [experience: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\ExperienceController::update
 * @see app/Http/Controllers/Admin/ExperienceController.php:43
 * @route '/admin/experiences/{experience}'
 */
update.patch = (args: { experience: string | { public_id: string } } | [experience: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\ExperienceController::update
 * @see app/Http/Controllers/Admin/ExperienceController.php:43
 * @route '/admin/experiences/{experience}'
 */
    const updateForm = (args: { experience: string | { public_id: string } } | [experience: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ExperienceController::update
 * @see app/Http/Controllers/Admin/ExperienceController.php:43
 * @route '/admin/experiences/{experience}'
 */
        updateForm.put = (args: { experience: string | { public_id: string } } | [experience: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\ExperienceController::update
 * @see app/Http/Controllers/Admin/ExperienceController.php:43
 * @route '/admin/experiences/{experience}'
 */
        updateForm.patch = (args: { experience: string | { public_id: string } } | [experience: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Admin\ExperienceController::destroy
 * @see app/Http/Controllers/Admin/ExperienceController.php:50
 * @route '/admin/experiences/{experience}'
 */
export const destroy = (args: { experience: string | { public_id: string } } | [experience: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/experiences/{experience}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ExperienceController::destroy
 * @see app/Http/Controllers/Admin/ExperienceController.php:50
 * @route '/admin/experiences/{experience}'
 */
destroy.url = (args: { experience: string | { public_id: string } } | [experience: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { experience: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'public_id' in args) {
            args = { experience: args.public_id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    experience: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        experience: typeof args.experience === 'object'
                ? args.experience.public_id
                : args.experience,
                }

    return destroy.definition.url
            .replace('{experience}', parsedArgs.experience.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExperienceController::destroy
 * @see app/Http/Controllers/Admin/ExperienceController.php:50
 * @route '/admin/experiences/{experience}'
 */
destroy.delete = (args: { experience: string | { public_id: string } } | [experience: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\ExperienceController::destroy
 * @see app/Http/Controllers/Admin/ExperienceController.php:50
 * @route '/admin/experiences/{experience}'
 */
    const destroyForm = (args: { experience: string | { public_id: string } } | [experience: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ExperienceController::destroy
 * @see app/Http/Controllers/Admin/ExperienceController.php:50
 * @route '/admin/experiences/{experience}'
 */
        destroyForm.delete = (args: { experience: string | { public_id: string } } | [experience: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const ExperienceController = { index, store, update, destroy }

export default ExperienceController