import React from 'react';
import './StatusBadge.css';
import {IssueStatus} from "../../../../types";

interface StatusBadgeProps {
    status: IssueStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({status}) => {
    const statusClasses = {
        'Backlog': "status-badge status-badge--backlog",
        'In Progress': "status-badge status-badge--in-progress",
        'Done': "status-badge status-badge--done"
    };

    return (
        <span className={statusClasses[status]}>
            {status}
        </span>
    );
};