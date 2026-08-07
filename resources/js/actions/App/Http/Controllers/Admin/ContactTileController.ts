import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ContactTileController::index
 * @see app/Http/Controllers/Admin/ContactTileController.php:30
 * @route '/admin/contact-tiles'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/contact-tiles',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ContactTileController::index
 * @see app/Http/Controllers/Admin/ContactTileController.php:30
 * @route '/admin/contact-tiles'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ContactTileController::index
 * @see app/Http/Controllers/Admin/ContactTileController.php:30
 * @route '/admin/contact-tiles'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ContactTileController::index
 * @see app/Http/Controllers/Admin/ContactTileController.php:30
 * @route '/admin/contact-tiles'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ContactTileController::index
 * @see app/Http/Controllers/Admin/ContactTileController.php:30
 * @route '/admin/contact-tiles'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ContactTileController::index
 * @see app/Http/Controllers/Admin/ContactTileController.php:30
 * @route '/admin/contact-tiles'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ContactTileController::index
 * @see app/Http/Controllers/Admin/ContactTileController.php:30
 * @route '/admin/contact-tiles'
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
* @see \App\Http\Controllers\Admin\ContactTileController::store
 * @see app/Http/Controllers/Admin/ContactTileController.php:38
 * @route '/admin/contact-tiles'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/contact-tiles',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ContactTileController::store
 * @see app/Http/Controllers/Admin/ContactTileController.php:38
 * @route '/admin/contact-tiles'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ContactTileController::store
 * @see app/Http/Controllers/Admin/ContactTileController.php:38
 * @route '/admin/contact-tiles'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\ContactTileController::store
 * @see app/Http/Controllers/Admin/ContactTileController.php:38
 * @route '/admin/contact-tiles'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ContactTileController::store
 * @see app/Http/Controllers/Admin/ContactTileController.php:38
 * @route '/admin/contact-tiles'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\ContactTileController::update
 * @see app/Http/Controllers/Admin/ContactTileController.php:45
 * @route '/admin/contact-tiles/{contact_tile}'
 */
export const update = (args: { contact_tile: string | { public_id: string } } | [contact_tile: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/contact-tiles/{contact_tile}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\ContactTileController::update
 * @see app/Http/Controllers/Admin/ContactTileController.php:45
 * @route '/admin/contact-tiles/{contact_tile}'
 */
update.url = (args: { contact_tile: string | { public_id: string } } | [contact_tile: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { contact_tile: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'public_id' in args) {
            args = { contact_tile: args.public_id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    contact_tile: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        contact_tile: typeof args.contact_tile === 'object'
                ? args.contact_tile.public_id
                : args.contact_tile,
                }

    return update.definition.url
            .replace('{contact_tile}', parsedArgs.contact_tile.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ContactTileController::update
 * @see app/Http/Controllers/Admin/ContactTileController.php:45
 * @route '/admin/contact-tiles/{contact_tile}'
 */
update.put = (args: { contact_tile: string | { public_id: string } } | [contact_tile: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\ContactTileController::update
 * @see app/Http/Controllers/Admin/ContactTileController.php:45
 * @route '/admin/contact-tiles/{contact_tile}'
 */
update.patch = (args: { contact_tile: string | { public_id: string } } | [contact_tile: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\ContactTileController::update
 * @see app/Http/Controllers/Admin/ContactTileController.php:45
 * @route '/admin/contact-tiles/{contact_tile}'
 */
    const updateForm = (args: { contact_tile: string | { public_id: string } } | [contact_tile: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ContactTileController::update
 * @see app/Http/Controllers/Admin/ContactTileController.php:45
 * @route '/admin/contact-tiles/{contact_tile}'
 */
        updateForm.put = (args: { contact_tile: string | { public_id: string } } | [contact_tile: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\ContactTileController::update
 * @see app/Http/Controllers/Admin/ContactTileController.php:45
 * @route '/admin/contact-tiles/{contact_tile}'
 */
        updateForm.patch = (args: { contact_tile: string | { public_id: string } } | [contact_tile: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\ContactTileController::destroy
 * @see app/Http/Controllers/Admin/ContactTileController.php:52
 * @route '/admin/contact-tiles/{contact_tile}'
 */
export const destroy = (args: { contact_tile: string | { public_id: string } } | [contact_tile: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/contact-tiles/{contact_tile}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ContactTileController::destroy
 * @see app/Http/Controllers/Admin/ContactTileController.php:52
 * @route '/admin/contact-tiles/{contact_tile}'
 */
destroy.url = (args: { contact_tile: string | { public_id: string } } | [contact_tile: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { contact_tile: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'public_id' in args) {
            args = { contact_tile: args.public_id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    contact_tile: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        contact_tile: typeof args.contact_tile === 'object'
                ? args.contact_tile.public_id
                : args.contact_tile,
                }

    return destroy.definition.url
            .replace('{contact_tile}', parsedArgs.contact_tile.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ContactTileController::destroy
 * @see app/Http/Controllers/Admin/ContactTileController.php:52
 * @route '/admin/contact-tiles/{contact_tile}'
 */
destroy.delete = (args: { contact_tile: string | { public_id: string } } | [contact_tile: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\ContactTileController::destroy
 * @see app/Http/Controllers/Admin/ContactTileController.php:52
 * @route '/admin/contact-tiles/{contact_tile}'
 */
    const destroyForm = (args: { contact_tile: string | { public_id: string } } | [contact_tile: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ContactTileController::destroy
 * @see app/Http/Controllers/Admin/ContactTileController.php:52
 * @route '/admin/contact-tiles/{contact_tile}'
 */
        destroyForm.delete = (args: { contact_tile: string | { public_id: string } } | [contact_tile: string | { public_id: string } ] | string | { public_id: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const ContactTileController = { index, store, update, destroy }

export default ContactTileController