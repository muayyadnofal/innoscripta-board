import React from "react";
import {IssueModel} from "../../domain/models/Issue.model";
import "./board.css"

interface TaskCardProps {
    issue: IssueModel;
}

export const TaskCard: React.FC<TaskCardProps> = ({issue}) => {
    return (
        <div className='card'>
            <div className='card__title'>{issue.title}</div>
        </div>
    );
};