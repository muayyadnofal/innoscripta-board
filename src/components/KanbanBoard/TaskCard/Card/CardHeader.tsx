import {Link} from "react-router-dom";
import {PriorityBadge} from "../PriorityBadge/PriorityBadge";
import "./card.css";
import {IssuePriority} from "../../../../types";

interface CardHeaderProps {
    title: string;
    priority: IssuePriority;
    issueId: string;
}

export const CardHeader = ({title, priority, issueId}: CardHeaderProps) => {
    return (
        <div className="card__header">
            <Link
                to={`/issue/${issueId}`}
                className="card__title"
                onClick={(e) => e.stopPropagation()}
            >
                {title}
            </Link>
            <PriorityBadge priority={priority}/>
        </div>
    );
};
