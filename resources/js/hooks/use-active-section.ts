import { useEffect, useState } from 'react';

const OFFSET_PX = 90;

/** Tolerance for fractional scroll heights and zoomed/HiDPI rounding. */
const BOTTOM_SLACK_PX = 2;

/**
 * Which section the sticky nav should mark as current.
 */
export function useActiveSection(anchors: string[]): string | null {
    const [active, setActive] = useState<string | null>(anchors[0] ?? null);

    useEffect(() => {
        if (anchors.length === 0) {
            return;
        }

        let queued = false;

        const resolve = () => {
            queued = false;

            /*
             * A trailing section shorter than the viewport never gets its top
             * under OFFSET_PX, because the page runs out of scroll first — the
             * contact section topped out at 169px. Without this, the last
             * section is unreachable and the nav stays stuck on the previous
             * one for the whole bottom of the page.
             */
            const atBottom =
                window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight - BOTTOM_SLACK_PX;

            if (atBottom) {
                setActive(anchors[anchors.length - 1]);

                return;
            }

            let current = anchors[0];

            anchors.forEach((anchor) => {
                const element = document.getElementById(anchor);

                if (
                    element &&
                    element.getBoundingClientRect().top <= OFFSET_PX
                ) {
                    current = anchor;
                }
            });

            setActive(current);
        };

        const onScroll = () => {
            if (queued) {
                return;
            }

            queued = true;
            window.requestAnimationFrame(resolve);
        };

        resolve();
        window.addEventListener('scroll', onScroll, { passive: true });

        // Resizing changes which sections can reach the offset at all, so the
        // answer can go stale without the page having scrolled.
        window.addEventListener('resize', onScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, [anchors]);

    return active;
}
