import {useCallback, useMemo} from "react";
import {IssueStatus} from "../../../types";
import {IssueModel} from "../../../domain/models/Issue.model";

type BoardData = Record<IssueStatus, IssueModel[]>;

export const useBoardState = (issues: IssueModel[], statuses: IssueStatus[], onIssueMove?: (issue: IssueModel, toStatus: IssueStatus) => void) => {
    const boardData: BoardData = useMemo(() => {
        return statuses.reduce<BoardData>((acc, status) => {
            acc[status] = issues.filter(i => i.status === status);
            return acc;
        }, {} as BoardData);
    }, [issues, statuses]);

    const moveIssue = useCallback(
        (id: string, from: IssueStatus, to: IssueStatus) => {
            const issue = boardData[from].find(i => i.id === id);
            if (!issue) return;

            const updatedIssue = {...issue, status: to};
            onIssueMove?.(updatedIssue, to);
        },
        [boardData, onIssueMove]
    );

    return {boardData, moveIssue};
};
