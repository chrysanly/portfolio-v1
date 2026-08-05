import type { CSSProperties } from 'react';
import { SectionHeading } from '@/components/portfolio/section-heading';
import type { PageSection, Work } from '@/types/portfolio';

type Props = {
    section: PageSection;
    works: Work[];
};

/**
 * Past this many projects the grid becomes a drifting marquee. At or below it a
 * static three-up grid already fills the row, so there is nothing for motion to
 * reveal.
 */
const MARQUEE_THRESHOLD = 3;

/** Seconds per card, so the strip keeps one speed however many projects exist. */
const SECONDS_PER_CARD = 7.5;

function WorkCardBody({ work }: { work: Work }) {
    return (
        <>
            <div className="pf-work-card__media">
                {work.imageUrl ? (
                    <img
                        className="pf-work-card__image"
                        src={work.imageUrl}
                        alt={work.mediaLabel}
                        loading="lazy"
                        width={640}
                        height={340}
                    />
                ) : (
                    <span className="pf-work-card__media-label">
                        {work.mediaLabel}
                    </span>
                )}
            </div>

            <div className="pf-work-card__body">
                <div className="pf-work-card__eyebrow">{work.eyebrow}</div>
                <h3 className="pf-work-card__title">{work.title}</h3>
                <p className="pf-work-card__text">{work.description}</p>
            </div>
        </>
    );
}

export function WorkSection({ section, works }: Props) {
    const isMarquee = works.length > MARQUEE_THRESHOLD;

    return (
        <section id={section.anchor} className="pf-section pf-wrap">
            <SectionHeading title={section.heading} note={section.note} />

            {isMarquee ? (
                /*
                 * The list renders twice and the track slides by exactly one
                 * copy, so the loop closes on itself with no visible seam. The
                 * second pass is aria-hidden — the same projects again, which a
                 * screen reader should not read twice.
                 *
                 * data-pf-reveal sits on the strip rather than on each card: a
                 * card that drifts in from off-frame may never satisfy the
                 * reveal observer, which would leave it stuck at opacity 0.
                 */
                <div
                    className="pf-work__marquee"
                    data-pf-reveal
                    style={
                        {
                            '--pf-marquee-duration': `${works.length * SECONDS_PER_CARD}s`,
                        } as CSSProperties
                    }
                >
                    <div className="pf-work__track">
                        {works.map((work) => (
                            <article key={work.id} className="pf-work-card">
                                <WorkCardBody work={work} />
                            </article>
                        ))}

                        {works.map((work) => (
                            <article
                                key={`${work.id}-loop`}
                                className="pf-work-card"
                                aria-hidden="true"
                            >
                                <WorkCardBody work={work} />
                            </article>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="pf-work__grid">
                    {works.map((work) => (
                        <article
                            key={work.id}
                            className="pf-work-card"
                            data-pf-reveal
                        >
                            <WorkCardBody work={work} />
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}
