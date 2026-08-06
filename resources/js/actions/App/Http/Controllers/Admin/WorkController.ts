import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\WorkController::index
 * @see app/Http/Controllers/Admin/WorkController.php:29
 * @route '/admin/works'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/works',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\WorkController::index
 * @see app/Http/Controllers/Admin/WorkController.php:29
 * @route '/admin/works'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\WorkController::index
 * @see app/Http/Controllers/Admin/WorkController.php:29
 * @route '/admin/works'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\WorkController::index
 * @see app/Http/Controllers/Admin/WorkController.php:29
 * @route '/admin/works'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\WorkController::index
 * @see app/Http/Controllers/Admin/WorkController.php:29
 * @route '/admin/works'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\WorkController::index
 * @see app/Http/Controllers/Admin/WorkController.php:29
 * @route '/admin/works'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\WorkController::index
 * @see app/Http/Controllers/Admin/WorkController.php:29
 * @route '/admin/works'
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
* @see \App\Http\Controllers\Admin\WorkController::store
 * @see app/Http/Controllers/Admin/WorkController.php:36
 * @route '/admin/works'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/works',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\WorkController::store
 * @see app/Http/Controllers/Admin/WorkController.php:36
 * @route '/admin/works'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\WorkController::store
 * @see app/Http/Controllers/Admin/WorkController.php:36
 * @route '/admin/works'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\WorkController::store
 * @see app/Http/Controllers/Admin/WorkController.php:36
 * @route '/admin/works'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\WorkController::store
 * @see app/Http/Controllers/Admin/WorkController.php:36
 * @route '/admin/works'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\WorkController::update
 * @see app/Http/Controllers/Admin/WorkController.php:43
 * @route '/admin/works/{work}'
 */
export const update = (args: { work: string | number | { public_id: string | number } } | [work: string | number | { public_id: string | number } ] | string | number | { public_id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/works/{work}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\WorkController::update
 * @see app/Http/Controllers/Admin/WorkController.php:43
 * @route '/admin/works/{work}'
 */
update.url = (args: { work: string | number | { public_id: string | number } } | [work: string | number | { public_id: string | number } ] | string | number | { public_id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { work: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'public_id' in args) {
            args = { work: args.public_id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    work: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        work: typeof args.work === 'object'
                ? args.work.public_id
                : args.work,
                }

    return update.definition.url
            .replace('{work}', parsedArgs.work.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\WorkController::update
 * @see app/Http/Controllers/Admin/WorkController.php:43
 * @route '/admin/works/{work}'
 */
update.put = (args: { work: string | number | { public_id: string | number } } | [work: string | number | { public_id: string | number } ] | string | number | { public_id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\WorkController::update
 * @see app/Http/Controllers/Admin/WorkController.php:43
 * @route '/admin/works/{work}'
 */
update.patch = (args: { work: string | number | { public_id: string | number } } | [work: string | number | { public_id: string | number } ] | string | number | { public_id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\WorkController::update
 * @see app/Http/Controllers/Admin/WorkController.php:43
 * @route '/admin/works/{work}'
 */
    const updateForm = (args: { work: string | number | { public_id: string | number } } | [work: string | number | { public_id: string | number } ] | string | number | { public_id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\WorkController::update
 * @see app/Http/Controllers/Admin/WorkController.php:43
 * @route '/admin/works/{work}'
 */
        updateForm.put = (args: { work: string | number | { public_id: string | number } } | [work: string | number | { public_id: string | number } ] | string | number | { public_id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\WorkController::update
 * @see app/Http/Controllers/Admin/WorkController.php:43
 * @route '/admin/works/{work}'
 */
        updateForm.patch = (args: { work: string | number | { public_id: string | number } } | [work: string | number | { public_id: string | number } ] | string | number | { public_id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\WorkController::destroy
 * @see app/Http/Controllers/Admin/WorkController.php:50
 * @route '/admin/works/{work}'
 */
export const destroy = (args: { work: string | number | { public_id: string | number } } | [work: string | number | { public_id: string | number } ] | string | number | { public_id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/works/{work}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\WorkController::destroy
 * @see app/Http/Controllers/Admin/WorkController.php:50
 * @route '/admin/works/{work}'
 */
destroy.url = (args: { work: string | number | { public_id: string | number } } | [work: string | number | { public_id: string | number } ] | string | number | { public_id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { work: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'public_id' in args) {
            args = { work: args.public_id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    work: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        work: typeof args.work === 'object'
                ? args.work.public_id
                : args.work,
                }

    return destroy.definition.url
            .replace('{work}', parsedArgs.work.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\WorkController::destroy
 * @see app/Http/Controllers/Admin/WorkController.php:50
 * @route '/admin/works/{work}'
 */
destroy.delete = (args: { work: string | number | { public_id: string | number } } | [work: string | number | { public_id: string | number } ] | string | number | { public_id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\WorkController::destroy
 * @see app/Http/Controllers/Admin/WorkController.php:50
 * @route '/admin/works/{work}'
 */
    const destroyForm = (args: { work: string | number | { public_id: string | number } } | [work: string | number | { public_id: string | number } ] | string | number | { public_id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\WorkController::destroy
 * @see app/Http/Controllers/Admin/WorkController.php:50
 * @route '/admin/works/{work}'
 */
        destroyForm.delete = (args: { work: string | number | { public_id: string | number } } | [work: string | number | { public_id: string | number } ] | string | number | { public_id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const WorkController = { index, store, update, destroy }

export default WorkController