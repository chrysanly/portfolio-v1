import type { Ref } from 'react';
import { useBootIn } from '@/hooks/use-boot-in';
import type { PageSection, SiteSettings } from '@/types/portfolio';

type Props = {
    section: PageSection;
    settings: SiteSettings;
    /** Lets the page attach the pointer-parallax listener to this section. */
    sectionRef?: Ref<HTMLElement>;
};

export function HeroSection({ section, settings, sectionRef }: Props) {
    const shown = useBootIn();
    const { hero, portrait, links } = settings;

    return (
        <section id={section.anchor} className="pf-hero" ref={sectionRef}>
            <svg
                className="pf-hero__veins"
                data-pf-depth="1"
                viewBox="0 0 900 500"
                preserveAspectRatio="none"
                aria-hidden="true"
            >
                <path
                    d="M0 440 C 120 380, 100 300, 220 260 C 300 232, 300 160, 400 120 C 460 96, 470 40, 560 10"
                    fill="none"
                    stroke="var(--pf-acc)"
                    strokeWidth="1.4"
                    opacity="0.5"
                />
                <path
                    d="M60 500 C 160 420, 150 340, 260 300 C 340 270, 340 200, 430 160"
                    fill="none"
                    stroke="var(--pf-acc2)"
                    strokeWidth="1"
                    opacity="0.35"
                />
                <circle cx="220" cy="260" r="2.6" fill="var(--pf-acc)" />
                <circle cx="400" cy="120" r="2.6" fill="var(--pf-acc)" />
                <circle cx="260" cy="300" r="2" fill="var(--pf-acc2)" />
                <ellipse
                    cx="760"
                    cy="470"
                    rx="220"
                    ry="55"
                    fill="none"
                    stroke="var(--pf-mid)"
                    strokeWidth="0.8"
                    opacity="0.4"
                />
                <ellipse
                    cx="760"
                    cy="470"
                    rx="160"
                    ry="40"
                    fill="none"
                    stroke="var(--pf-mid)"
                    strokeWidth="0.8"
                    opacity="0.3"
                />
            </svg>

            <span className="pf-spark pf-spark--one" data-pf-depth="3" aria-hidden="true" />
            <span className="pf-spark pf-spark--two" data-pf-depth="3" aria-hidden="true" />

            <div className="pf-hero__body">
                <div
                    className="pf-hero__eyebrow pf-boot pf-boot--1"
                    data-shown={shown}
                >
                    {hero.eyebrow}
                </div>

                <h1 className="pf-hero__headline pf-boot pf-boot--2" data-shown={shown}>
                    {hero.headlineLead}{' '}
                    <span className="pf-gradient-text">{hero.headlineHighlight}</span>
                </h1>

                <p className="pf-hero__summary pf-boot pf-boot--3" data-shown={shown}>
                    {hero.summary}
                </p>

                <div className="pf-hero__actions pf-boot pf-boot--4" data-shown={shown}>
                    <a className="pf-button pf-button--primary" href={links.emailHref}>
                        Email me
                    </a>
                    <a
                        className="pf-button pf-button--outline"
                        href={links.resumeUrl}
                        download
                    >
                        Download résumé
                    </a>
                    <a
                        className="pf-button pf-button--ghost"
                        href={links.whatsappUrl}
                        rel="noreferrer noopener"
                        target="_blank"
                    >
                        WhatsApp
                    </a>
                </div>
            </div>

            <div className="pf-portrait" data-pf-depth="2" data-pf-reveal>
                <div className="pf-portrait__frame">
                    <img
                        className="pf-portrait__image"
                        src={portrait.src}
                        alt={portrait.alt}
                        width={800}
                        height={1000}
                    />
                    <span className="pf-portrait__blend" aria-hidden="true" />
                    <span className="pf-portrait__scrim" aria-hidden="true" />
                    <span className="pf-portrait__corner pf-portrait__corner--tl" aria-hidden="true" />
                    <span className="pf-portrait__corner pf-portrait__corner--tr" aria-hidden="true" />
                    <span className="pf-portrait__corner pf-portrait__corner--bl" aria-hidden="true" />
                    <span className="pf-portrait__corner pf-portrait__corner--br" aria-hidden="true" />
                    <div className="pf-portrait__badges">
                        <span>{portrait.badgeStart}</span>
                        <span>{portrait.badgeEnd}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
