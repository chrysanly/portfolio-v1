import type { PageSection } from '@/types/portfolio';

type Props = {
    sections: PageSection[];
    activeAnchor: string | null;
};

export function PortfolioNav({ sections, activeAnchor }: Props) {
    return (
        <nav className="pf-nav" aria-label="Sections">
            <div className="pf-nav__inner">
                {sections.map((section) => (
                    <a
                        key={section.id}
                        href={`#${section.anchor}`}
                        className="pf-nav__link"
                        aria-current={section.anchor === activeAnchor}
                    >
                        {section.navLabel}
                    </a>
                ))}
            </div>
        </nav>
    );
}
