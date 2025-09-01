import {IssuePriority, IssueStatus} from "../../../types";

export interface IssueEntity {
    id: string;
    title: string;
    status: IssueStatus;
    priority: IssuePriority;
    severity: number;
    createdAt: string;
    assignee: string;
    tags: string[];
}