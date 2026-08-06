import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\PageSectionController::index
 * @see app/Http/Controllers/Admin/PageSectionController.php:23
 * @route '/admin/sections'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/sections',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PageSectionController::index
 * @see app/Http/Controllers/Admin/PageSectionController.php:23
 * @route '/admin/sections'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PageSectionController::index
 * @see app/Http/Controllers/Admin/PageSectionController.php:23
 * @route '/admin/sections'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\PageSectionController::index
 * @see app/Http/Controllers/Admin/PageSectionController.php:23
 * @route '/admin/sections'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\PageSectionController::index
 * @see app/Http/Controllers/Admin/PageSectionController.php:23
 * @route '/admin/sections'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\PageSectionController::index
 * @see app/Http/Controllers/Admin/PageSectionController.php:23
 * @route '/admin/sections'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\PageSectionController::index
 * @see app/Http/Controllers/Admin/PageSectionController.php:23
 * @route '/admin/sections'
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
* @see \App\Http\Controllers\Admin\PageSectionController::update
 * @see app/Http/Controllers/Admin/PageSectionController.php:30
 * @route '/admin/sections/{page_section}'
 */
export const update = (args: { page_section: string | number | { public_id: string | number } } | [page_section: string | number | { public_id: string | number } ] | string | number | { public_id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/sections/{page_section}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\PageSectionController::update
 * @see app/Http/Controllers/Admin/PageSectionController.php:30
 * @route '/admin/sections/{page_section}'
 */
update.url = (args: { page_section: string | number | { public_id: string | number } } | [page_section: string | number | { public_id: string | number } ] | string | number | { public_id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { page_section: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'public_id' in args) {
            args = { page_section: args.public_id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    page_section: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        page_section: typeof args.page_section === 'object'
                ? args.page_section.public_id
                : args.page_section,
                }

    return update.definition.url
            .replace('{page_section}', parsedArgs.page_section.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PageSectionController::update
 * @see app/Http/Controllers/Admin/PageSectionController.php:30
 * @route '/admin/sections/{page_section}'
 */
update.put = (args: { page_section: string | number | { public_id: string | number } } | [page_section: string | number | { public_id: string | number } ] | string | number | { public_id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\PageSectionController::update
 * @see app/Http/Controllers/Admin/PageSectionController.php:30
 * @route '/admin/sections/{page_section}'
 */
    const updateForm = (args: { page_section: string | number | { public_id: string | number } } | [page_section: string | number | { public_id: string | number } ] | string | number | { public_id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\PageSectionController::update
 * @see app/Http/Controllers/Admin/PageSectionController.php:30
 * @route '/admin/sections/{page_section}'
 */
        updateForm.put = (args: { page_section: string | number | { public_id: string | number } } | [page_section: string | number | { public_id: string | number } ] | string | number | { public_id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const sections = {
    index: Object.assign(index, index),
update: Object.assign(update, update),
}

export default sections