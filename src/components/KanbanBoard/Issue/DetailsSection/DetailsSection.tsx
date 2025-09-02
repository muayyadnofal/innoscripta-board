import React from 'react';
import './DetailsSection.css';
import {IssueModel} from "../../../../domain/models/Issue.model";
import {Avatar} from "../../../ui/Avatar/Avatar";
import {PriorityBadge} from "../../TaskCard/PriorityBadge/PriorityBadge";

interface DetailsSectionProps {
    issue: IssueModel;
}

export const DetailsSection: React.FC<DetailsSectionProps> = ({issue}) => {
    return (
        <section className="details-section">
            <h4>Details</h4>
            <div className="detail-item">
                <span className="detail-label">Assignee</span>
                <div className="detail-value">
                    <Avatar
                        src={issue.assignee.url}
                        alt={issue.assignee.name}
                        size="sm"
                    />
                    <span>{issue.assignee.name}</span>
                </div>
            </div>
            <div className="detail-item">
                <span className="detail-label">Created</span>
                <span className="detail-value">{new Date(issue.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="detail-item">
                <span className="detail-label">Priority</span>
                <span className="detail-value">
          <PriorityBadge priority={issue.priority}/>
        </span>
            </div>
            <div className="detail-item">
                <span className="detail-label">Severity</span>
                <span className="detail-value">Level {issue.severity}</span>
            </div>
        </section>
    );
};