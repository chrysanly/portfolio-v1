import { useEffect, type RefObject } from 'react';

const TARGET = '[data-pf-reveal]';
const STAGGER_MS = 50;
const MAX_STAGGER_STEPS = 6;

/**
 * Fades elements in as they enter the viewport, staggered like the mockup.
 *
 * The hidden-then-revealed state is opt-in: this hook flags the root with
 * `data-pf-animate` before hiding anything, and the CSS only hides elements
 * while that flag is present. If this hook never runs — script error, blocked
 * bundle, JS disabled — the page renders fully visible rather than blank.
 *
 * Anything already on screen at first paint is revealed immediately, so a
 * visitor never lands on an invisible page.
 */
export function useScrollReveal(
    containerRef: RefObject<HTMLElement | null>,
    reducedMotion: boolean,
): void {
    useEffect(() => {
        const container = containerRef.current;

        if (!container) {
            return;
        }

        const targets = Array.from(
            container.querySelectorAll<HTMLElement>(TARGET),
        );

        if (reducedMotion) {
            targets.forEach((target) => {
                target.dataset.shown = 'true';
            });

            return;
        }

        container.dataset.pfAnimate = 'true';

        /*
         * Timers are tracked per element so a target that leaves the viewport
         * mid-stagger does not get shown a moment later by an orphaned timeout.
         */
        const pending = new Map<HTMLElement, number>();

        const cancel = (target: HTMLElement) => {
            const timer = pending.get(target);

            if (timer !== undefined) {
                window.clearTimeout(timer);
                pending.delete(target);
            }
        };

        const show = (target: HTMLElement, delay: number) => {
            cancel(target);

            pending.set(
                target,
                window.setTimeout(() => {
                    pending.delete(target);
                    target.dataset.shown = 'true';
                }, delay),
            );
        };

        const hide = (target: HTMLElement) => {
            cancel(target);
            delete target.dataset.shown;
        };

        /*
         * Elements are never unobserved, so the reveal replays every time they
         * come back into view — scrolling up re-runs it just like scrolling
         * down. Leaving the viewport clears the shown flag, which is what arms
         * the animation for the next pass.
         */
        const observer = new IntersectionObserver(
            (entries) => {
                let step = 0;

                entries.forEach((entry) => {
                    const target = entry.target as HTMLElement;

                    if (entry.isIntersecting) {
                        // Stagger is per batch, so a group entering together
                        // cascades while a single element re-entering is instant.
                        show(
                            target,
                            Math.min(step++, MAX_STAGGER_STEPS) * STAGGER_MS,
                        );

                        return;
                    }

                    hide(target);
                });
            },
            { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
        );

        targets.forEach((target) => {
            // Anything already on screen at first paint is shown without delay,
            // so a visitor never lands on an invisible page.
            const box = target.getBoundingClientRect();

            if (box.top < window.innerHeight * 0.95 && box.bottom > 0) {
                target.dataset.shown = 'true';
            }

            observer.observe(target);
        });

        return () => {
            observer.disconnect();
            pending.forEach((timer) => window.clearTimeout(timer));
            pending.clear();
            delete container.dataset.pfAnimate;
        };
    }, [containerRef, reducedMotion]);
}
