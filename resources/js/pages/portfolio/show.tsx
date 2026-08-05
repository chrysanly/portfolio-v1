import { Head } from '@inertiajs/react';
import { useRef } from 'react';
import { AccentTweaks } from '@/components/portfolio/accent-tweaks';
import { CapabilitiesSection } from '@/components/portfolio/capabilities-section';
import { ContactSection } from '@/components/portfolio/contact-section';
import { ExperienceSection } from '@/components/portfolio/experience-section';
import { HeroSection } from '@/components/portfolio/hero-section';
import { PortfolioDecor } from '@/components/portfolio/portfolio-decor';
import { PortfolioFooter } from '@/components/portfolio/portfolio-footer';
import { PortfolioHeader } from '@/components/portfolio/portfolio-header';
import { PortfolioNav } from '@/components/portfolio/portfolio-nav';
import { PortfolioSplash } from '@/components/portfolio/portfolio-splash';
import { ProfileSection } from '@/components/portfolio/profile-section';
import { StatsSection } from '@/components/portfolio/stats-section';
import { WorkSection } from '@/components/portfolio/work-section';
import { useAccentHue } from '@/hooks/use-accent-hue';
import { useActiveSection } from '@/hooks/use-active-section';
import { usePointerParallax } from '@/hooks/use-pointer-parallax';
import { usePortfolioTheme } from '@/hooks/use-portfolio-theme';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { useScrollParallax } from '@/hooks/use-scroll-parallax';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { findSection } from '@/lib/portfolio';
import type { PortfolioPageProps } from '@/types/portfolio';

/**
 * The public portfolio. Presentational only: every string arrives as a prop from
 * PortfolioContentService (ARCHITECTURE §8).
 */
export default function PortfolioShow({
    settings,
    sections,
    stats,
    profileFacts,
    capabilityGroups,
    experiences,
    works,
    contactTiles,
}: PortfolioPageProps) {
    const rootRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLElement>(null);

    const reducedMotion = useReducedMotion();
    const { mode, cycle } = usePortfolioTheme(settings.theme.defaultMode);
    const { hue, setHue } = useAccentHue(settings.theme.accentHue);
    const activeAnchor = useActiveSection(
        sections.map((section) => section.anchor),
    );

    useScrollReveal(rootRef, reducedMotion);
    useScrollParallax(rootRef, reducedMotion);
    usePointerParallax(heroRef, reducedMotion);

    /*
     * Read out the page's real inventory, not invented copy: every figure below
     * comes from the same props the sections render, so the boot screen can
     * never drift from what actually loaded.
     */
    const splashLines = [
        { label: 'profile', value: 'mounted' },
        {
            label: 'capabilities',
            value: `${capabilityGroups.reduce(
                (total, group) => total + group.items.length,
                0,
            )} tags`,
        },
        {
            label: 'experience',
            value: `${experiences.reduce(
                (total, entry) => total + entry.highlights.length,
                0,
            )} records`,
        },
        { label: 'selected work', value: `${works.length} projects` },
        { label: 'accent hue', value: `${hue}°` },
    ];

    const hero = findSection(sections, 'hero');
    const profile = findSection(sections, 'profile');
    const capabilities = findSection(sections, 'capabilities');
    const experience = findSection(sections, 'experience');
    const work = findSection(sections, 'work');
    const contact = findSection(sections, 'contact');

    return (
        <>
            <Head title={settings.seo.title}>
                <meta name="description" content={settings.seo.description} />
                <meta property="og:title" content={settings.seo.title} />
                <meta
                    property="og:description"
                    content={settings.seo.description}
                />
                <meta property="og:type" content="profile" />
            </Head>

            <PortfolioSplash
                brandLabel={settings.brandLabel}
                lines={splashLines}
                reducedMotion={reducedMotion}
            />

            <div className="pf-root" ref={rootRef}>
                <PortfolioDecor />

                <PortfolioHeader
                    brandLabel={settings.brandLabel}
                    availabilityLabel={settings.availabilityLabel}
                    themeMode={mode}
                    onCycleTheme={cycle}
                />

                <PortfolioNav sections={sections} activeAnchor={activeAnchor} />

                <main className="pf-main">
                    {hero ? (
                        <HeroSection
                            section={hero}
                            settings={settings}
                            sectionRef={heroRef}
                        />
                    ) : null}

                    <StatsSection stats={stats} />

                    {profile ? (
                        <ProfileSection
                            section={profile}
                            profile={settings.profile}
                            facts={profileFacts}
                        />
                    ) : null}

                    {capabilities ? (
                        <CapabilitiesSection
                            section={capabilities}
                            groups={capabilityGroups}
                        />
                    ) : null}

                    {experience ? (
                        <ExperienceSection
                            section={experience}
                            experiences={experiences}
                        />
                    ) : null}

                    {work ? <WorkSection section={work} works={works} /> : null}

                    {contact ? (
                        <ContactSection
                            section={contact}
                            headline={settings.contactHeadline}
                            tiles={contactTiles}
                        />
                    ) : null}

                    <PortfolioFooter footer={settings.footer} />
                </main>

                <AccentTweaks hue={hue} onHueChange={setHue} />
            </div>
        </>
    );
}
