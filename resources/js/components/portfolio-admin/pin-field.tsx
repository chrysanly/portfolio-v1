import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Props = {
    id: string;
    value: string;
    error?: string;
    onChange: (pin: string) => void;
};

/**
 * The PIN box that appears on every write form. Never remembered, never
 * pre-filled, cleared by the caller after a successful save.
 */
export function PinField({ id, value, error, onChange }: Props) {
    return (
        <div className="grid gap-2">
            <Label htmlFor={id}>PIN</Label>
            <Input
                id={id}
                type="password"
                inputMode="numeric"
                autoComplete="off"
                placeholder="••••••"
                value={value}
                aria-describedby={error ? `${id}-error` : undefined}
                onChange={(event) => onChange(event.target.value)}
                className="max-w-40"
            />
            <InputError id={`${id}-error`} message={error} />
        </div>
    );
}
