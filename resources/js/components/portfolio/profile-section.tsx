import { SectionHeading } from '@/components/portfolio/section-heading';
import type { PageSection, ProfileFact, SiteSettings } from '@/types/portfolio';

type Props = {
    section: PageSection;
    profile: SiteSettings['profile'];
    facts: ProfileFact[];
};

export function ProfileSection({ section, profile, facts }: Props) {
    return (
        <section id={section.anchor} className="pf-section pf-wrap">
            <SectionHeading title={section.heading} note={section.note} />

            <p className="pf-profile__lead" data-pf-reveal>
                {profile.lead}
            </p>

            {facts.length > 0 ? (
                <dl className="pf-table">
                    {facts.map((fact) => (
                        <div key={fact.id} className="pf-kv" data-pf-reveal>
                            <dt className="pf-kv__label">{fact.label}</dt>
                            <dd
                                className={
                                    fact.isAccent
                                        ? 'pf-kv__value pf-kv__value--accent'
                                        : 'pf-kv__value'
                                }
                            >
                                {fact.value}
                            </dd>
                        </div>
                    ))}
                </dl>
            ) : null}

            <p className="pf-profile__closing" data-pf-reveal>
                {profile.closing}
            </p>
        </section>
    );
}
