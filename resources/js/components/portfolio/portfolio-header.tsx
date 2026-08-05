import { useClock } from '@/hooks/use-clock';
import type { ThemeMode } from '@/types/portfolio';

const ICONS: Record<ThemeMode, string> = {
    system: '◐',
    light: '☀',
    dark: '☾',
};

type Props = {
    brandLabel: string;
    availabilityLabel: string;
    themeMode: ThemeMode;
    onCycleTheme: () => void;
};

export function PortfolioHeader({
    brandLabel,
    availabilityLabel,
    themeMode,
    onCycleTheme,
}: Props) {
    const time = useClock();

    return (
        <header className="pf-header">
            <div className="pf-brand">
                <span className="pf-brand__pulse" aria-hidden="true" />
                <span className="pf-brand__label">{brandLabel}</span>
            </div>

            <div className="pf-status">
                <span aria-label="Local time in Dubai">{time}</span>
                <span className="pf-status__available">{availabilityLabel}</span>

                <button
                    type="button"
                    className="pf-theme-toggle"
                    onClick={onCycleTheme}
                    aria-label={`Colour theme: ${themeMode}. Switch theme.`}
                >
                    <span aria-hidden="true">{ICONS[themeMode]}</span>
                    <span>{themeMode.toUpperCase()}</span>
                </button>
            </div>
        </header>
    );
}
