import { Head } from '@inertiajs/react';
import type { FieldDescriptor } from '@/components/portfolio-admin/field-types';
import { ResourceRow } from '@/components/portfolio-admin/resource-row';
import PortfolioAdminLayout from '@/layouts/portfolio-admin-layout';
import { adminRoutes } from '@/lib/admin-routes';
import type { PageSection } from '@/types/portfolio';

type Props = {
    sections: PageSection[];
};

const FIELDS: readonly FieldDescriptor[] = [
    { name: 'nav_label', label: 'Navigation label', type: 'text' },
    { name: 'heading', label: 'Section heading', type: 'text' },
    {
        name: 'note',
        label: 'Heading note',
        type: 'text',
        help: 'Optional aside beside the heading, e.g. “— click a row to expand”.',
    },
    { name: 'position', label: 'Position', type: 'number' },
    { name: 'is_visible', label: 'Show this section', type: 'toggle' },
];

/**
 * Sections are structural — they can be renamed, reordered and hidden, but not
 * created or deleted, so there is no create form here.
 */
export default function AdminSections({ sections }: Props) {
    return (
        <PortfolioAdminLayout
            title="Sections"
            description="Rename, reorder or hide a section of the page. Hiding a section removes it from the navigation too."
        >
            <Head title="Sections" />

            <div className="space-y-4">
                {sections.map((section) => (
                    <ResourceRow
                        key={section.id}
                        label={section.heading}
                        itemNoun="section"
                        deletable={false}
                        fields={FIELDS}
                        url={adminRoutes.section(section.id)}
                        values={{
                            nav_label: section.navLabel,
                            heading: section.heading,
                            note: section.note ?? '',
                            position: section.position,
                            is_visible: section.isVisible,
                        }}
                    />
                ))}
            </div>
        </PortfolioAdminLayout>
    );
}
