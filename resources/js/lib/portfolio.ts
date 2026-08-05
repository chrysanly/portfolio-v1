import type { PageSection, SectionKey } from '@/types/portfolio';

/**
 * Section headings are content, so a section can be renamed or hidden from the
 * admin. Lookups go through here rather than assuming a fixed array order.
 */
export function findSection(
    sections: PageSection[],
    key: SectionKey,
): PageSection | undefined {
    return sections.find((section) => section.key === key);
}

/** "01", "02" … the ordinal shown on the contact tiles. */
export function ordinal(position: number): string {
    return String(position).padStart(2, '0');
}
