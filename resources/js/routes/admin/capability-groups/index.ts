import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import items from './items'
/**
* @see \App\Http\Controllers\Admin\CapabilityGroupController::index
 * @see app/Http/Controllers/Admin/CapabilityGroupController.php:30
 * @route '/admin/capability-groups'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/capability-groups',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CapabilityGroupController::index
 * @see app/Http/Controllers/Admin/CapabilityGroupController.php:30
 * @route '/admin/capability-groups'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CapabilityGroupController::index
 * @see app/Http/Controllers/Admin/CapabilityGroupController.php:30
 * @route '/admin/capability-groups'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\CapabilityGroupController::index
 * @see app/Http/Controllers/Admin/CapabilityGroupController.php:30
 * @route '/admin/capability-groups'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\CapabilityGroupController::index
 * @see app/Http/Controllers/Admin/CapabilityGroupController.php:30
 * @route '/admin/capability-groups'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\CapabilityGroupController::index
 * @see app/Http/Controllers/Admin/CapabilityGroupController.php:30
 * @route '/admin/capability-groups'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\CapabilityGroupController::index
 * @see app/Http/Controllers/Admin/CapabilityGroupController.php:30
 * @route '/admin/capability-groups'
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
* @see \App\Http\Controllers\Admin\CapabilityGroupController::store
 * @see app/Http/Controllers/Admin/CapabilityGroupController.php:43
 * @route '/admin/capability-groups'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/capability-groups',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\CapabilityGroupController::store
 * @see app/Http/Controllers/Admin/CapabilityGroupController.php:43
 * @route '/admin/capability-groups'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CapabilityGroupController::store
 * @see app/Http/Controllers/Admin/CapabilityGroupController.php:43
 * @route '/admin/capability-groups'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\CapabilityGroupController::store
 * @see app/Http/Controllers/Admin/CapabilityGroupController.php:43
 * @route '/admin/capability-groups'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\CapabilityGroupController::store
 * @see app/Http/Controllers/Admin/CapabilityGroupController.php:43
 * @route '/admin/capability-groups'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\CapabilityGroupController::update
 * @see app/Http/Controllers/Admin/CapabilityGroupController.php:50
 * @route '/admin/capability-groups/{capability_group}'
 */
export const update = (args: { capability_group: string | { public_id: string } } | [capability_group: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/capability-groups/{capability_group}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\CapabilityGroupController::update
 * @see app/Http/Controllers/Admin/CapabilityGroupController.php:50
 * @route '/admin/capability-groups/{capability_group}'
 */
update.url = (args: { capability_group: string | { public_id: string } } | [capability_group: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{capability_group}', parsedArgs.capability_group.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CapabilityGroupController::update
 * @see app/Http/Controllers/Admin/CapabilityGroupController.php:50
 * @route '/admin/capability-groups/{capability_group}'
 */
update.put = (args: { capability_group: string | { public_id: string } } | [capability_group: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\CapabilityGroupController::update
 * @see app/Http/Controllers/Admin/CapabilityGroupController.php:50
 * @route '/admin/capability-groups/{capability_group}'
 */
update.patch = (args: { capability_group: string | { public_id: string } } | [capability_group: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\CapabilityGroupController::update
 * @see app/Http/Controllers/Admin/CapabilityGroupController.php:50
 * @route '/admin/capability-groups/{capability_group}'
 */
    const updateForm = (args: { capability_group: string | { public_id: string } } | [capability_group: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\CapabilityGroupController::update
 * @see app/Http/Controllers/Admin/CapabilityGroupController.php:50
 * @route '/admin/capability-groups/{capability_group}'
 */
        updateForm.put = (args: { capability_group: string | { public_id: string } } | [capability_group: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\CapabilityGroupController::update
 * @see app/Http/Controllers/Admin/CapabilityGroupController.php:50
 * @route '/admin/capability-groups/{capability_group}'
 */
        updateForm.patch = (args: { capability_group: string | { public_id: string } } | [capability_group: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\CapabilityGroupController::destroy
 * @see app/Http/Controllers/Admin/CapabilityGroupController.php:57
 * @route '/admin/capability-groups/{capability_group}'
 */
export const destroy = (args: { capability_group: string | { public_id: string } } | [capability_group: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/capability-groups/{capability_group}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\CapabilityGroupController::destroy
 * @see app/Http/Controllers/Admin/CapabilityGroupController.php:57
 * @route '/admin/capability-groups/{capability_group}'
 */
destroy.url = (args: { capability_group: string | { public_id: string } } | [capability_group: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{capability_group}', parsedArgs.capability_group.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CapabilityGroupController::destroy
 * @see app/Http/Controllers/Admin/CapabilityGroupController.php:57
 * @route '/admin/capability-groups/{capability_group}'
 */
destroy.delete = (args: { capability_group: string | { public_id: string } } | [capability_group: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\CapabilityGroupController::destroy
 * @see app/Http/Controllers/Admin/CapabilityGroupController.php:57
 * @route '/admin/capability-groups/{capability_group}'
 */
    const destroyForm = (args: { capability_group: string | { public_id: string } } | [capability_group: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\CapabilityGroupController::destroy
 * @see app/Http/Controllers/Admin/CapabilityGroupController.php:57
 * @route '/admin/capability-groups/{capability_group}'
 */
        destroyForm.delete = (args: { capability_group: string | { public_id: string } } | [capability_group: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const capabilityGroups = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
items: Object.assign(items, items),
}

export default capabilityGroups