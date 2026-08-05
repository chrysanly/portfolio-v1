import { useForm } from '@inertiajs/react';
import { type FormEvent, useId, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { FieldControl } from './field-control';
import type { FieldDescriptor, FieldValue, FormValues } from './field-types';
import { PinField } from './pin-field';

type Props = {
    /** Human description of this row, used in headings and the delete prompt. */
    label: string;
    fields: readonly FieldDescriptor[];
    values: FormValues;
    /** RESTful URL for this row: PUT to save, DELETE to remove. */
    url: string;
    deletable?: boolean;
    itemNoun: string;
};

/**
 * One editable row: its own form, its own PIN, its own confirm-to-delete.
 */
export function ResourceRow({
    label,
    fields,
    values,
    url,
    deletable = true,
    itemNoun,
}: Props) {
    const rowId = useId();
    const [confirmOpen, setConfirmOpen] = useState(false);

    const form = useForm<FormValues>({ ...values, pin: '' });
    const removal = useForm<{ pin: string }>({ pin: '' });

    const submit = (event: FormEvent) => {
        event.preventDefault();

        form.put(url, {
            preserveScroll: true,
            onSuccess: () => form.setData('pin', ''),
        });
    };

    const remove = (event: FormEvent) => {
        event.preventDefault();

        removal.delete(url, {
            preserveScroll: true,
            onSuccess: () => {
                removal.reset();
                setConfirmOpen(false);
            },
        });
    };

    return (
        <form
            onSubmit={submit}
            className="rounded-lg border border-border p-4 md:p-5"
        >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-medium">{label}</h3>

                {deletable ? (
                    <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                        <DialogTrigger asChild>
                            <Button type="button" variant="ghost" size="sm">
                                Delete
                            </Button>
                        </DialogTrigger>

                        <DialogContent>
                            <form onSubmit={remove} className="grid gap-4">
                                <DialogHeader>
                                    <DialogTitle>Delete “{label}”?</DialogTitle>
                                    <DialogDescription>
                                        This removes the {itemNoun} from the live
                                        portfolio immediately. Enter your PIN to
                                        confirm.
                                    </DialogDescription>
                                </DialogHeader>

                                <PinField
                                    id={`${rowId}-delete-pin`}
                                    value={removal.data.pin}
                                    error={removal.errors.pin}
                                    onChange={(pin) => removal.setData('pin', pin)}
                                />

                                <DialogFooter>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setConfirmOpen(false)}
                                    >
                                        Keep it
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="destructive"
                                        disabled={removal.processing}
                                    >
                                        {removal.processing
                                            ? 'Deleting…'
                                            : `Delete ${itemNoun}`}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                ) : null}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {fields.map((field) => (
                    <FieldControl
                        key={field.name}
                        field={field}
                        id={`${rowId}-${field.name}`}
                        value={form.data[field.name] as FieldValue}
                        error={form.errors[field.name]}
                        onChange={(value) => form.setData(field.name, value)}
                    />
                ))}
            </div>

            <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
                <PinField
                    id={`${rowId}-pin`}
                    value={String(form.data.pin ?? '')}
                    error={form.errors.pin}
                    onChange={(pin) => form.setData('pin', pin)}
                />

                <Button type="submit" disabled={form.processing}>
                    {form.processing ? 'Saving…' : 'Save changes'}
                </Button>
            </div>
        </form>
    );
}
