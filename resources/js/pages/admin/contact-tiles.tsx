import { Head } from '@inertiajs/react';
import type { FieldDescriptor } from '@/components/portfolio-admin/field-types';
import { orderingFields } from '@/components/portfolio-admin/order-fields';
import { ResourceManager } from '@/components/portfolio-admin/resource-manager';
import PortfolioAdminLayout from '@/layouts/portfolio-admin-layout';
import { adminRoutes } from '@/lib/admin-routes';
import type { ContactTile, SelectOption } from '@/types/portfolio';

type Props = {
    contactTiles: ContactTile[];
    channelOptions: SelectOption[];
};

function fields(channelOptions: SelectOption[]): readonly FieldDescriptor[] {
    return [
        {
            name: 'channel',
            label: 'Channel',
            type: 'select',
            options: channelOptions,
            help: 'Decides how the link behaves — mailto, download, tel or a new tab. One tile per channel.',
        },
        { name: 'title', label: 'Title', type: 'text', placeholder: 'Email' },
        { name: 'value_label', label: 'Value shown', type: 'text' },
        { name: 'href', label: 'Link', type: 'text' },
        {
            name: 'badge_label',
            label: 'Badge',
            type: 'text',
            help: 'Optional, e.g. “PREFERRED”. A badge turns the tile’s number accent-coloured.',
        },
        ...orderingFields,
    ];
}

export default function AdminContactTiles({ contactTiles, channelOptions }: Props) {
    return (
        <PortfolioAdminLayout title="Contact tiles">
            <Head title="Contact tiles" />

            <ResourceManager
                title="The four-tile contact strip"
                itemNoun="tile"
                fields={fields(channelOptions)}
                storeUrl={adminRoutes.contactTiles}
                emptyMessage="No contact tiles yet."
                blank={{
                    channel: 'email',
                    title: '',
                    value_label: '',
                    href: '',
                    badge_label: '',
                    position: contactTiles.length + 1,
                    is_visible: true,
                }}
                rows={contactTiles.map((tile) => ({
                    id: tile.id,
                    label: `${tile.title} · ${tile.channelLabel}`,
                    url: adminRoutes.contactTile(tile.id),
                    values: {
                        channel: tile.channel,
                        title: tile.title,
                        value_label: tile.valueLabel,
                        href: tile.href,
                        badge_label: tile.badgeLabel ?? '',
                        position: tile.position,
                        is_visible: tile.isVisible,
                    },
                }))}
            />
        </PortfolioAdminLayout>
    );
}
