import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ExperienceHighlightController::store
 * @see app/Http/Controllers/Admin/ExperienceHighlightController.php:29
 * @route '/admin/experiences/{experience}/highlights'
 */
export const store = (args: { experience: string | number | { public_id: string | number } } | [experience: string | number | { public_id: string | number } ] | string | number | { public_id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/experiences/{experience}/highlights',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ExperienceHighlightController::store
 * @see app/Http/Controllers/Admin/ExperienceHighlightController.php:29
 * @route '/admin/experiences/{experience}/highlights'
 */
store.url = (args: { experience: string | number | { public_id: string | number } } | [experience: string | number | { public_id: string | number } ] | string | number | { public_id: string | number }, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{experience}', parsedArgs.experience.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExperienceHighlightController::store
 * @see app/Http/Controllers/Admin/ExperienceHighlightController.php:29
 * @route '/admin/experiences/{experience}/highlights'
 */
store.post = (args: { experience: string | number | { public_id: string | number } } | [experience: string | number | { public_id: string | number } ] | string | number | { public_id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\ExperienceHighlightController::store
 * @see app/Http/Controllers/Admin/ExperienceHighlightController.php:29
 * @route '/admin/experiences/{experience}/highlights'
 */
    const storeForm = (args: { experience: string | number | { public_id: string | number } } | [experience: string | number | { public_id: string | number } ] | string | number | { public_id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ExperienceHighlightController::store
 * @see app/Http/Controllers/Admin/ExperienceHighlightController.php:29
 * @route '/admin/experiences/{experience}/highlights'
 */
        storeForm.post = (args: { experience: string | number | { public_id: string | number } } | [experience: string | number | { public_id: string | number } ] | string | number | { public_id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\ExperienceHighlightController::update
 * @see app/Http/Controllers/Admin/ExperienceHighlightController.php:38
 * @route '/admin/experiences/{experience}/highlights/{highlight}'
 */
export const update = (args: { experience: string | number | { public_id: string | number }, highlight: string | number | { public_id: string | number } } | [experience: string | number | { public_id: string | number }, highlight: string | number | { public_id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/experiences/{experience}/highlights/{highlight}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\ExperienceHighlightController::update
 * @see app/Http/Controllers/Admin/ExperienceHighlightController.php:38
 * @route '/admin/experiences/{experience}/highlights/{highlight}'
 */
update.url = (args: { experience: string | number | { public_id: string | number }, highlight: string | number | { public_id: string | number } } | [experience: string | number | { public_id: string | number }, highlight: string | number | { public_id: string | number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    experience: args[0],
                    highlight: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        experience: typeof args.experience === 'object'
                ? args.experience.public_id
                : args.experience,
                                highlight: typeof args.highlight === 'object'
                ? args.highlight.public_id
                : args.highlight,
                }

    return update.definition.url
            .replace('{experience}', parsedArgs.experience.toString())
            .replace('{highlight}', parsedArgs.highlight.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExperienceHighlightController::update
 * @see app/Http/Controllers/Admin/ExperienceHighlightController.php:38
 * @route '/admin/experiences/{experience}/highlights/{highlight}'
 */
update.put = (args: { experience: string | number | { public_id: string | number }, highlight: string | number | { public_id: string | number } } | [experience: string | number | { public_id: string | number }, highlight: string | number | { public_id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\ExperienceHighlightController::update
 * @see app/Http/Controllers/Admin/ExperienceHighlightController.php:38
 * @route '/admin/experiences/{experience}/highlights/{highlight}'
 */
update.patch = (args: { experience: string | number | { public_id: string | number }, highlight: string | number | { public_id: string | number } } | [experience: string | number | { public_id: string | number }, highlight: string | number | { public_id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\ExperienceHighlightController::update
 * @see app/Http/Controllers/Admin/ExperienceHighlightController.php:38
 * @route '/admin/experiences/{experience}/highlights/{highlight}'
 */
    const updateForm = (args: { experience: string | number | { public_id: string | number }, highlight: string | number | { public_id: string | number } } | [experience: string | number | { public_id: string | number }, highlight: string | number | { public_id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ExperienceHighlightController::update
 * @see app/Http/Controllers/Admin/ExperienceHighlightController.php:38
 * @route '/admin/experiences/{experience}/highlights/{highlight}'
 */
        updateForm.put = (args: { experience: string | number | { public_id: string | number }, highlight: string | number | { public_id: string | number } } | [experience: string | number | { public_id: string | number }, highlight: string | number | { public_id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\ExperienceHighlightController::update
 * @see app/Http/Controllers/Admin/ExperienceHighlightController.php:38
 * @route '/admin/experiences/{experience}/highlights/{highlight}'
 */
        updateForm.patch = (args: { experience: string | number | { public_id: string | number }, highlight: string | number | { public_id: string | number } } | [experience: string | number | { public_id: string | number }, highlight: string | number | { public_id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\ExperienceHighlightController::destroy
 * @see app/Http/Controllers/Admin/ExperienceHighlightController.php:49
 * @route '/admin/experiences/{experience}/highlights/{highlight}'
 */
export const destroy = (args: { experience: string | number | { public_id: string | number }, highlight: string | number | { public_id: string | number } } | [experience: string | number | { public_id: string | number }, highlight: string | number | { public_id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/experiences/{experience}/highlights/{highlight}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ExperienceHighlightController::destroy
 * @see app/Http/Controllers/Admin/ExperienceHighlightController.php:49
 * @route '/admin/experiences/{experience}/highlights/{highlight}'
 */
destroy.url = (args: { experience: string | number | { public_id: string | number }, highlight: string | number | { public_id: string | number } } | [experience: string | number | { public_id: string | number }, highlight: string | number | { public_id: string | number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    experience: args[0],
                    highlight: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        experience: typeof args.experience === 'object'
                ? args.experience.public_id
                : args.experience,
                                highlight: typeof args.highlight === 'object'
                ? args.highlight.public_id
                : args.highlight,
                }

    return destroy.definition.url
            .replace('{experience}', parsedArgs.experience.toString())
            .replace('{highlight}', parsedArgs.highlight.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExperienceHighlightController::destroy
 * @see app/Http/Controllers/Admin/ExperienceHighlightController.php:49
 * @route '/admin/experiences/{experience}/highlights/{highlight}'
 */
destroy.delete = (args: { experience: string | number | { public_id: string | number }, highlight: string | number | { public_id: string | number } } | [experience: string | number | { public_id: string | number }, highlight: string | number | { public_id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\ExperienceHighlightController::destroy
 * @see app/Http/Controllers/Admin/ExperienceHighlightController.php:49
 * @route '/admin/experiences/{experience}/highlights/{highlight}'
 */
    const destroyForm = (args: { experience: string | number | { public_id: string | number }, highlight: string | number | { public_id: string | number } } | [experience: string | number | { public_id: string | number }, highlight: string | number | { public_id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ExperienceHighlightController::destroy
 * @see app/Http/Controllers/Admin/ExperienceHighlightController.php:49
 * @route '/admin/experiences/{experience}/highlights/{highlight}'
 */
        destroyForm.delete = (args: { experience: string | number | { public_id: string | number }, highlight: string | number | { public_id: string | number } } | [experience: string | number | { public_id: string | number }, highlight: string | number | { public_id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const highlights = {
    store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default highlights