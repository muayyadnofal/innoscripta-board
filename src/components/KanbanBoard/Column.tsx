import React from "react";
import {IssueModel} from "../../domain/models/Issue.model";
import {TaskCard} from "./TaskCard";
import "./board.css"

interface ColumnProps {
    status: string;
    issues: IssueModel[];
}

export const Column: React.FC<ColumnProps> = ({status, issues}) => {
    return (
        <div className="column">
            <div className="column__title">{status}</div>
            <div className="column__list">
                {issues.map(issue => (
                    <TaskCard key={issue.id} issue={issue}/>
                ))}
            </div>
        </div>
    );
};
