import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\StatController::index
 * @see app/Http/Controllers/Admin/StatController.php:29
 * @route '/admin/stats'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\StatController::index
 * @see app/Http/Controllers/Admin/StatController.php:29
 * @route '/admin/stats'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\StatController::index
 * @see app/Http/Controllers/Admin/StatController.php:29
 * @route '/admin/stats'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\StatController::index
 * @see app/Http/Controllers/Admin/StatController.php:29
 * @route '/admin/stats'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\StatController::index
 * @see app/Http/Controllers/Admin/StatController.php:29
 * @route '/admin/stats'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\StatController::index
 * @see app/Http/Controllers/Admin/StatController.php:29
 * @route '/admin/stats'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\StatController::index
 * @see app/Http/Controllers/Admin/StatController.php:29
 * @route '/admin/stats'
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
* @see \App\Http\Controllers\Admin\StatController::store
 * @see app/Http/Controllers/Admin/StatController.php:36
 * @route '/admin/stats'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/stats',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\StatController::store
 * @see app/Http/Controllers/Admin/StatController.php:36
 * @route '/admin/stats'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\StatController::store
 * @see app/Http/Controllers/Admin/StatController.php:36
 * @route '/admin/stats'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\StatController::store
 * @see app/Http/Controllers/Admin/StatController.php:36
 * @route '/admin/stats'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\StatController::store
 * @see app/Http/Controllers/Admin/StatController.php:36
 * @route '/admin/stats'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\StatController::update
 * @see app/Http/Controllers/Admin/StatController.php:43
 * @route '/admin/stats/{stat}'
 */
export const update = (args: { stat: string | { public_id: string } } | [stat: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/stats/{stat}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\StatController::update
 * @see app/Http/Controllers/Admin/StatController.php:43
 * @route '/admin/stats/{stat}'
 */
update.url = (args: { stat: string | { public_id: string } } | [stat: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { stat: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'public_id' in args) {
            args = { stat: args.public_id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    stat: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        stat: typeof args.stat === 'object'
                ? args.stat.public_id
                : args.stat,
                }

    return update.definition.url
            .replace('{stat}', parsedArgs.stat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\StatController::update
 * @see app/Http/Controllers/Admin/StatController.php:43
 * @route '/admin/stats/{stat}'
 */
update.put = (args: { stat: string | { public_id: string } } | [stat: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\StatController::update
 * @see app/Http/Controllers/Admin/StatController.php:43
 * @route '/admin/stats/{stat}'
 */
update.patch = (args: { stat: string | { public_id: string } } | [stat: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\StatController::update
 * @see app/Http/Controllers/Admin/StatController.php:43
 * @route '/admin/stats/{stat}'
 */
    const updateForm = (args: { stat: string | { public_id: string } } | [stat: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\StatController::update
 * @see app/Http/Controllers/Admin/StatController.php:43
 * @route '/admin/stats/{stat}'
 */
        updateForm.put = (args: { stat: string | { public_id: string } } | [stat: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\StatController::update
 * @see app/Http/Controllers/Admin/StatController.php:43
 * @route '/admin/stats/{stat}'
 */
        updateForm.patch = (args: { stat: string | { public_id: string } } | [stat: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\StatController::destroy
 * @see app/Http/Controllers/Admin/StatController.php:50
 * @route '/admin/stats/{stat}'
 */
export const destroy = (args: { stat: string | { public_id: string } } | [stat: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/stats/{stat}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\StatController::destroy
 * @see app/Http/Controllers/Admin/StatController.php:50
 * @route '/admin/stats/{stat}'
 */
destroy.url = (args: { stat: string | { public_id: string } } | [stat: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { stat: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'public_id' in args) {
            args = { stat: args.public_id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    stat: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        stat: typeof args.stat === 'object'
                ? args.stat.public_id
                : args.stat,
                }

    return destroy.definition.url
            .replace('{stat}', parsedArgs.stat.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\StatController::destroy
 * @see app/Http/Controllers/Admin/StatController.php:50
 * @route '/admin/stats/{stat}'
 */
destroy.delete = (args: { stat: string | { public_id: string } } | [stat: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\StatController::destroy
 * @see app/Http/Controllers/Admin/StatController.php:50
 * @route '/admin/stats/{stat}'
 */
    const destroyForm = (args: { stat: string | { public_id: string } } | [stat: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\StatController::destroy
 * @see app/Http/Controllers/Admin/StatController.php:50
 * @route '/admin/stats/{stat}'
 */
        destroyForm.delete = (args: { stat: string | { public_id: string } } | [stat: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const stats = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default stats