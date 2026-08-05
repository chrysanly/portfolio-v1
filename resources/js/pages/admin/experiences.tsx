import { Head } from '@inertiajs/react';
import type { FieldDescriptor } from '@/components/portfolio-admin/field-types';
import { orderingFields } from '@/components/portfolio-admin/order-fields';
import { ResourceManager } from '@/components/portfolio-admin/resource-manager';
import PortfolioAdminLayout from '@/layouts/portfolio-admin-layout';
import { adminRoutes } from '@/lib/admin-routes';
import type { Experience } from '@/types/portfolio';

type Props = {
    experiences: Experience[];
};

const ENTRY_FIELDS: readonly FieldDescriptor[] = [
    {
        name: 'period_label',
        label: 'Period',
        type: 'text',
        placeholder: '2025 — NOW',
        help: 'Printed verbatim, so short forms like “NOV22—FEB25” are fine.',
    },
    { name: 'role', label: 'Role', type: 'text' },
    {
        name: 'company',
        label: 'Company and location',
        type: 'text',
        placeholder: 'Almutakamela Vehicle Testing & Registration · Dubai, UAE',
    },
    {
        name: 'is_current',
        label: 'Current role (period shown in the accent colour)',
        type: 'toggle',
    },
    {
        name: 'is_expanded_by_default',
        label: 'Open by default',
        type: 'toggle',
    },
    ...orderingFields,
];

const HIGHLIGHT_FIELDS: readonly FieldDescriptor[] = [
    { name: 'description', label: 'Bullet', type: 'textarea', rows: 2 },
    ...orderingFields,
];

export default function AdminExperiences({ experiences }: Props) {
    return (
        <PortfolioAdminLayout
            title="Experience"
            description="Each entry is a row in the accordion, with its own bullets."
        >
            <Head title="Experience" />

            <ResourceManager
                title="Experience entries"
                itemNoun="entry"
                fields={ENTRY_FIELDS}
                storeUrl={adminRoutes.experiences}
                emptyMessage="No experience entries yet."
                blank={{
                    period_label: '',
                    role: '',
                    company: '',
                    is_current: false,
                    is_expanded_by_default: false,
                    position: experiences.length + 1,
                    is_visible: true,
                }}
                rows={experiences.map((experience) => ({
                    id: experience.id,
                    label: `${experience.role} · ${experience.company}`,
                    url: adminRoutes.experience(experience.id),
                    values: {
                        period_label: experience.periodLabel,
                        role: experience.role,
                        company: experience.company,
                        is_current: experience.isCurrent,
                        is_expanded_by_default: experience.isExpandedByDefault,
                        position: experience.position,
                        is_visible: experience.isVisible,
                    },
                    children: (
                        <div className="ms-4 border-s border-border ps-4">
                            <ResourceManager
                                title={`Bullets under “${experience.role}”`}
                                itemNoun="bullet"
                                fields={HIGHLIGHT_FIELDS}
                                storeUrl={adminRoutes.highlights(experience.id)}
                                emptyMessage="No bullets under this role yet."
                                blank={{
                                    description: '',
                                    position: experience.highlights.length + 1,
                                    is_visible: true,
                                }}
                                rows={experience.highlights.map((highlight) => ({
                                    id: highlight.id,
                                    label: highlight.description,
                                    url: adminRoutes.highlight(
                                        experience.id,
                                        highlight.id,
                                    ),
                                    values: {
                                        description: highlight.description,
                                        position: highlight.position,
                                        is_visible: highlight.isVisible,
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
