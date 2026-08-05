/**
 * Mirrors the API Resources in app/Http/Resources one-for-one (RULES §2).
 * If a Resource changes shape, this file changes with it — nothing else does.
 */

export type ThemeMode = 'system' | 'light' | 'dark';

export type AccentMarker = 'primary' | 'secondary';

export type ContactChannel = 'email' | 'resume' | 'whatsapp' | 'phone' | 'link';

export type SectionKey =
    | 'hero'
    | 'profile'
    | 'capabilities'
    | 'experience'
    | 'work'
    | 'contact';

export type SelectOption = {
    value: string;
    label: string;
};

export type SiteSettings = {
    brandLabel: string;
    availabilityLabel: string;
    hero: {
        eyebrow: string;
        headlineLead: string;
        headlineHighlight: string;
        summary: string;
    };
    portrait: {
        src: string;
        alt: string;
        badgeStart: string;
        badgeEnd: string;
    };
    profile: {
        lead: string;
        closing: string;
    };
    contactHeadline: {
        lead: string;
        highlight: string;
        tail: string;
    };
    footer: {
        start: string;
        end: string;
    };
    links: {
        email: string;
        emailHref: string;
        whatsappUrl: string;
        phoneNumber: string;
        phoneHref: string;
        resumeUrl: string;
    };
    seo: {
        title: string;
        description: string;
    };
    theme: {
        accentHue: number;
        defaultMode: ThemeMode;
    };
};

export type PageSection = {
    id: string;
    key: SectionKey;
    anchor: string;
    navLabel: string;
    heading: string;
    note: string | null;
    position: number;
    isVisible: boolean;
};

export type Stat = {
    id: string;
    label: string;
    value: string;
    isAccent: boolean;
    position: number;
    isVisible: boolean;
};

export type ProfileFact = {
    id: string;
    label: string;
    value: string;
    isAccent: boolean;
    position: number;
    isVisible: boolean;
};

export type CapabilityItem = {
    id: string;
    label: string;
    position: number;
    isVisible: boolean;
};

export type CapabilityGroup = {
    id: string;
    name: string;
    marker: AccentMarker;
    position: number;
    isVisible: boolean;
    items: CapabilityItem[];
};

export type ExperienceHighlight = {
    id: string;
    description: string;
    position: number;
    isVisible: boolean;
};

export type Experience = {
    id: string;
    periodLabel: string;
    role: string;
    company: string;
    isCurrent: boolean;
    isExpandedByDefault: boolean;
    position: number;
    isVisible: boolean;
    highlights: ExperienceHighlight[];
};

export type Work = {
    id: string;
    eyebrow: string;
    title: string;
    description: string;
    mediaLabel: string;
    imagePath: string | null;
    imageUrl: string | null;
    position: number;
    isVisible: boolean;
};

export type ContactTile = {
    id: string;
    channel: ContactChannel;
    channelLabel: string;
    isDownload: boolean;
    title: string;
    valueLabel: string;
    href: string;
    badgeLabel: string | null;
    position: number;
    isVisible: boolean;
};

export type PortfolioPageProps = {
    settings: SiteSettings;
    sections: PageSection[];
    stats: Stat[];
    profileFacts: ProfileFact[];
    capabilityGroups: CapabilityGroup[];
    experiences: Experience[];
    works: Work[];
    contactTiles: ContactTile[];
};

/** The raw column values the settings form edits. */
export type SiteSettingValues = {
    brand_label: string;
    availability_label: string;
    hero_eyebrow: string;
    hero_headline_lead: string;
    hero_headline_highlight: string;
    hero_summary: string;
    portrait_path: string;
    portrait_alt: string;
    portrait_badge_start: string;
    portrait_badge_end: string;
    profile_lead: string;
    profile_closing: string;
    contact_headline_lead: string;
    contact_headline_highlight: string;
    contact_headline_tail: string;
    footer_start: string;
    footer_end: string;
    email: string;
    whatsapp_url: string;
    phone_number: string;
    resume_path: string;
    meta_title: string;
    meta_description: string;
    accent_hue: number;
    default_theme: ThemeMode;
};
