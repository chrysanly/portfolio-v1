import { useEffect, useState } from 'react';

/**
 * Flips the hero's staggered entrance on after the first paint. The delays
 * themselves live in CSS (.pf-boot--1 … --4).
 */
export function useBootIn(): boolean {
    const [shown, setShown] = useState(false);

    useEffect(() => {
        const frame = window.requestAnimationFrame(() => setShown(true));

        return () => window.cancelAnimationFrame(frame);
    }, []);

    return shown;
}
