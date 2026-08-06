import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import loginDf2c2a from './login'
import settings from './settings'
import sections from './sections'
import stats from './stats'
import profileFacts from './profile-facts'
import capabilityGroups from './capability-groups'
import experiences from './experiences'
import works from './works'
import contactTiles from './contact-tiles'
/**
* @see \App\Http\Controllers\Admin\PinSessionController::login
 * @see app/Http/Controllers/Admin/PinSessionController.php:19
 * @route '/admin/login'
 */
export const login = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})

login.definition = {
    methods: ["get","head"],
    url: '/admin/login',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PinSessionController::login
 * @see app/Http/Controllers/Admin/PinSessionController.php:19
 * @route '/admin/login'
 */
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PinSessionController::login
 * @see app/Http/Controllers/Admin/PinSessionController.php:19
 * @route '/admin/login'
 */
login.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\PinSessionController::login
 * @see app/Http/Controllers/Admin/PinSessionController.php:19
 * @route '/admin/login'
 */
login.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: login.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\PinSessionController::login
 * @see app/Http/Controllers/Admin/PinSessionController.php:19
 * @route '/admin/login'
 */
    const loginForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: login.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\PinSessionController::login
 * @see app/Http/Controllers/Admin/PinSessionController.php:19
 * @route '/admin/login'
 */
        loginForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: login.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\PinSessionController::login
 * @see app/Http/Controllers/Admin/PinSessionController.php:19
 * @route '/admin/login'
 */
        loginForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: login.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    login.form = loginForm
/**
* @see \App\Http\Controllers\Admin\PinSessionController::logout
 * @see app/Http/Controllers/Admin/PinSessionController.php:39
 * @route '/admin/logout'
 */
export const logout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

logout.definition = {
    methods: ["post"],
    url: '/admin/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\PinSessionController::logout
 * @see app/Http/Controllers/Admin/PinSessionController.php:39
 * @route '/admin/logout'
 */
logout.url = (options?: RouteQueryOptions) => {
    return logout.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PinSessionController::logout
 * @see app/Http/Controllers/Admin/PinSessionController.php:39
 * @route '/admin/logout'
 */
logout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\PinSessionController::logout
 * @see app/Http/Controllers/Admin/PinSessionController.php:39
 * @route '/admin/logout'
 */
    const logoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: logout.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\PinSessionController::logout
 * @see app/Http/Controllers/Admin/PinSessionController.php:39
 * @route '/admin/logout'
 */
        logoutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: logout.url(options),
            method: 'post',
        })
    
    logout.form = logoutForm
/**
* @see \App\Http\Controllers\Admin\DashboardController::__invoke
 * @see app/Http/Controllers/Admin/DashboardController.php:17
 * @route '/admin'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/admin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::__invoke
 * @see app/Http/Controllers/Admin/DashboardController.php:17
 * @route '/admin'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::__invoke
 * @see app/Http/Controllers/Admin/DashboardController.php:17
 * @route '/admin'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::__invoke
 * @see app/Http/Controllers/Admin/DashboardController.php:17
 * @route '/admin'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::__invoke
 * @see app/Http/Controllers/Admin/DashboardController.php:17
 * @route '/admin'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::__invoke
 * @see app/Http/Controllers/Admin/DashboardController.php:17
 * @route '/admin'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::__invoke
 * @see app/Http/Controllers/Admin/DashboardController.php:17
 * @route '/admin'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
const admin = {
    login: Object.assign(login, loginDf2c2a),
logout: Object.assign(logout, logout),
dashboard: Object.assign(dashboard, dashboard),
settings: Object.assign(settings, settings),
sections: Object.assign(sections, sections),
stats: Object.assign(stats, stats),
profileFacts: Object.assign(profileFacts, profileFacts),
capabilityGroups: Object.assign(capabilityGroups, capabilityGroups),
experiences: Object.assign(experiences, experiences),
works: Object.assign(works, works),
contactTiles: Object.assign(contactTiles, contactTiles),
}

export default admin