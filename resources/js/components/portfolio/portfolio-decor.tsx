/**
 * The four page-wide background layers. Purely decorative: no text, no events,
 * hidden from assistive technology.
 */
export function PortfolioDecor() {
    return (
        <div aria-hidden="true">
            <div className="pf-deco pf-deco--aurora" data-pf-sdepth="0.03" />
            <div className="pf-deco pf-deco--one" data-pf-sdepth="0.06" />
            <div className="pf-deco pf-deco--two" data-pf-sdepth="0.08" />
            <div className="pf-deco pf-deco--three" data-pf-sdepth="0.04" />
        </div>
    );
}
