import { useForm } from '@inertiajs/react';
import { type FormEvent, useId, useState } from 'react';
import { Button } from '@/components/ui/button';
import { FieldControl } from './field-control';
import type { FieldDescriptor, FieldValue, FormValues } from './field-types';
import { PinField } from './pin-field';

type Props = {
    fields: readonly FieldDescriptor[];
    blank: FormValues;
    storeUrl: string;
    itemNoun: string;
};

/**
 * Adds a new row. Collapsed by default so the screen leads with what exists.
 */
export function ResourceCreateForm({
    fields,
    blank,
    storeUrl,
    itemNoun,
}: Props) {
    const formId = useId();
    const [open, setOpen] = useState(false);
    const form = useForm<FormValues>({ ...blank, pin: '' });

    const submit = (event: FormEvent) => {
        event.preventDefault();

        form.post(storeUrl, {
            preserveScroll: true,
            onSuccess: () => {
                form.setDefaults({ ...blank, pin: '' });
                form.reset();
                setOpen(false);
            },
        });
    };

    if (!open) {
        return (
            <Button type="button" variant="outline" onClick={() => setOpen(true)}>
                Add {itemNoun}
            </Button>
        );
    }

    return (
        <form
            onSubmit={submit}
            className="rounded-lg border border-dashed border-border p-4 md:p-5"
        >
            <h3 className="mb-4 text-sm font-medium">New {itemNoun}</h3>

            <div className="grid gap-4 md:grid-cols-2">
                {fields.map((field) => (
                    <FieldControl
                        key={field.name}
                        field={field}
                        id={`${formId}-${field.name}`}
                        value={form.data[field.name] as FieldValue}
                        error={form.errors[field.name]}
                        onChange={(value) => form.setData(field.name, value)}
                    />
                ))}
            </div>

            <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
                <PinField
                    id={`${formId}-pin`}
                    value={String(form.data.pin ?? '')}
                    error={form.errors.pin}
                    onChange={(pin) => form.setData('pin', pin)}
                />

                <div className="flex gap-2">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => {
                            form.reset();
                            setOpen(false);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={form.processing}>
                        {form.processing ? 'Adding…' : `Add ${itemNoun}`}
                    </Button>
                </div>
            </div>
        </form>
    );
}
