import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useGetIssueById} from "../domain/useCases/useGetIssueById";
import {LoadingState} from "../components/KanbanBoard/Issue/LoadingState/LoadingState";
import {IssueHeader} from "../components/KanbanBoard/Issue/IssueHeader/IssueHeader";
import {DescriptionSection} from "../components/KanbanBoard/Issue/DescriptionSection/DescriptionSection";
import {ActivitySection} from "../components/KanbanBoard/Issue/ActivitySection/ActivitySection";
import {DetailsSection} from "../components/KanbanBoard/Issue/DetailsSection/DetailsSection";
import {TagsSection} from "../components/KanbanBoard/Issue/TagsSection/TagsSection";
import {ActionsSection} from "../components/KanbanBoard/Issue/ActionsSection/ActionsSection";
import "./IssueDetailPage.css"

export const IssueDetailPage = () => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const {data: issue, isLoading, refetch} = useGetIssueById(id);

    const handleStatusUpdate = () => {
        refetch().then();
    };

    if (isLoading || !issue) {
        return (
            <div className="issue-detail-page">
                <LoadingState/>
            </div>
        );
    }

    return (
        <div className="issue-detail-page">
            <IssueHeader issue={issue} onBack={() => navigate('/board')}/>

            <div className="issue-detail-content">
                <div className="issue-main">
                    <DescriptionSection/>
                    <ActivitySection issue={issue}/>
                </div>

                <div className="issue-sidebar">
                    <DetailsSection issue={issue}/>
                    <TagsSection tags={issue.tags}/>
                    <ActionsSection
                        issueId={issue.id}
                        currentStatus={issue.status}
                        onStatusUpdate={handleStatusUpdate}
                        onUndo={handleStatusUpdate}
                    />
                </div>
            </div>
        </div>
    );
};