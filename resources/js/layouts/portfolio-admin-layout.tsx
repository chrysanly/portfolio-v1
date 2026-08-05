import type { ReactNode } from 'react';
import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AdminSidebar } from '@/components/portfolio-admin/admin-sidebar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useFlashToast } from '@/hooks/use-flash-toast';

type Props = {
    title: string;
    description?: string;
    children: ReactNode;
};

/**
 * Chrome for the content admin.
 *
 * Uses the project's sidebar primitives but its own AdminSidebar: this area is
 * authenticated by a PIN session rather than a user record, so the app sidebar's
 * user menu has nothing to render.
 */
export default function PortfolioAdminLayout({
    title,
    description,
    children,
}: Props) {
    useFlashToast();

    return (
        <AppShell variant="sidebar">
            <AdminSidebar />

            <AppContent variant="sidebar" className="overflow-x-hidden">
                <header className="flex h-16 shrink-0 items-center gap-2 border-b border-sidebar-border/50 px-6 md:px-4">
                    <SidebarTrigger className="-ms-1" />
                    <div>
                        <h1 className="text-base font-semibold">{title}</h1>
                    </div>
                </header>

                <div className="mx-auto w-full max-w-5xl space-y-8 px-6 py-8">
                    {description ? (
                        <p className="max-w-3xl text-sm text-muted-foreground">
                            {description}
                        </p>
                    ) : null}

                    {children}
                </div>
            </AppContent>
        </AppShell>
    );
}
