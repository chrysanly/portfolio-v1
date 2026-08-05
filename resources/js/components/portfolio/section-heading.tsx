type Props = {
    title: string;
    note?: string | null;
};

export function SectionHeading({ title, note }: Props) {
    return (
        <div className="pf-heading">
            <span className="pf-heading__rule" aria-hidden="true" />
            <h2 className="pf-heading__title">{title}</h2>
            {note ? <span className="pf-heading__note">{note}</span> : null}
        </div>
    );
}
