import React from "react";
import classNames from "classnames";
import {IssuePriority} from "../../../../types";
import "./priority-badge.css"

interface PriorityBadgeProps {
    priority: IssuePriority;
}

export const PriorityBadge = (props: PriorityBadgeProps) => {
    const {priority} = props;

    return (
        <span className={classNames("priority", `priority--${priority}`)}>{priority}</span>
    );
};
