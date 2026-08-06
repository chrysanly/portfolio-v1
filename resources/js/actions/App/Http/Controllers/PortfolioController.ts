import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PortfolioController::__invoke
 * @see app/Http/Controllers/PortfolioController.php:19
 * @route '/'
 */
const PortfolioController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: PortfolioController.url(options),
    method: 'get',
})

PortfolioController.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PortfolioController::__invoke
 * @see app/Http/Controllers/PortfolioController.php:19
 * @route '/'
 */
PortfolioController.url = (options?: RouteQueryOptions) => {
    return PortfolioController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PortfolioController::__invoke
 * @see app/Http/Controllers/PortfolioController.php:19
 * @route '/'
 */
PortfolioController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: PortfolioController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PortfolioController::__invoke
 * @see app/Http/Controllers/PortfolioController.php:19
 * @route '/'
 */
PortfolioController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: PortfolioController.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PortfolioController::__invoke
 * @see app/Http/Controllers/PortfolioController.php:19
 * @route '/'
 */
    const PortfolioControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: PortfolioController.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PortfolioController::__invoke
 * @see app/Http/Controllers/PortfolioController.php:19
 * @route '/'
 */
        PortfolioControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: PortfolioController.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PortfolioController::__invoke
 * @see app/Http/Controllers/PortfolioController.php:19
 * @route '/'
 */
        PortfolioControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: PortfolioController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    PortfolioController.form = PortfolioControllerForm
export default PortfolioController