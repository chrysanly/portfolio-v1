import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { adminRoutes } from '@/lib/admin-routes';

/**
 * The PIN gate. The PIN is the only credential, so this page is public and the
 * route is throttled to 5 attempts a minute.
 */
export default function AdminLogin() {
    const form = useForm({ pin: '' });

    const submit = (event: FormEvent) => {
        event.preventDefault();

        form.post(adminRoutes.login, {
            onError: () => form.reset('pin'),
        });
    };

    return (
        <>
            <Head title="Unlock content admin" />

            <div className="flex min-h-svh items-center justify-center bg-background px-6">
                <form
                    onSubmit={submit}
                    className="w-full max-w-sm space-y-6 rounded-xl border border-border p-8"
                >
                    <div className="space-y-1">
                        <p className="text-xs tracking-widest text-muted-foreground">
                            CJ ROMA — CONTENT ADMIN
                        </p>
                        <h1 className="text-xl font-semibold">Enter your PIN</h1>
                        <p className="text-sm text-muted-foreground">
                            The PIN unlocks this session, and is asked for again on
                            every change you save.
                        </p>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="pin">PIN</Label>
                        <Input
                            id="pin"
                            type="password"
                            inputMode="numeric"
                            autoComplete="off"
                            autoFocus
                            placeholder="••••••"
                            value={form.data.pin}
                            aria-describedby={form.errors.pin ? 'pin-error' : undefined}
                            onChange={(event) => form.setData('pin', event.target.value)}
                        />
                        <InputError id="pin-error" message={form.errors.pin} />
                    </div>

                    <Button type="submit" className="w-full" disabled={form.processing}>
                        {form.processing ? 'Checking…' : 'Unlock'}
                    </Button>
                </form>
            </div>
        </>
    );
}
