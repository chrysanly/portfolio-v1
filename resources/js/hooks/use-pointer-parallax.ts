import { useEffect, type RefObject } from 'react';

const LAYER = '[data-pf-depth]';
const TRAVEL_PX = 8;

/**
 * Tilts the hero's glow, vein and spark layers toward the cursor.
 *
 * Skipped entirely on touch input and when reduced motion is requested.
 */
export function usePointerParallax(
    containerRef: RefObject<HTMLElement | null>,
    reducedMotion: boolean,
): void {
    useEffect(() => {
        const container = containerRef.current;

        if (!container || reducedMotion) {
            return;
        }

        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            return;
        }

        const layers = Array.from(container.querySelectorAll<HTMLElement>(LAYER));

        const onMove = (event: PointerEvent) => {
            const box = container.getBoundingClientRect();
            const offsetX = (event.clientX - box.left) / box.width - 0.5;
            const offsetY = (event.clientY - box.top) / box.height - 0.5;

            layers.forEach((layer) => {
                const depth = Number.parseFloat(layer.dataset.pfDepth ?? '1') || 1;

                layer.style.transform = `translate3d(${-offsetX * depth * TRAVEL_PX}px, ${-offsetY * depth * TRAVEL_PX}px, 0)`;
            });
        };

        const onEnter = () => {
            layers.forEach((layer) => {
                layer.style.transition = 'none';
            });
        };

        const onLeave = () => {
            layers.forEach((layer) => {
                layer.style.transition =
                    'transform 420ms cubic-bezier(0.23, 1, 0.32, 1)';
                layer.style.transform = 'translate3d(0, 0, 0)';
            });
        };

        container.addEventListener('pointermove', onMove);
        container.addEventListener('pointerenter', onEnter);
        container.addEventListener('pointerleave', onLeave);

        return () => {
            container.removeEventListener('pointermove', onMove);
            container.removeEventListener('pointerenter', onEnter);
            container.removeEventListener('pointerleave', onLeave);

            layers.forEach((layer) => {
                layer.style.removeProperty('transform');
                layer.style.removeProperty('transition');
            });
        };
    }, [containerRef, reducedMotion]);
}
