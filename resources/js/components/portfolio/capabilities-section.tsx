import { SectionHeading } from '@/components/portfolio/section-heading';
import type { CapabilityGroup, PageSection } from '@/types/portfolio';

type Props = {
    section: PageSection;
    groups: CapabilityGroup[];
};

export function CapabilitiesSection({ section, groups }: Props) {
    return (
        <section id={section.anchor} className="pf-section pf-wrap">
            <SectionHeading title={section.heading} note={section.note} />

            <div className="pf-table">
                {groups.map((group) => (
                    <div
                        key={group.id}
                        className="pf-capability"
                        data-pf-reveal
                    >
                        <div className="pf-capability__name">
                            <span
                                className={`pf-capability__marker pf-capability__marker--${group.marker}`}
                                aria-hidden="true"
                            />
                            <span>{group.name}</span>
                        </div>

                        <ul className="pf-capability__tags">
                            {group.items.map((item) => (
                                <li
                                    key={item.id}
                                    className="pf-capability__tag"
                                >
                                    {item.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
}
