import { SectionHeading } from '@/components/portfolio/section-heading';
import { ordinal } from '@/lib/portfolio';
import type { ContactTile, PageSection, SiteSettings } from '@/types/portfolio';

type Props = {
    section: PageSection;
    headline: SiteSettings['contactHeadline'];
    tiles: ContactTile[];
};

export function ContactSection({ section, headline, tiles }: Props) {
    return (
        <section
            id={section.anchor}
            className="pf-section pf-section--last pf-contact pf-wrap"
        >
            <SectionHeading title={section.heading} note={section.note} />

            <div className="pf-contact__split">
                <h3 className="pf-contact__headline">
                    {headline.lead}{' '}
                    <span className="pf-gradient-text">
                        {headline.highlight}
                    </span>{' '}
                    {headline.tail}
                </h3>

                <div className="pf-contact__grid">
                    {tiles.map((tile) => (
                        <a
                            key={tile.id}
                            className="pf-tile"
                            href={tile.href}
                            download={tile.isDownload || undefined}
                            rel={
                                tile.channel === 'whatsapp'
                                    ? 'noreferrer noopener'
                                    : undefined
                            }
                            target={
                                tile.channel === 'whatsapp'
                                    ? '_blank'
                                    : undefined
                            }
                        >
                            <span
                                className={
                                    tile.badgeLabel
                                        ? 'pf-tile__index pf-tile__index--accent'
                                        : 'pf-tile__index'
                                }
                            >
                                {ordinal(tile.position)}
                                {tile.badgeLabel ? ` · ${tile.badgeLabel}` : ''}
                            </span>

                            <span>
                                <span className="pf-tile__title">
                                    {tile.title}
                                </span>
                                <span className="pf-tile__value">
                                    {tile.valueLabel}
                                </span>
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
