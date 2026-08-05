import { Head } from '@inertiajs/react';
import type { FieldDescriptor } from '@/components/portfolio-admin/field-types';
import { orderingFields } from '@/components/portfolio-admin/order-fields';
import { ResourceManager } from '@/components/portfolio-admin/resource-manager';
import PortfolioAdminLayout from '@/layouts/portfolio-admin-layout';
import { adminRoutes } from '@/lib/admin-routes';
import type { ProfileFact } from '@/types/portfolio';

type Props = {
    profileFacts: ProfileFact[];
};

const FIELDS: readonly FieldDescriptor[] = [
    { name: 'label', label: 'Label', type: 'text', placeholder: 'Location' },
    { name: 'value', label: 'Value', type: 'text' },
    { name: 'is_accent', label: 'Show the value in the accent colour', type: 'toggle' },
    ...orderingFields,
];

export default function AdminProfileFacts({ profileFacts }: Props) {
    return (
        <PortfolioAdminLayout title="Profile rows">
            <Head title="Profile rows" />

            <ResourceManager
                title="The label/value table in the Profile section"
                itemNoun="row"
                fields={FIELDS}
                storeUrl={adminRoutes.profileFacts}
                emptyMessage="No profile rows yet — the table is hidden until you add one."
                blank={{
                    label: '',
                    value: '',
                    is_accent: false,
                    position: profileFacts.length + 1,
                    is_visible: true,
                }}
                rows={profileFacts.map((fact) => ({
                    id: fact.id,
                    label: fact.label,
                    url: adminRoutes.profileFact(fact.id),
                    values: {
                        label: fact.label,
                        value: fact.value,
                        is_accent: fact.isAccent,
                        position: fact.position,
                        is_visible: fact.isVisible,
                    },
                }))}
            />
        </PortfolioAdminLayout>
    );
}
