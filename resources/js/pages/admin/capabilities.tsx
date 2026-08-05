import { Head } from '@inertiajs/react';
import type { FieldDescriptor } from '@/components/portfolio-admin/field-types';
import { orderingFields } from '@/components/portfolio-admin/order-fields';
import { ResourceManager } from '@/components/portfolio-admin/resource-manager';
import PortfolioAdminLayout from '@/layouts/portfolio-admin-layout';
import { adminRoutes } from '@/lib/admin-routes';
import type { CapabilityGroup, SelectOption } from '@/types/portfolio';

type Props = {
    groups: CapabilityGroup[];
    markerOptions: SelectOption[];
};

const TAG_FIELDS: readonly FieldDescriptor[] = [
    { name: 'label', label: 'Tag', type: 'text', placeholder: 'Laravel 7–12' },
    ...orderingFields,
];

function groupFields(markerOptions: SelectOption[]): readonly FieldDescriptor[] {
    return [
        { name: 'name', label: 'Row name', type: 'text' },
        {
            name: 'marker',
            label: 'Marker colour',
            type: 'select',
            options: markerOptions,
            help: 'The small square beside the row name.',
        },
        ...orderingFields,
    ];
}

export default function AdminCapabilities({ groups, markerOptions }: Props) {
    return (
        <PortfolioAdminLayout
            title="Capabilities"
            description="Each row is a group with its own tag list. Tags render in the order you give them."
        >
            <Head title="Capabilities" />

            <ResourceManager
                title="Capability rows"
                itemNoun="row"
                fields={groupFields(markerOptions)}
                storeUrl={adminRoutes.capabilityGroups}
                emptyMessage="No capability rows yet."
                blank={{
                    name: '',
                    marker: 'primary',
                    position: groups.length + 1,
                    is_visible: true,
                }}
                rows={groups.map((group) => ({
                    id: group.id,
                    label: group.name,
                    url: adminRoutes.capabilityGroup(group.id),
                    values: {
                        name: group.name,
                        marker: group.marker,
                        position: group.position,
                        is_visible: group.isVisible,
                    },
                    children: (
                        <div className="ms-4 border-s border-border ps-4">
                            <ResourceManager
                                title={`Tags in “${group.name}”`}
                                itemNoun="tag"
                                fields={TAG_FIELDS}
                                storeUrl={adminRoutes.capabilityItems(group.id)}
                                emptyMessage="No tags in this row yet."
                                blank={{
                                    label: '',
                                    position: group.items.length + 1,
                                    is_visible: true,
                                }}
                                rows={group.items.map((item) => ({
                                    id: item.id,
                                    label: item.label,
                                    url: adminRoutes.capabilityItem(group.id, item.id),
                                    values: {
                                        label: item.label,
                                        position: item.position,
                                        is_visible: item.isVisible,
                                    },
                                }))}
                            />
                        </div>
                    ),
                }))}
            />
        </PortfolioAdminLayout>
    );
}
