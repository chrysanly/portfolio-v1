import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Single source of truth for "should this page animate at all".
 */
export function useReducedMotion(): boolean {
    const [reduced, setReduced] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(QUERY);

        setReduced(media.matches);

        const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);

        media.addEventListener('change', onChange);

        return () => media.removeEventListener('change', onChange);
    }, []);

    return reduced;
}
