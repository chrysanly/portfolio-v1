import { Head } from '@inertiajs/react';
import type { FieldDescriptor } from '@/components/portfolio-admin/field-types';
import { orderingFields } from '@/components/portfolio-admin/order-fields';
import { ResourceManager } from '@/components/portfolio-admin/resource-manager';
import PortfolioAdminLayout from '@/layouts/portfolio-admin-layout';
import { adminRoutes } from '@/lib/admin-routes';
import type { Stat } from '@/types/portfolio';

type Props = {
    stats: Stat[];
};

const FIELDS: readonly FieldDescriptor[] = [
    {
        name: 'label',
        label: 'Label',
        type: 'text',
        help: 'Shown in small caps, e.g. “YEARS OF EXPERIENCE”.',
    },
    { name: 'value', label: 'Value', type: 'text', placeholder: '5+' },
    { name: 'is_accent', label: 'Show the value in the accent colour', type: 'toggle' },
    ...orderingFields,
];

export default function AdminStats({ stats }: Props) {
    return (
        <PortfolioAdminLayout title="Headline figures">
            <Head title="Headline figures" />

            <ResourceManager
                title="The three-tile strip under the hero"
                description="Any number of tiles works; three fills the row exactly as in the design."
                itemNoun="figure"
                fields={FIELDS}
                storeUrl={adminRoutes.stats}
                emptyMessage="No headline figures yet — add one and the strip appears on the portfolio."
                blank={{
                    label: '',
                    value: '',
                    is_accent: false,
                    position: stats.length + 1,
                    is_visible: true,
                }}
                rows={stats.map((stat) => ({
                    id: stat.id,
                    label: stat.label,
                    url: adminRoutes.stat(stat.id),
                    values: {
                        label: stat.label,
                        value: stat.value,
                        is_accent: stat.isAccent,
                        position: stat.position,
                        is_visible: stat.isVisible,
                    },
                }))}
            />
        </PortfolioAdminLayout>
    );
}
