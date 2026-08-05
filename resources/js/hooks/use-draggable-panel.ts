import { useCallback, useEffect, useRef, useState } from 'react';

export type PanelPosition = { x: number; y: number };

/** Movement in px before a pointer press counts as a drag rather than a click. */
const DRAG_THRESHOLD = 4;

/** Kept clear of every edge so a dropped panel is never half off-screen. */
const EDGE_MARGIN = 8;

function readStored(storageKey: string): PanelPosition | null {
    if (typeof window === 'undefined') {
        return null;
    }

    try {
        const raw = window.localStorage.getItem(storageKey);

        if (!raw) {
            return null;
        }

        const parsed: unknown = JSON.parse(raw);

        if (
            typeof parsed === 'object' &&
            parsed !== null &&
            Number.isFinite((parsed as PanelPosition).x) &&
            Number.isFinite((parsed as PanelPosition).y)
        ) {
            return {
                x: (parsed as PanelPosition).x,
                y: (parsed as PanelPosition).y,
            };
        }
    } catch {
        // Unparseable or blocked storage just means "no saved position".
    }

    return null;
}

function clampToViewport(
    position: PanelPosition,
    element: HTMLElement | null,
): PanelPosition {
    if (typeof window === 'undefined') {
        return position;
    }

    const width = element?.offsetWidth ?? 0;
    const height = element?.offsetHeight ?? 0;

    return {
        x: Math.min(
            Math.max(position.x, EDGE_MARGIN),
            Math.max(EDGE_MARGIN, window.innerWidth - width - EDGE_MARGIN),
        ),
        y: Math.min(
            Math.max(position.y, EDGE_MARGIN),
            Math.max(EDGE_MARGIN, window.innerHeight - height - EDGE_MARGIN),
        ),
    };
}

/**
 * Drag-to-move for a fixed-position panel, remembered across visits.
 *
 * `position` stays null until the panel has actually been moved, so an
 * untouched panel keeps whatever resting place the stylesheet gives it rather
 * than being pinned to a hardcoded pixel default.
 */
export function useDraggablePanel(storageKey: string): {
    ref: React.RefObject<HTMLDivElement | null>;
    position: PanelPosition | null;
    isDragging: boolean;
    onHandlePointerDown: (event: React.PointerEvent) => void;
    resetPosition: () => void;
} {
    const ref = useRef<HTMLDivElement | null>(null);
    const [position, setPosition] = useState<PanelPosition | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    // Mutable drag state, deliberately outside React: it changes every
    // pointermove and must never trigger a render of its own.
    const drag = useRef({
        active: false,
        moved: false,
        pointerId: -1,
        offsetX: 0,
        offsetY: 0,
        startX: 0,
        startY: 0,
    });

    useEffect(() => {
        const stored = readStored(storageKey);

        if (stored) {
            setPosition(clampToViewport(stored, ref.current));
        }
    }, [storageKey]);

    // A saved position can fall outside a smaller window — phone rotation, a
    // resized desktop window — so it is re-clamped rather than left unreachable.
    useEffect(() => {
        const onResize = () =>
            setPosition((current) =>
                current ? clampToViewport(current, ref.current) : null,
            );

        window.addEventListener('resize', onResize);

        return () => window.removeEventListener('resize', onResize);
    }, []);

    const onHandlePointerDown = useCallback((event: React.PointerEvent) => {
        const panel = ref.current;

        if (!panel || event.button !== 0) {
            return;
        }

        const box = panel.getBoundingClientRect();

        drag.current = {
            active: true,
            moved: false,
            pointerId: event.pointerId,
            offsetX: event.clientX - box.left,
            offsetY: event.clientY - box.top,
            startX: event.clientX,
            startY: event.clientY,
        };

        try {
            // Capture so a fast drag that outruns the cursor keeps receiving
            // events. Window-level listeners below are the real mechanism, so a
            // browser that rejects the pointer id must not abort the drag.
            (event.currentTarget as HTMLElement).setPointerCapture(
                event.pointerId,
            );
        } catch {
            // Non-fatal: the drag still works without capture.
        }
    }, []);

    useEffect(() => {
        const onMove = (event: PointerEvent) => {
            const state = drag.current;

            if (!state.active || event.pointerId !== state.pointerId) {
                return;
            }

            if (!state.moved) {
                const travelled =
                    Math.abs(event.clientX - state.startX) +
                    Math.abs(event.clientY - state.startY);

                if (travelled <= DRAG_THRESHOLD) {
                    // Still within the slop a normal click produces — leave the
                    // panel alone so the handle stays clickable.
                    return;
                }

                state.moved = true;
                setIsDragging(true);
            }

            setPosition(
                clampToViewport(
                    {
                        x: event.clientX - state.offsetX,
                        y: event.clientY - state.offsetY,
                    },
                    ref.current,
                ),
            );
        };

        const onUp = (event: PointerEvent) => {
            const state = drag.current;

            if (!state.active || event.pointerId !== state.pointerId) {
                return;
            }

            state.active = false;
            setIsDragging(false);

            if (!state.moved) {
                return;
            }

            // Only a real drag writes to storage, so a plain click on the
            // handle never quietly re-pins the panel.
            setPosition((current) => {
                if (current) {
                    try {
                        window.localStorage.setItem(
                            storageKey,
                            JSON.stringify(current),
                        );
                    } catch {
                        // A visitor blocking storage still gets the drag, just
                        // not the memory of it.
                    }
                }

                return current;
            });
        };

        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerup', onUp);
        window.addEventListener('pointercancel', onUp);

        return () => {
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onUp);
            window.removeEventListener('pointercancel', onUp);
        };
    }, [storageKey]);

    const resetPosition = useCallback(() => {
        setPosition(null);

        try {
            window.localStorage.removeItem(storageKey);
        } catch {
            // Nothing to forget if storage is unavailable.
        }
    }, [storageKey]);

    return { ref, position, isDragging, onHandlePointerDown, resetPosition };
}
