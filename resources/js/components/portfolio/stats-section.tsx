import type { Stat } from '@/types/portfolio';

type Props = {
    stats: Stat[];
};

export function StatsSection({ stats }: Props) {
    if (stats.length === 0) {
        return null;
    }

    return (
        <section className="pf-stats">
            <div className="pf-stats__grid">
                {stats.map((stat) => (
                    <div key={stat.id} className="pf-stat" data-pf-reveal>
                        <div className="pf-stat__label">{stat.label}</div>
                        <div
                            className={
                                stat.isAccent
                                    ? 'pf-stat__value pf-stat__value--accent'
                                    : 'pf-stat__value'
                            }
                        >
                            {stat.value}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
