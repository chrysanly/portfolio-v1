import { useCallback, useEffect, useState } from 'react';

/** One tab session sees the boot sequence once; reloads within it skip straight in. */
const SESSION_KEY = 'cjroma-splash-seen';

/** Cadence of the readout lines. */
const LINE_MS = 130;

/** Hold on the finished readout before the wipe starts. */
const HOLD_MS = 340;

/** Length of the wipe, and how long the overlay stays mounted for it. */
export const WIPE_MS = 460;

type SplashState = {
    /** Overlay is mounted. */
    active: boolean;
    /** How many readout lines have landed. */
    step: number;
    /** Wipe has begun; the page beneath is already visible. */
    leaving: boolean;
    /** Dismiss immediately. */
    skip: () => void;
};

function alreadySeen(): boolean {
    if (typeof window === 'undefined') {
        return true;
    }

    try {
        return window.sessionStorage.getItem(SESSION_KEY) === '1';
    } catch {
        // Blocked storage means we cannot tell — show it rather than suppress it.
        return false;
    }
}

function markSeen(): void {
    try {
        window.sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
        // A visitor blocking storage sees the boot again next load. Harmless.
    }
}

/**
 * Drives the boot-readout splash.
 *
 * Deliberately never shown when the visitor asks for reduced motion, and never
 * more than once per tab session — a gate on every navigation stops being a
 * flourish and starts being a toll.
 */
export function useSplash(
    lineCount: number,
    reducedMotion: boolean,
): SplashState {
    // Decided lazily so the overlay is never mounted for a visitor who should
    // not see it, avoiding a one-frame flash before an effect could hide it.
    const [active, setActive] = useState(
        () => !reducedMotion && !alreadySeen(),
    );
    const [step, setStep] = useState(0);
    const [leaving, setLeaving] = useState(false);

    const skip = useCallback(() => {
        setLeaving(true);
        markSeen();
        window.setTimeout(() => setActive(false), WIPE_MS);
    }, []);

    useEffect(() => {
        if (!active || leaving) {
            return;
        }

        markSeen();

        const timers: number[] = [];

        for (let line = 1; line <= lineCount; line += 1) {
            timers.push(window.setTimeout(() => setStep(line), line * LINE_MS));
        }

        timers.push(
            window.setTimeout(
                () => setLeaving(true),
                lineCount * LINE_MS + HOLD_MS,
            ),
        );

        timers.push(
            window.setTimeout(
                () => setActive(false),
                lineCount * LINE_MS + HOLD_MS + WIPE_MS,
            ),
        );

        return () => timers.forEach((timer) => window.clearTimeout(timer));
        // `leaving` is intentionally read but not depended on for re-running:
        // once the wipe starts, skip() owns the teardown.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active, lineCount]);

    // Any key dismisses, so the sequence never feels like something to sit through.
    useEffect(() => {
        if (!active) {
            return;
        }

        const onKey = () => skip();

        window.addEventListener('keydown', onKey);

        return () => window.removeEventListener('keydown', onKey);
    }, [active, skip]);

    return { active, step, leaving, skip };
}
