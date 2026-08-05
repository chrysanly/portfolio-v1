import { useState } from 'react';
import { useDraggablePanel } from '@/hooks/use-draggable-panel';

const SWATCH_HUES = [170, 300, 70, 221, 340] as const;

const POSITION_KEY = 'cjroma-tweaks-position';

type Props = {
    hue: number;
    onHueChange: (hue: number) => void;
};

/**
 * Retunes the accent hue for this visitor only. The starting hue is the one
 * saved in the admin.
 *
 * Resting state is a single cog, not a labelled bar: the panel floats over real
 * content, and at 230px wide it covered the contact links in one corner and the
 * contact headline in the other. It can be dragged anywhere and remembers where
 * it was put.
 */
export function AccentTweaks({ hue, onHueChange }: Props) {
    const [open, setOpen] = useState(false);
    const { ref, position, isDragging, onHandlePointerDown, resetPosition } =
        useDraggablePanel(POSITION_KEY);

    return (
        <aside
            ref={ref}
            className="pf-tweaks"
            data-open={open}
            data-dragging={isDragging}
            aria-label="Accent colour"
            /* Left unset until the panel is actually dragged, so an untouched
               panel keeps the resting place the stylesheet gives it. */
            style={
                position
                    ? {
                          left: `${position.x}px`,
                          top: `${position.y}px`,
                          right: 'auto',
                          bottom: 'auto',
                      }
                    : undefined
            }
        >
            <div className="pf-tweaks__bar">
                <button
                    type="button"
                    className="pf-tweaks__grip"
                    onPointerDown={onHandlePointerDown}
                    onDoubleClick={resetPosition}
                    aria-label="Drag to move. Double-click to reset position."
                    title="Drag to move · double-click to reset"
                >
                    <span aria-hidden="true">⠿</span>
                </button>

                <button
                    type="button"
                    className="pf-tweaks__cog"
                    aria-expanded={open}
                    aria-label={
                        open ? 'Close accent settings' : 'Open accent settings'
                    }
                    onClick={() => setOpen((current) => !current)}
                >
                    <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <circle cx="12" cy="12" r="3.1" />
                        <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.56V21a2 2 0 1 1-4 0v-.11a1.7 1.7 0 0 0-1.11-1.56 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.56-1H3a2 2 0 1 1 0-4h.11a1.7 1.7 0 0 0 1.56-1.11 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H9a1.7 1.7 0 0 0 1-1.56V3a2 2 0 1 1 4 0v.11a1.7 1.7 0 0 0 1 1.56 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87V9a1.7 1.7 0 0 0 1.56 1H21a2 2 0 1 1 0 4h-.11a1.7 1.7 0 0 0-1.49 1z" />
                    </svg>
                </button>
            </div>

            {open ? (
                <div className="pf-tweaks__body">
                    <label className="pf-tweaks__label" htmlFor="pf-hue">
                        ACCENT HUE — {hue}°
                    </label>

                    <input
                        id="pf-hue"
                        className="pf-tweaks__slider"
                        type="range"
                        min={0}
                        max={360}
                        step={1}
                        value={hue}
                        onChange={(event) =>
                            onHueChange(Number(event.target.value))
                        }
                    />

                    <div className="pf-tweaks__swatches">
                        {SWATCH_HUES.map((swatch) => (
                            <button
                                key={swatch}
                                type="button"
                                className="pf-tweaks__swatch"
                                data-pf-swatch={swatch}
                                aria-label={`Accent hue ${swatch} degrees`}
                                onClick={() => onHueChange(swatch)}
                            />
                        ))}
                    </div>
                </div>
            ) : null}
        </aside>
    );
}
