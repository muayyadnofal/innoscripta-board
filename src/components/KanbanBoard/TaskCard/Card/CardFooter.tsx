import "./card.css"

interface CardFooterProps {
    assignee: { name: string };
}

export const CardFooter = (props: CardFooterProps) => {
    const {assignee} = props;

    return (
        <div className="card__footer">
            <span className="assignee">@{assignee.name}</span>
        </div>
    );
}