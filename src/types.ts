export type IssueStatus = 'Backlog' | 'In Progress' | 'Done';
export type IssuePriority = 'low' | 'medium' | 'high';

export type Size = "lg" | "md" | "sm";

export type UserRole = 'contributor' | 'admin';

export interface SearchParams {
    [key: string]: unknown | string | undefined;
}
