import React from 'react';
import './ActivitySection.css';
import {IssueModel} from "../../../../domain/models/Issue.model";
import {Avatar} from "../../../ui/Avatar/Avatar";

interface ActivitySectionProps {
    issue: IssueModel;
}

export const ActivitySection: React.FC<ActivitySectionProps> = ({issue}) => {
    return (
        <section className="activity-section">
            <h3>Activity</h3>
            <div className="issue-activity">
                <div className="activity-item">
                    <Avatar
                        src={issue.assignee.url}
                        alt={issue.assignee.name}
                        size="lg"
                    />
                    <div className="activity-content">
                        <p><strong>{issue.assignee.name}</strong> created this issue</p>
                        <span className="activity-time">{new Date(issue.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        </section>
    );
};