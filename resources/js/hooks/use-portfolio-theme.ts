import { useCallback, useEffect, useState } from 'react';
import type { ThemeMode } from '@/types/portfolio';

const STORAGE_KEY = 'cjroma-theme-mode';
const CYCLE: ThemeMode[] = ['system', 'light', 'dark'];

function readStoredMode(): ThemeMode | null {
    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);

        return CYCLE.includes(stored as ThemeMode) ? (stored as ThemeMode) : null;
    } catch {
        return null;
    }
}

/**
 * System / light / dark, cycled by the header button and remembered per visitor.
 *
 * The resolved theme lands on `<html data-pf-theme>`, which is what the token
 * blocks in portfolio.css key off.
 */
export function usePortfolioTheme(defaultMode: ThemeMode): {
    mode: ThemeMode;
    resolved: Exclude<ThemeMode, 'system'>;
    cycle: () => void;
} {
    const [mode, setMode] = useState<ThemeMode>(defaultMode);
    const [prefersLight, setPrefersLight] = useState(false);

    useEffect(() => {
        setMode(readStoredMode() ?? defaultMode);
    }, [defaultMode]);

    useEffect(() => {
        const media = window.matchMedia('(prefers-color-scheme: light)');

        setPrefersLight(media.matches);

        const onChange = (event: MediaQueryListEvent) =>
            setPrefersLight(event.matches);

        media.addEventListener('change', onChange);

        return () => media.removeEventListener('change', onChange);
    }, []);

    const resolved: Exclude<ThemeMode, 'system'> =
        mode === 'system' ? (prefersLight ? 'light' : 'dark') : mode;

    useEffect(() => {
        document.documentElement.dataset.pfTheme = resolved;

        return () => {
            delete document.documentElement.dataset.pfTheme;
        };
    }, [resolved]);

    const cycle = useCallback(() => {
        setMode((current) => {
            const next = CYCLE[(CYCLE.indexOf(current) + 1) % CYCLE.length];

            try {
                window.localStorage.setItem(STORAGE_KEY, next);
            } catch {
                // A visitor blocking storage still gets the switch, just not the memory.
            }

            return next;
        });
    }, []);

    return { mode, resolved, cycle };
}
