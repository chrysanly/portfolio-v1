import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\CapabilityItemController::store
 * @see app/Http/Controllers/Admin/CapabilityItemController.php:29
 * @route '/admin/capability-groups/{capability_group}/items'
 */
export const store = (args: { capability_group: string | { public_id: string } } | [capability_group: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/capability-groups/{capability_group}/items',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\CapabilityItemController::store
 * @see app/Http/Controllers/Admin/CapabilityItemController.php:29
 * @route '/admin/capability-groups/{capability_group}/items'
 */
store.url = (args: { capability_group: string | { public_id: string } } | [capability_group: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { capability_group: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'public_id' in args) {
            args = { capability_group: args.public_id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    capability_group: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        capability_group: typeof args.capability_group === 'object'
                ? args.capability_group.public_id
                : args.capability_group,
                }

    return store.definition.url
            .replace('{capability_group}', parsedArgs.capability_group.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CapabilityItemController::store
 * @see app/Http/Controllers/Admin/CapabilityItemController.php:29
 * @route '/admin/capability-groups/{capability_group}/items'
 */
store.post = (args: { capability_group: string | { public_id: string } } | [capability_group: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\CapabilityItemController::store
 * @see app/Http/Controllers/Admin/CapabilityItemController.php:29
 * @route '/admin/capability-groups/{capability_group}/items'
 */
    const storeForm = (args: { capability_group: string | { public_id: string } } | [capability_group: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\CapabilityItemController::store
 * @see app/Http/Controllers/Admin/CapabilityItemController.php:29
 * @route '/admin/capability-groups/{capability_group}/items'
 */
        storeForm.post = (args: { capability_group: string | { public_id: string } } | [capability_group: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\CapabilityItemController::update
 * @see app/Http/Controllers/Admin/CapabilityItemController.php:38
 * @route '/admin/capability-groups/{capability_group}/items/{item}'
 */
export const update = (args: { capability_group: string | { public_id: string }, item: string | { public_id: string } } | [capability_group: string | { public_id: string }, item: string | { public_id: string } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/capability-groups/{capability_group}/items/{item}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\CapabilityItemController::update
 * @see app/Http/Controllers/Admin/CapabilityItemController.php:38
 * @route '/admin/capability-groups/{capability_group}/items/{item}'
 */
update.url = (args: { capability_group: string | { public_id: string }, item: string | { public_id: string } } | [capability_group: string | { public_id: string }, item: string | { public_id: string } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    capability_group: args[0],
                    item: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        capability_group: typeof args.capability_group === 'object'
                ? args.capability_group.public_id
                : args.capability_group,
                                item: typeof args.item === 'object'
                ? args.item.public_id
                : args.item,
                }

    return update.definition.url
            .replace('{capability_group}', parsedArgs.capability_group.toString())
            .replace('{item}', parsedArgs.item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CapabilityItemController::update
 * @see app/Http/Controllers/Admin/CapabilityItemController.php:38
 * @route '/admin/capability-groups/{capability_group}/items/{item}'
 */
update.put = (args: { capability_group: string | { public_id: string }, item: string | { public_id: string } } | [capability_group: string | { public_id: string }, item: string | { public_id: string } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\CapabilityItemController::update
 * @see app/Http/Controllers/Admin/CapabilityItemController.php:38
 * @route '/admin/capability-groups/{capability_group}/items/{item}'
 */
update.patch = (args: { capability_group: string | { public_id: string }, item: string | { public_id: string } } | [capability_group: string | { public_id: string }, item: string | { public_id: string } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\CapabilityItemController::update
 * @see app/Http/Controllers/Admin/CapabilityItemController.php:38
 * @route '/admin/capability-groups/{capability_group}/items/{item}'
 */
    const updateForm = (args: { capability_group: string | { public_id: string }, item: string | { public_id: string } } | [capability_group: string | { public_id: string }, item: string | { public_id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\CapabilityItemController::update
 * @see app/Http/Controllers/Admin/CapabilityItemController.php:38
 * @route '/admin/capability-groups/{capability_group}/items/{item}'
 */
        updateForm.put = (args: { capability_group: string | { public_id: string }, item: string | { public_id: string } } | [capability_group: string | { public_id: string }, item: string | { public_id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\CapabilityItemController::update
 * @see app/Http/Controllers/Admin/CapabilityItemController.php:38
 * @route '/admin/capability-groups/{capability_group}/items/{item}'
 */
        updateForm.patch = (args: { capability_group: string | { public_id: string }, item: string | { public_id: string } } | [capability_group: string | { public_id: string }, item: string | { public_id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\CapabilityItemController::destroy
 * @see app/Http/Controllers/Admin/CapabilityItemController.php:49
 * @route '/admin/capability-groups/{capability_group}/items/{item}'
 */
export const destroy = (args: { capability_group: string | { public_id: string }, item: string | { public_id: string } } | [capability_group: string | { public_id: string }, item: string | { public_id: string } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/capability-groups/{capability_group}/items/{item}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\CapabilityItemController::destroy
 * @see app/Http/Controllers/Admin/CapabilityItemController.php:49
 * @route '/admin/capability-groups/{capability_group}/items/{item}'
 */
destroy.url = (args: { capability_group: string | { public_id: string }, item: string | { public_id: string } } | [capability_group: string | { public_id: string }, item: string | { public_id: string } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    capability_group: args[0],
                    item: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        capability_group: typeof args.capability_group === 'object'
                ? args.capability_group.public_id
                : args.capability_group,
                                item: typeof args.item === 'object'
                ? args.item.public_id
                : args.item,
                }

    return destroy.definition.url
            .replace('{capability_group}', parsedArgs.capability_group.toString())
            .replace('{item}', parsedArgs.item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CapabilityItemController::destroy
 * @see app/Http/Controllers/Admin/CapabilityItemController.php:49
 * @route '/admin/capability-groups/{capability_group}/items/{item}'
 */
destroy.delete = (args: { capability_group: string | { public_id: string }, item: string | { public_id: string } } | [capability_group: string | { public_id: string }, item: string | { public_id: string } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\CapabilityItemController::destroy
 * @see app/Http/Controllers/Admin/CapabilityItemController.php:49
 * @route '/admin/capability-groups/{capability_group}/items/{item}'
 */
    const destroyForm = (args: { capability_group: string | { public_id: string }, item: string | { public_id: string } } | [capability_group: string | { public_id: string }, item: string | { public_id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\CapabilityItemController::destroy
 * @see app/Http/Controllers/Admin/CapabilityItemController.php:49
 * @route '/admin/capability-groups/{capability_group}/items/{item}'
 */
        destroyForm.delete = (args: { capability_group: string | { public_id: string }, item: string | { public_id: string } } | [capability_group: string | { public_id: string }, item: string | { public_id: string } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const CapabilityItemController = { store, update, destroy }

export default CapabilityItemController