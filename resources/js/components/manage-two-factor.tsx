import { router, useForm } from '@inertiajs/react';
import { ShieldCheck, ShieldOff } from 'lucide-react';
import { type FormEvent, useState } from 'react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useClipboard } from '@/hooks/use-clipboard';
import {
    confirm,
    disable,
    enable,
    regenerateRecoveryCodes,
} from '@/routes/two-factor';

export type TwoFactorSetup = {
    /** Fortify-rendered QR code. Server-generated markup, not user input. */
    qrCodeSvg: string;
    secretKey: string;
    confirmed: boolean;
};

export type Props = {
    canManageTwoFactor?: boolean;
    twoFactorEnabled?: boolean;
    requiresConfirmation?: boolean;
    /** Present once a secret exists, whether or not it has been confirmed. */
    twoFactorSetup?: TwoFactorSetup | null;
    recoveryCodes?: string[];
};

/**
 * Two-factor authentication for the account settings page.
 *
 * Every piece of setup material (QR code, secret, recovery codes) arrives as an
 * Inertia prop from SecurityController, so the browser never calls Fortify's JSON
 * endpoints directly and the page stays inside Inertia's state model
 * (ARCHITECTURE §8). Mutations go through the Wayfinder route helpers.
 */
export default function ManageTwoFactor({
    canManageTwoFactor = false,
    twoFactorEnabled = false,
    twoFactorSetup = null,
    recoveryCodes = [],
}: Props) {
    const [copiedText, copy] = useClipboard();
    const [codesVisible, setCodesVisible] = useState(false);
    const [busy, setBusy] = useState(false);
    const confirmation = useForm({ code: '' });

    if (!canManageTwoFactor) {
        return null;
    }

    const start = () => {
        setBusy(true);
        router.post(enable.url(), {}, {
            preserveScroll: true,
            onFinish: () => setBusy(false),
        });
    };

    const stop = () => {
        setBusy(true);
        router.delete(disable.url(), {
            preserveScroll: true,
            onFinish: () => setBusy(false),
        });
    };

    const regenerate = () => {
        setBusy(true);
        router.post(regenerateRecoveryCodes.url(), {}, {
            preserveScroll: true,
            onFinish: () => setBusy(false),
        });
    };

    const submitConfirmation = (event: FormEvent) => {
        event.preventDefault();

        confirmation.post(confirm.url(), {
            preserveScroll: true,
            onSuccess: () => confirmation.reset(),
        });
    };

    const awaitingConfirmation = twoFactorSetup !== null && !twoFactorEnabled;

    return (
        <div className="space-y-6">
            <Heading
                variant="small"
                title="Two-factor authentication"
                description="Require a one-time code from your authenticator app when signing in"
            />

            <div className="space-y-6 rounded-lg border border-border p-6">
                <div className="flex flex-wrap items-center gap-3">
                    {twoFactorEnabled ? (
                        <ShieldCheck
                            className="size-5 text-emerald-600 dark:text-emerald-400"
                            aria-hidden="true"
                        />
                    ) : (
                        <ShieldOff
                            className="size-5 text-muted-foreground"
                            aria-hidden="true"
                        />
                    )}

                    <p className="text-sm font-medium">
                        {twoFactorEnabled
                            ? 'Two-factor authentication is on'
                            : awaitingConfirmation
                              ? 'Finish setting up two-factor authentication'
                              : 'Two-factor authentication is off'}
                    </p>
                </div>

                {/* Off, and no setup started yet. */}
                {!twoFactorEnabled && !awaitingConfirmation ? (
                    <>
                        <p className="text-sm text-muted-foreground">
                            When enabled, you will be asked for a secure code from
                            your authenticator app in addition to your password.
                        </p>

                        <Button type="button" onClick={start} disabled={busy}>
                            {busy ? 'Enabling…' : 'Enable two-factor authentication'}
                        </Button>
                    </>
                ) : null}

                {/* Secret issued, waiting for the first code. */}
                {awaitingConfirmation && twoFactorSetup ? (
                    <div className="space-y-6">
                        <p className="text-sm text-muted-foreground">
                            Scan this QR code with your authenticator app, then enter
                            the six-digit code it shows to finish.
                        </p>

                        <div className="flex flex-wrap items-start gap-6">
                            <div
                                className="w-40 rounded-lg bg-white p-3 [&_svg]:h-auto [&_svg]:w-full"
                                // Fortify renders this SVG server-side; it contains
                                // no user-supplied content.
                                dangerouslySetInnerHTML={{
                                    __html: twoFactorSetup.qrCodeSvg,
                                }}
                            />

                            <div className="grid gap-2">
                                <Label htmlFor="two-factor-secret">
                                    Or enter this key manually
                                </Label>

                                <div className="flex items-center gap-2">
                                    <Input
                                        id="two-factor-secret"
                                        readOnly
                                        value={twoFactorSetup.secretKey}
                                        className="max-w-72 font-mono text-xs"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => copy(twoFactorSetup.secretKey)}
                                    >
                                        {copiedText === twoFactorSetup.secretKey
                                            ? 'Copied'
                                            : 'Copy'}
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <form
                            onSubmit={submitConfirmation}
                            className="grid max-w-72 gap-2"
                        >
                            <Label htmlFor="two-factor-code">
                                Code from your app
                            </Label>

                            <Input
                                id="two-factor-code"
                                name="code"
                                inputMode="numeric"
                                autoComplete="one-time-code"
                                autoFocus
                                placeholder="123456"
                                value={confirmation.data.code}
                                aria-describedby={
                                    confirmation.errors.code
                                        ? 'two-factor-code-error'
                                        : undefined
                                }
                                onChange={(event) =>
                                    confirmation.setData('code', event.target.value)
                                }
                            />

                            <InputError
                                id="two-factor-code-error"
                                message={confirmation.errors.code}
                            />

                            <div className="mt-2 flex flex-wrap gap-2">
                                <Button
                                    type="submit"
                                    disabled={confirmation.processing}
                                >
                                    {confirmation.processing
                                        ? 'Confirming…'
                                        : 'Confirm'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={stop}
                                    disabled={busy}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </div>
                ) : null}

                {/* On: recovery codes and the off switch. */}
                {twoFactorEnabled ? (
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm font-medium">Recovery codes</p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Store these somewhere safe. Each one signs you in
                                once if you lose access to your authenticator app.
                            </p>
                        </div>

                        {codesVisible ? (
                            <ul className="grid gap-1 rounded-md bg-muted p-4 font-mono text-xs sm:grid-cols-2">
                                {recoveryCodes.map((code) => (
                                    <li key={code}>{code}</li>
                                ))}
                            </ul>
                        ) : null}

                        <div className="flex flex-wrap gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setCodesVisible((shown) => !shown)}
                            >
                                {codesVisible ? 'Hide codes' : 'Show codes'}
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                onClick={regenerate}
                                disabled={busy}
                            >
                                Regenerate codes
                            </Button>

                            <Button
                                type="button"
                                variant="destructive"
                                onClick={stop}
                                disabled={busy}
                            >
                                {busy ? 'Disabling…' : 'Disable'}
                            </Button>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
