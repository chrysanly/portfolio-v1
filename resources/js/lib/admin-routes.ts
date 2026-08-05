/**
 * Every admin URL in one place.
 *
 * Wayfinder generates typed helpers at build time; until they exist for these
 * routes this module is the single source of truth, so a renamed route is a
 * one-line change (DRY, RULES §3).
 */
export const adminRoutes = {
    login: '/admin/login',
    logout: '/admin/logout',
    dashboard: '/admin',

    settings: '/admin/settings',

    sections: '/admin/sections',
    section: (sectionId: string) => `/admin/sections/${sectionId}`,

    stats: '/admin/stats',
    stat: (statId: string) => `/admin/stats/${statId}`,

    profileFacts: '/admin/profile-facts',
    profileFact: (factId: string) => `/admin/profile-facts/${factId}`,

    capabilityGroups: '/admin/capability-groups',
    capabilityGroup: (groupId: string) => `/admin/capability-groups/${groupId}`,
    capabilityItems: (groupId: string) =>
        `/admin/capability-groups/${groupId}/items`,
    capabilityItem: (groupId: string, itemId: string) =>
        `/admin/capability-groups/${groupId}/items/${itemId}`,

    experiences: '/admin/experiences',
    experience: (experienceId: string) => `/admin/experiences/${experienceId}`,
    highlights: (experienceId: string) =>
        `/admin/experiences/${experienceId}/highlights`,
    highlight: (experienceId: string, highlightId: string) =>
        `/admin/experiences/${experienceId}/highlights/${highlightId}`,

    works: '/admin/works',
    work: (workId: string) => `/admin/works/${workId}`,

    contactTiles: '/admin/contact-tiles',
    contactTile: (tileId: string) => `/admin/contact-tiles/${tileId}`,
} as const;
