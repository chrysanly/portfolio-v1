import { Head } from '@inertiajs/react';
import type { FieldDescriptor } from '@/components/portfolio-admin/field-types';
import { orderingFields } from '@/components/portfolio-admin/order-fields';
import { ResourceManager } from '@/components/portfolio-admin/resource-manager';
import PortfolioAdminLayout from '@/layouts/portfolio-admin-layout';
import { adminRoutes } from '@/lib/admin-routes';
import type { Work } from '@/types/portfolio';

type Props = {
    works: Work[];
};

const FIELDS: readonly FieldDescriptor[] = [
    {
        name: 'eyebrow',
        label: 'Eyebrow',
        type: 'text',
        placeholder: 'ERP · LARAVEL · RBAC',
    },
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'description', label: 'Description', type: 'textarea', rows: 3 },
    {
        name: 'media_label',
        label: 'Placeholder caption',
        type: 'text',
        help: 'Shown in the striped tile while there is no screenshot.',
    },
    {
        name: 'image_path',
        label: 'Screenshot path',
        type: 'text',
        placeholder: 'images/work/erp-finance.png',
        help: 'Optional. Relative to public/. Leave empty to keep the striped placeholder.',
    },
    ...orderingFields,
];

export default function AdminWorks({ works }: Props) {
    return (
        <PortfolioAdminLayout title="Selected work">
            <Head title="Selected work" />

            <ResourceManager
                title="The project cards"
                description="Three cards fill the row on desktop; more wrap onto the next line."
                itemNoun="card"
                fields={FIELDS}
                storeUrl={adminRoutes.works}
                emptyMessage="No work cards yet."
                blank={{
                    eyebrow: '',
                    title: '',
                    description: '',
                    media_label: '',
                    image_path: '',
                    position: works.length + 1,
                    is_visible: true,
                }}
                rows={works.map((work) => ({
                    id: work.id,
                    label: work.title,
                    url: adminRoutes.work(work.id),
                    values: {
                        eyebrow: work.eyebrow,
                        title: work.title,
                        description: work.description,
                        media_label: work.mediaLabel,
                        image_path: work.imagePath ?? '',
                        position: work.position,
                        is_visible: work.isVisible,
                    },
                }))}
            />
        </PortfolioAdminLayout>
    );
}
