import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { FieldDescriptor, FieldValue } from './field-types';

type Props = {
    field: FieldDescriptor;
    id: string;
    value: FieldValue;
    error?: string;
    onChange: (value: FieldValue) => void;
};

/**
 * Renders one described field. The only place that knows how a field type maps
 * to a control.
 */
export function FieldControl({ field, id, value, error, onChange }: Props) {
    const describedBy = error ? `${id}-error` : undefined;

    return (
        <div className="grid gap-2">
            {field.type === 'toggle' ? (
                <Label
                    htmlFor={id}
                    className="flex cursor-pointer items-center gap-2"
                >
                    <input
                        id={id}
                        type="checkbox"
                        className="size-4 accent-primary"
                        checked={value === true}
                        onChange={(event) => onChange(event.target.checked)}
                    />
                    {field.label}
                </Label>
            ) : (
                <Label htmlFor={id}>{field.label}</Label>
            )}

            {field.type === 'textarea' ? (
                <textarea
                    id={id}
                    rows={field.rows ?? 3}
                    placeholder={field.placeholder}
                    value={typeof value === 'string' ? value : ''}
                    aria-describedby={describedBy}
                    onChange={(event) => onChange(event.target.value)}
                    className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                />
            ) : null}

            {field.type === 'text' || field.type === 'number' ? (
                <Input
                    id={id}
                    type={field.type === 'number' ? 'number' : 'text'}
                    placeholder={field.placeholder}
                    value={value === null ? '' : String(value)}
                    aria-describedby={describedBy}
                    onChange={(event) =>
                        onChange(
                            field.type === 'number'
                                ? Number(event.target.value)
                                : event.target.value,
                        )
                    }
                />
            ) : null}

            {field.type === 'select' ? (
                <Select
                    value={value === null ? undefined : String(value)}
                    onValueChange={(next) => onChange(next)}
                >
                    <SelectTrigger id={id} aria-describedby={describedBy}>
                        <SelectValue placeholder="Choose one" />
                    </SelectTrigger>
                    <SelectContent>
                        {field.options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            ) : null}

            {field.help ? (
                <p className="text-xs text-muted-foreground">{field.help}</p>
            ) : null}

            <InputError id={`${id}-error`} message={error} />
        </div>
    );
}
