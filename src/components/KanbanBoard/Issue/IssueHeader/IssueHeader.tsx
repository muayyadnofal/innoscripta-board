import React from 'react';
import './IssueHeader.css';
import {Button} from "../../../ui/Button";
import {StatusBadge} from "../StatusBadge/StatusBadge";
import {PriorityBadge} from "../../TaskCard/PriorityBadge/PriorityBadge";
import {IssueModel} from "../../../../domain/models/Issue.model";

interface IssueHeaderProps {
    issue: IssueModel;
    onBack: () => void;
}

export const IssueHeader: React.FC<IssueHeaderProps> = ({issue, onBack}) => {
    return (
        <div className="issue-header">
            <Button
                variant="text"
                onClick={onBack}
                icon="←"
                iconPosition="start"
                className="back-button"
            >
                Back to Board
            </Button>
            <h1 className="issue-title">{issue.title}</h1>
            <div className="issue-meta">
                <span className="issue-id">#{issue.id}</span>
                <StatusBadge status={issue.status}/>
                <PriorityBadge priority={issue.priority}/>
            </div>
        </div>
    );
};