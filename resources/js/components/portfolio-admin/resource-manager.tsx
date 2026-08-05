import type { ReactNode } from 'react';
import { ResourceCreateForm } from './resource-create-form';
import type { FieldDescriptor, FormValues } from './field-types';
import { ResourceRow } from './resource-row';

export type ManagedRow = {
    id: string;
    label: string;
    values: FormValues;
    url: string;
    /** Rendered under the row's own form — used for nested collections. */
    children?: ReactNode;
};

type Props = {
    title: string;
    description?: string;
    itemNoun: string;
    fields: readonly FieldDescriptor[];
    blank: FormValues;
    storeUrl: string;
    rows: ManagedRow[];
    emptyMessage: string;
};

/**
 * The whole CRUD surface for one collection: what exists, how to change it, how
 * to add to it — all driven by the field descriptors.
 */
export function ResourceManager({
    title,
    description,
    itemNoun,
    fields,
    blank,
    storeUrl,
    rows,
    emptyMessage,
}: Props) {
    return (
        <section className="space-y-4">
            <header>
                <h2 className="text-base font-semibold">{title}</h2>
                {description ? (
                    <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
                        {description}
                    </p>
                ) : null}
            </header>

            {rows.length === 0 ? (
                <p className="rounded-lg border border-dashed border-border p-6 text-sm text-muted-foreground">
                    {emptyMessage}
                </p>
            ) : (
                <div className="space-y-4">
                    {rows.map((row) => (
                        <div key={row.id} className="space-y-4">
                            <ResourceRow
                                label={row.label}
                                fields={fields}
                                values={row.values}
                                url={row.url}
                                itemNoun={itemNoun}
                            />
                            {row.children}
                        </div>
                    ))}
                </div>
            )}

            <ResourceCreateForm
                fields={fields}
                blank={blank}
                storeUrl={storeUrl}
                itemNoun={itemNoun}
            />
        </section>
    );
}
