import { useId, useState } from 'react';
import type { Experience } from '@/types/portfolio';

type Props = {
    experience: Experience;
};

export function ExperienceEntry({ experience }: Props) {
    const [open, setOpen] = useState(experience.isExpandedByDefault);
    const panelId = useId();

    return (
        <div className="pf-entry" data-pf-reveal>
            <button
                type="button"
                className="pf-entry__button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpen((current) => !current)}
            >
                <span
                    className={
                        experience.isCurrent
                            ? 'pf-entry__period pf-entry__period--current'
                            : 'pf-entry__period'
                    }
                >
                    {experience.periodLabel}
                </span>

                <span>
                    <span className="pf-entry__role">{experience.role}</span>
                    <span className="pf-entry__company">
                        {experience.company}
                    </span>
                </span>

                <span className="pf-entry__chevron" aria-hidden="true">
                    +
                </span>
            </button>

            {/*
                The inner wrapper is what the 0fr/1fr collapse clips, so it must
                stay padding-free — the list inside carries the padding. Putting
                padding on the clipped element itself leaves a visible sliver of
                it behind when the row is closed.
            */}
            <div className="pf-entry__panel" id={panelId} data-open={open}>
                <div className="pf-entry__panel-inner">
                    <ul className="pf-entry__list">
                        {experience.highlights.map((highlight) => (
                            <li key={highlight.id} className="pf-entry__item">
                                <span
                                    className="pf-entry__dash"
                                    aria-hidden="true"
                                >
                                    —
                                </span>
                                {highlight.description}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
