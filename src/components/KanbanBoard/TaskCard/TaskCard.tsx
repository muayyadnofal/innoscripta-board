import {CSSProperties, forwardRef} from "react";
import {useDraggable} from "@dnd-kit/core";
import classNames from "classnames";
import {IssueModel} from "../../../domain/models/Issue.model";
import {CardHeader} from "./Card/CardHeader";
import {CardMeta} from "./Card/CardMeta";
import {CardTags} from "./Card/CardTags";
import {CardFooter} from "./Card/CardFooter";

interface TaskCardProps {
    issue: IssueModel;
    dragEnabled?: boolean;
}

export const TaskCard = forwardRef<HTMLDivElement, TaskCardProps>((props, ref) => {
        const {issue, dragEnabled = true} = props;

        const {attributes, listeners, setNodeRef, transform, isDragging} = useDraggable({
            id: issue.id,
            data: {status: issue.status},
            disabled: !dragEnabled,
        });

        const combinedRef = (node: HTMLDivElement | null) => {
            setNodeRef(node);
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
        };

        const style: CSSProperties = {
            transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
            opacity: isDragging ? 0.6 : 1,
        };

        return (
            <div ref={combinedRef} style={style}{...attributes} data-id={issue.id} {...listeners}
                 className={classNames("card", {"card--dragging": isDragging})}>
                <CardHeader issueId={issue.id} title={issue.title} priority={issue.priority}/>
                <CardMeta severity={issue.severity} createdAt={issue.createdAt}/>
                <CardTags tags={issue.tags}/>
                <CardFooter assignee={issue.assignee}/>
            </div>

        );
    }
);
