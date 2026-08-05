import { Link, useForm, usePage } from '@inertiajs/react';
import {
    Boxes,
    Briefcase,
    ExternalLink,
    Gauge,
    IdCard,
    LayoutGrid,
    ListOrdered,
    Lock,
    Mail,
    Settings,
    SquareStack,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { adminRoutes } from '@/lib/admin-routes';

type AdminNavItem = {
    title: string;
    href: string;
    icon: LucideIcon;
    /** Match this URL exactly rather than by prefix. */
    exact?: boolean;
};

type AdminNavGroup = {
    label: string;
    items: readonly AdminNavItem[];
};

/**
 * The admin navigation, in one place. Grouped so the page-wide screens read
 * separately from the repeating content collections.
 */
const GROUPS: readonly AdminNavGroup[] = [
    {
        label: 'Page',
        items: [
            {
                title: 'Overview',
                href: adminRoutes.dashboard,
                icon: LayoutGrid,
                exact: true,
            },
            { title: 'Site settings', href: adminRoutes.settings, icon: Settings },
            { title: 'Sections', href: adminRoutes.sections, icon: ListOrdered },
        ],
    },
    {
        label: 'Content',
        items: [
            { title: 'Headline figures', href: adminRoutes.stats, icon: Gauge },
            { title: 'Profile rows', href: adminRoutes.profileFacts, icon: IdCard },
            {
                title: 'Capabilities',
                href: adminRoutes.capabilityGroups,
                icon: Boxes,
            },
            {
                title: 'Experience',
                href: adminRoutes.experiences,
                icon: Briefcase,
            },
            { title: 'Selected work', href: adminRoutes.works, icon: SquareStack },
            { title: 'Contact tiles', href: adminRoutes.contactTiles, icon: Mail },
        ],
    },
];

function isActive(currentUrl: string, item: AdminNavItem): boolean {
    // Strip any query string before comparing.
    const path = currentUrl.split('?')[0];

    return item.exact ? path === item.href : path.startsWith(item.href);
}

/**
 * Sidebar for the content admin.
 *
 * Built on the same shadcn primitives as the app sidebar, but deliberately
 * without a user menu: this area is authenticated by a PIN session, so there is
 * no user record to show (which is what left the app sidebar looking empty here).
 */
export function AdminSidebar() {
    const { url } = usePage();
    const logout = useForm({});

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={adminRoutes.dashboard} prefetch>
                                <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Lock className="size-4" />
                                </div>
                                <div className="ml-1 grid flex-1 text-left text-sm">
                                    <span className="truncate leading-tight font-semibold">
                                        CJ Roma
                                    </span>
                                    <span className="truncate text-xs text-muted-foreground">
                                        Content admin
                                    </span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {GROUPS.map((group) => (
                    <SidebarGroup key={group.label} className="px-2 py-0">
                        <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                        <SidebarMenu>
                            {group.items.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isActive(url, item)}
                                        tooltip={{ children: item.title }}
                                    >
                                        <Link href={item.href} prefetch>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip={{ children: 'View portfolio' }}>
                            <a href="/" target="_blank" rel="noreferrer noopener">
                                <ExternalLink />
                                <span>View portfolio</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton
                            tooltip={{ children: 'Lock admin' }}
                            disabled={logout.processing}
                            onClick={() => logout.post(adminRoutes.logout)}
                        >
                            <Lock />
                            <span>{logout.processing ? 'Locking…' : 'Lock admin'}</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
