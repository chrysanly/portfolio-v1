import { useSplash } from '@/hooks/use-splash';

export type SplashLine = {
    label: string;
    value: string;
};

type Props = {
    brandLabel: string;
    lines: SplashLine[];
    reducedMotion: boolean;
};

/**
 * Boot-readout splash.
 *
 * The site already talks like an instrument panel — mono labels, an ID badge on
 * the portrait, a live clock in the header, a STABLE status flag. So the splash
 * is a power-on self test rather than a spinner, and it reports the real
 * inventory of the page it is about to hand over: the actual tag, record and
 * project counts, pulled from the same props the sections render. Nothing here
 * is decorative filler — every number is true.
 */
export function PortfolioSplash({ brandLabel, lines, reducedMotion }: Props) {
    const { active, step, leaving, skip } = useSplash(
        lines.length + 1,
        reducedMotion,
    );

    if (!active) {
        return null;
    }

    const ready = step > lines.length;

    return (
        <div
            className="pf-splash"
            data-leaving={leaving}
            // Decorative and transient: the real page sits behind it already, so
            // assistive tech should read that instead of this.
            aria-hidden="true"
            onClick={skip}
        >
            <div className="pf-splash__panel">
                <div className="pf-splash__brand">{brandLabel}</div>

                <ul className="pf-splash__list">
                    {lines.map((line, index) => (
                        <li
                            key={line.label}
                            className="pf-splash__line"
                            data-shown={index < step}
                        >
                            <span className="pf-splash__label">
                                {line.label}
                            </span>
                            <span className="pf-splash__leader" />
                            <span className="pf-splash__value">
                                {line.value}
                            </span>
                        </li>
                    ))}
                </ul>

                <div className="pf-splash__foot">
                    <div className="pf-splash__bar">
                        <span
                            className="pf-splash__fill"
                            style={{
                                transform: `scaleX(${Math.min(
                                    step / (lines.length + 1),
                                    1,
                                )})`,
                            }}
                        />
                    </div>

                    <span className="pf-splash__status" data-ready={ready}>
                        {ready ? 'READY' : 'BOOT'}
                    </span>
                </div>

                <p className="pf-splash__hint">press any key to skip</p>
            </div>
        </div>
    );
}
