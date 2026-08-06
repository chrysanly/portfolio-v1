import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ProfileFactController::index
 * @see app/Http/Controllers/Admin/ProfileFactController.php:29
 * @route '/admin/profile-facts'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/profile-facts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ProfileFactController::index
 * @see app/Http/Controllers/Admin/ProfileFactController.php:29
 * @route '/admin/profile-facts'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProfileFactController::index
 * @see app/Http/Controllers/Admin/ProfileFactController.php:29
 * @route '/admin/profile-facts'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ProfileFactController::index
 * @see app/Http/Controllers/Admin/ProfileFactController.php:29
 * @route '/admin/profile-facts'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ProfileFactController::index
 * @see app/Http/Controllers/Admin/ProfileFactController.php:29
 * @route '/admin/profile-facts'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ProfileFactController::index
 * @see app/Http/Controllers/Admin/ProfileFactController.php:29
 * @route '/admin/profile-facts'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ProfileFactController::index
 * @see app/Http/Controllers/Admin/ProfileFactController.php:29
 * @route '/admin/profile-facts'
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
* @see \App\Http\Controllers\Admin\ProfileFactController::store
 * @see app/Http/Controllers/Admin/ProfileFactController.php:36
 * @route '/admin/profile-facts'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/profile-facts',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ProfileFactController::store
 * @see app/Http/Controllers/Admin/ProfileFactController.php:36
 * @route '/admin/profile-facts'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProfileFactController::store
 * @see app/Http/Controllers/Admin/ProfileFactController.php:36
 * @route '/admin/profile-facts'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\ProfileFactController::store
 * @see app/Http/Controllers/Admin/ProfileFactController.php:36
 * @route '/admin/profile-facts'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ProfileFactController::store
 * @see app/Http/Controllers/Admin/ProfileFactController.php:36
 * @route '/admin/profile-facts'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\ProfileFactController::update
 * @see app/Http/Controllers/Admin/ProfileFactController.php:43
 * @route '/admin/profile-facts/{profile_fact}'
 */
export const update = (args: { profile_fact: string | { public_id: string } } | [profile_fact: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/profile-facts/{profile_fact}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\ProfileFactController::update
 * @see app/Http/Controllers/Admin/ProfileFactController.php:43
 * @route '/admin/profile-facts/{profile_fact}'
 */
update.url = (args: { profile_fact: string | { public_id: string } } | [profile_fact: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { profile_fact: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'public_id' in args) {
            args = { profile_fact: args.public_id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    profile_fact: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        profile_fact: typeof args.profile_fact === 'object'
                ? args.profile_fact.public_id
                : args.profile_fact,
                }

    return update.definition.url
            .replace('{profile_fact}', parsedArgs.profile_fact.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProfileFactController::update
 * @see app/Http/Controllers/Admin/ProfileFactController.php:43
 * @route '/admin/profile-facts/{profile_fact}'
 */
update.put = (args: { profile_fact: string | { public_id: string } } | [profile_fact: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\ProfileFactController::update
 * @see app/Http/Controllers/Admin/ProfileFactController.php:43
 * @route '/admin/profile-facts/{profile_fact}'
 */
update.patch = (args: { profile_fact: string | { public_id: string } } | [profile_fact: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\ProfileFactController::update
 * @see app/Http/Controllers/Admin/ProfileFactController.php:43
 * @route '/admin/profile-facts/{profile_fact}'
 */
    const updateForm = (args: { profile_fact: string | { public_id: string } } | [profile_fact: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ProfileFactController::update
 * @see app/Http/Controllers/Admin/ProfileFactController.php:43
 * @route '/admin/profile-facts/{profile_fact}'
 */
        updateForm.put = (args: { profile_fact: string | { public_id: string } } | [profile_fact: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\ProfileFactController::update
 * @see app/Http/Controllers/Admin/ProfileFactController.php:43
 * @route '/admin/profile-facts/{profile_fact}'
 */
        updateForm.patch = (args: { profile_fact: string | { public_id: string } } | [profile_fact: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\ProfileFactController::destroy
 * @see app/Http/Controllers/Admin/ProfileFactController.php:50
 * @route '/admin/profile-facts/{profile_fact}'
 */
export const destroy = (args: { profile_fact: string | { public_id: string } } | [profile_fact: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/profile-facts/{profile_fact}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ProfileFactController::destroy
 * @see app/Http/Controllers/Admin/ProfileFactController.php:50
 * @route '/admin/profile-facts/{profile_fact}'
 */
destroy.url = (args: { profile_fact: string | { public_id: string } } | [profile_fact: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { profile_fact: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'public_id' in args) {
            args = { profile_fact: args.public_id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    profile_fact: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        profile_fact: typeof args.profile_fact === 'object'
                ? args.profile_fact.public_id
                : args.profile_fact,
                }

    return destroy.definition.url
            .replace('{profile_fact}', parsedArgs.profile_fact.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProfileFactController::destroy
 * @see app/Http/Controllers/Admin/ProfileFactController.php:50
 * @route '/admin/profile-facts/{profile_fact}'
 */
destroy.delete = (args: { profile_fact: string | { public_id: string } } | [profile_fact: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\ProfileFactController::destroy
 * @see app/Http/Controllers/Admin/ProfileFactController.php:50
 * @route '/admin/profile-facts/{profile_fact}'
 */
    const destroyForm = (args: { profile_fact: string | { public_id: string } } | [profile_fact: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ProfileFactController::destroy
 * @see app/Http/Controllers/Admin/ProfileFactController.php:50
 * @route '/admin/profile-facts/{profile_fact}'
 */
        destroyForm.delete = (args: { profile_fact: string | { public_id: string } } | [profile_fact: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const ProfileFactController = { index, store, update, destroy }

export default ProfileFactController