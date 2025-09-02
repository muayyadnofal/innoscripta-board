import React from 'react';
import {FilterPanel} from "../components/Filters/FilterPanel";
import {Board} from "../components/KanbanBoard/Board";
import {useGetAllIssuesWithSearchUrl} from "../domain/useCases/useGetAllIssuesWithSearchUrl";
import {IssueStatus} from "../types";
import {LastUpdatedIndicator} from "../components/LastUpdatedIndicator/LastUpdatedIndicator";
import {useUpdateIssue} from "../domain/useCases/useUpdateIssue";
import {IssueModel} from "../domain/models/Issue.model";

const statuses: IssueStatus[] = ["Backlog", "In Progress", "Done"];

export const BoardPage = () => {
    const {data: issues, isLoading, isFetching, lastUpdated} = useGetAllIssuesWithSearchUrl();
    const {updateIssue} = useUpdateIssue();
    const showLoadingSkeletons = isLoading && (!issues || issues.length === 0);

    const handleIssueMove = async (issue: IssueModel, toStatus: IssueStatus) => {
        await updateIssue(issue.id, {status: toStatus});
    };

    return (
        <div style={{padding: '1rem'}}>
            <div style={{display: "flex", flexDirection: "column", gap: "2rem"}}>
                <div style={{display: "flex", justifyContent: "space-between", gap: "2rem"}}>
                    <FilterPanel/>
                    <LastUpdatedIndicator lastUpdated={lastUpdated} isFetching={isFetching} variant="detailed" size="md"
                                          format="time" showLivePulse/>
                </div>

                <Board issues={issues || []} statuses={statuses} loading={showLoadingSkeletons}
                       onIssueMove={handleIssueMove}/>
            </div>
        </div>
    );
};