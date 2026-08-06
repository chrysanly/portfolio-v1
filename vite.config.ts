import inertia from '@inertiajs/vite';
import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { bunny } from 'laravel-vite-plugin/fonts';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    /*
     * Wayfinder shells out to `php artisan wayfinder:generate`, so the build
     * inherits whatever `php` is first on PATH — which on Windows is often an
     * old system-wide install. Point PHP_EXECUTABLE in .env at the PHP 8.3+
     * binary this project needs and the build stops depending on PATH order.
     *
     * Vite only exposes VITE_-prefixed values, so .env is read explicitly here.
     */
    const env = loadEnv(mode, process.cwd(), '');
    const php = env.PHP_EXECUTABLE || 'php';

    /*
     * Wayfinder needs a working PHP binary and an installed vendor/ to shell out
     * to `artisan wayfinder:generate`. Vercel runs the build in its generic
     * container, where neither is guaranteed, so the plugin is skipped there and
     * the committed output under resources/js/{actions,routes,wayfinder} is used
     * instead. Set SKIP_WAYFINDER=1 to do the same in any other PHP-less CI.
     */
    const skipWayfinder =
        process.env.SKIP_WAYFINDER === '1' || process.env.VERCEL === '1';

    return {
        plugins: [
            laravel({
                input: ['resources/css/app.css', 'resources/js/app.tsx'],
                refresh: true,
                fonts: [
                    bunny('Instrument Sans', {
                        weights: [400, 500, 600],
                    }),
                    // The portfolio's display + mono pair, self-hosted (DESIGN §8).
                    bunny('Space Grotesk', {
                        weights: [400, 500, 600, 700],
                    }),
                    bunny('IBM Plex Mono', {
                        weights: [400, 500, 600],
                    }),
                ],
            }),
            inertia(),
            react({
                babel: {
                    plugins: ['babel-plugin-react-compiler'],
                },
            }),
            tailwindcss(),
            ...(skipWayfinder
                ? []
                : [
                      wayfinder({
                          formVariants: true,
                          command: `"${php}" artisan wayfinder:generate`,
                      }),
                  ]),
        ],
    };
});
