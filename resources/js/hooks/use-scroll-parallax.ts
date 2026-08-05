import { useEffect, type RefObject } from 'react';

const LAYER = '[data-pf-sdepth]';

/**
 * Drifts the page-wide background layers slower than the scroll, one rAF per
 * frame at most.
 */
export function useScrollParallax(
    containerRef: RefObject<HTMLElement | null>,
    reducedMotion: boolean,
): void {
    useEffect(() => {
        const container = containerRef.current;

        if (!container || reducedMotion) {
            return;
        }

        const layers = Array.from(container.querySelectorAll<HTMLElement>(LAYER));
        let queued = false;

        const apply = () => {
            queued = false;

            layers.forEach((layer) => {
                const depth =
                    Number.parseFloat(layer.dataset.pfSdepth ?? '0.05') || 0.05;

                layer.style.transform = `translate3d(0, ${-window.scrollY * depth}px, 0)`;
            });
        };

        const onScroll = () => {
            if (queued) {
                return;
            }

            queued = true;
            window.requestAnimationFrame(apply);
        };

        apply();
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', onScroll);
            layers.forEach((layer) => layer.style.removeProperty('transform'));
        };
    }, [containerRef, reducedMotion]);
}
