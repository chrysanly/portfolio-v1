import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'cjroma-accent-hue';

function readStoredHue(fallback: number): number {
    try {
        const stored = Number.parseInt(
            window.localStorage.getItem(STORAGE_KEY) ?? '',
            10,
        );

        return Number.isFinite(stored) && stored >= 0 && stored <= 360
            ? stored
            : fallback;
    } catch {
        return fallback;
    }
}

/**
 * The Tweaks panel's accent hue.
 *
 * Only the hue channel is overridden, so each theme keeps the lightness and
 * chroma it was designed with (see --pf-acc in portfolio.css).
 */
export function useAccentHue(defaultHue: number): {
    hue: number;
    setHue: (hue: number) => void;
} {
    const [hue, setHueState] = useState(defaultHue);

    useEffect(() => {
        setHueState(readStoredHue(defaultHue));
    }, [defaultHue]);

    useEffect(() => {
        document.documentElement.style.setProperty('--pf-acc-hue', String(hue));

        return () => {
            document.documentElement.style.removeProperty('--pf-acc-hue');
        };
    }, [hue]);

    const setHue = useCallback((next: number) => {
        setHueState(next);

        try {
            window.localStorage.setItem(STORAGE_KEY, String(next));
        } catch {
            // Non-fatal: the hue simply won't survive a reload.
        }
    }, []);

    return { hue, setHue };
}
