import { ExperienceEntry } from '@/components/portfolio/experience-entry';
import { SectionHeading } from '@/components/portfolio/section-heading';
import type { Experience, PageSection } from '@/types/portfolio';

type Props = {
    section: PageSection;
    experiences: Experience[];
};

export function ExperienceSection({ section, experiences }: Props) {
    return (
        <section id={section.anchor} className="pf-section pf-wrap">
            <SectionHeading title={section.heading} note={section.note} />

            {experiences.map((experience) => (
                <ExperienceEntry key={experience.id} experience={experience} />
            ))}
        </section>
    );
}
