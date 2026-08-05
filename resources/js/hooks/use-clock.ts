import { useEffect, useState } from 'react';

/**
 * The 24-hour clock in the page header. Renders a placeholder until mounted so
 * the server and client markup agree.
 */
export function useClock(): string {
    const [time, setTime] = useState('--:--:--');

    useEffect(() => {
        const tick = () =>
            setTime(new Date().toLocaleTimeString('en-GB', { hour12: false }));

        tick();

        const timer = window.setInterval(tick, 1000);

        return () => window.clearInterval(timer);
    }, []);

    return time;
}
