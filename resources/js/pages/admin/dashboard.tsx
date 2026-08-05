import { Head, Link } from '@inertiajs/react';
import PortfolioAdminLayout from '@/layouts/portfolio-admin-layout';
import { adminRoutes } from '@/lib/admin-routes';

type Props = {
    counts: {
        sections: number;
        stats: number;
        profileFacts: number;
        capabilityGroups: number;
        experiences: number;
        works: number;
        contactTiles: number;
    };
    updatedAt: string | null;
};

const TILES = [
    { key: 'sections', title: 'Sections', href: adminRoutes.sections },
    { key: 'stats', title: 'Headline figures', href: adminRoutes.stats },
    { key: 'profileFacts', title: 'Profile rows', href: adminRoutes.profileFacts },
    {
        key: 'capabilityGroups',
        title: 'Capability rows',
        href: adminRoutes.capabilityGroups,
    },
    { key: 'experiences', title: 'Experience entries', href: adminRoutes.experiences },
    { key: 'works', title: 'Selected work cards', href: adminRoutes.works },
    { key: 'contactTiles', title: 'Contact tiles', href: adminRoutes.contactTiles },
] as const;

export default function AdminDashboard({ counts, updatedAt }: Props) {
    return (
        <PortfolioAdminLayout
            title="Overview"
            description="Everything on the portfolio is edited here. Each save asks for your PIN and publishes straight to the live page."
        >
            <Head title="Content admin" />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {TILES.map((tile) => (
                    <Link
                        key={tile.key}
                        href={tile.href}
                        className="rounded-lg border border-border p-5 transition-colors hover:border-primary"
                    >
                        <p className="text-sm text-muted-foreground">{tile.title}</p>
                        <p className="mt-2 text-3xl font-semibold">
                            {counts[tile.key]}
                        </p>
                    </Link>
                ))}
            </div>

            <p className="text-sm text-muted-foreground">
                Site settings last saved:{' '}
                {updatedAt
                    ? new Intl.DateTimeFormat('en-AE', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                          timeZone: 'Asia/Dubai',
                      }).format(new Date(updatedAt))
                    : 'never'}
            </p>
        </PortfolioAdminLayout>
    );
}
