import { Head, useForm } from '@inertiajs/react';
import { type FormEvent, useId } from 'react';
import { FieldControl } from '@/components/portfolio-admin/field-control';
import type {
    FieldDescriptor,
    FieldValue,
    FormValues,
} from '@/components/portfolio-admin/field-types';
import { PinField } from '@/components/portfolio-admin/pin-field';
import { Button } from '@/components/ui/button';
import PortfolioAdminLayout from '@/layouts/portfolio-admin-layout';
import { adminRoutes } from '@/lib/admin-routes';
import type { SelectOption, SiteSettingValues } from '@/types/portfolio';

type Props = {
    values: SiteSettingValues;
    themeOptions: SelectOption[];
};

type Group = {
    title: string;
    description: string;
    fields: readonly FieldDescriptor[];
};

function groups(themeOptions: SelectOption[]): readonly Group[] {
    return [
        {
            title: 'Header',
            description: 'The strip above the navigation.',
            fields: [
                { name: 'brand_label', label: 'Brand label', type: 'text' },
                {
                    name: 'availability_label',
                    label: 'Availability label',
                    type: 'text',
                },
            ],
        },
        {
            title: 'Hero',
            description:
                'The headline splits in two: the lead renders in the normal colour, the highlight in the accent gradient.',
            fields: [
                { name: 'hero_eyebrow', label: 'Eyebrow', type: 'text' },
                { name: 'hero_headline_lead', label: 'Headline lead', type: 'text' },
                {
                    name: 'hero_headline_highlight',
                    label: 'Headline highlight',
                    type: 'text',
                },
                {
                    name: 'hero_summary',
                    label: 'Summary paragraph',
                    type: 'textarea',
                    rows: 4,
                },
            ],
        },
        {
            title: 'Portrait',
            description:
                'Paths are relative to public/ — upload the file there, then point at it.',
            fields: [
                {
                    name: 'portrait_path',
                    label: 'Image path',
                    type: 'text',
                    placeholder: 'images/cj-portrait.jpeg',
                },
                { name: 'portrait_alt', label: 'Alt text', type: 'text' },
                {
                    name: 'portrait_badge_start',
                    label: 'Badge (left)',
                    type: 'text',
                },
                { name: 'portrait_badge_end', label: 'Badge (right)', type: 'text' },
            ],
        },
        {
            title: 'Profile prose',
            description: 'The large lead line and the closing paragraph.',
            fields: [
                {
                    name: 'profile_lead',
                    label: 'Lead statement',
                    type: 'textarea',
                    rows: 3,
                },
                {
                    name: 'profile_closing',
                    label: 'Closing paragraph',
                    type: 'textarea',
                    rows: 4,
                },
            ],
        },
        {
            title: 'Contact headline',
            description: 'Three parts; the middle one gets the gradient.',
            fields: [
                { name: 'contact_headline_lead', label: 'Lead', type: 'text' },
                {
                    name: 'contact_headline_highlight',
                    label: 'Highlight',
                    type: 'text',
                },
                { name: 'contact_headline_tail', label: 'Tail', type: 'text' },
            ],
        },
        {
            title: 'Reachability',
            description:
                'Used by the hero buttons and the résumé download. The contact tiles have their own screen.',
            fields: [
                { name: 'email', label: 'Email', type: 'text' },
                { name: 'whatsapp_url', label: 'WhatsApp URL', type: 'text' },
                { name: 'phone_number', label: 'Phone number', type: 'text' },
                {
                    name: 'resume_path',
                    label: 'Résumé path',
                    type: 'text',
                    placeholder: 'CJ_Roma_Resume.pdf',
                },
            ],
        },
        {
            title: 'Footer',
            description: 'Two lines, left and right.',
            fields: [
                { name: 'footer_start', label: 'Footer left', type: 'text' },
                { name: 'footer_end', label: 'Footer right', type: 'text' },
            ],
        },
        {
            title: 'Search and social',
            description: 'Page title and meta description.',
            fields: [
                { name: 'meta_title', label: 'Meta title', type: 'text' },
                {
                    name: 'meta_description',
                    label: 'Meta description',
                    type: 'textarea',
                    rows: 2,
                },
            ],
        },
        {
            title: 'Presentation',
            description:
                'The starting accent hue and theme for a first-time visitor. Visitors can still retune both.',
            fields: [
                {
                    name: 'accent_hue',
                    label: 'Accent hue (0–360)',
                    type: 'number',
                    help: '170 is the approved teal.',
                },
                {
                    name: 'default_theme',
                    label: 'Default theme',
                    type: 'select',
                    options: themeOptions,
                },
            ],
        },
    ];
}

export default function AdminSettings({ values, themeOptions }: Props) {
    const formId = useId();
    const form = useForm<FormValues>({ ...values, pin: '' });
    const sections = groups(themeOptions);

    const submit = (event: FormEvent) => {
        event.preventDefault();

        form.put(adminRoutes.settings, {
            preserveScroll: true,
            onSuccess: () => form.setData('pin', ''),
        });
    };

    return (
        <PortfolioAdminLayout
            title="Site settings"
            description="The page-wide content: header, hero, prose, reachability, SEO and presentation defaults."
        >
            <Head title="Site settings" />

            <form onSubmit={submit} className="space-y-8">
                {sections.map((group) => (
                    <fieldset
                        key={group.title}
                        className="rounded-lg border border-border p-4 md:p-5"
                    >
                        <legend className="px-2 text-sm font-medium">
                            {group.title}
                        </legend>
                        <p className="mb-4 text-sm text-muted-foreground">
                            {group.description}
                        </p>

                        <div className="grid gap-4 md:grid-cols-2">
                            {group.fields.map((field) => (
                                <FieldControl
                                    key={field.name}
                                    field={field}
                                    id={`${formId}-${field.name}`}
                                    value={form.data[field.name] as FieldValue}
                                    error={form.errors[field.name]}
                                    onChange={(value) =>
                                        form.setData(field.name, value)
                                    }
                                />
                            ))}
                        </div>
                    </fieldset>
                ))}

                <div className="sticky bottom-0 flex flex-wrap items-end justify-between gap-4 border-t border-border bg-background py-4">
                    <PinField
                        id={`${formId}-pin`}
                        value={String(form.data.pin ?? '')}
                        error={form.errors.pin}
                        onChange={(pin) => form.setData('pin', pin)}
                    />

                    <Button type="submit" disabled={form.processing}>
                        {form.processing ? 'Saving…' : 'Save site settings'}
                    </Button>
                </div>
            </form>
        </PortfolioAdminLayout>
    );
}
