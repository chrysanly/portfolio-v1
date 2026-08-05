import type { SiteSettings } from '@/types/portfolio';

type Props = {
    footer: SiteSettings['footer'];
};

export function PortfolioFooter({ footer }: Props) {
    return (
        <footer className="pf-footer">
            <span>{footer.start}</span>
            <span>{footer.end}</span>
        </footer>
    );
}
