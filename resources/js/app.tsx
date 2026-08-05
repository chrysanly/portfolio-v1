import { createInertiaApp } from '@inertiajs/react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'CJ Roma';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),

    /*
     * Every page in this app brings its own chrome: the portfolio renders the
     * mockup's own shell, and the content admin renders PortfolioAdminLayout.
     * The starter kit's AppLayout / AuthLayout / SettingsLayout are gone along
     * with the routes they depended on, so there is no layout to resolve here.
     */
    layout: () => null,

    strictMode: true,
    withApp(app) {
        return (
            <TooltipProvider delayDuration={0}>
                {app}
                <Toaster />
            </TooltipProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// Applies the visitor's stored light / dark preference to the admin chrome.
initializeTheme();
