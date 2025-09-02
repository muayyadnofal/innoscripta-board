import {useQuery} from "../../lib/query";
import {IssueModel} from "../models/Issue.model";
import {issuesService} from "../../data/api/IssueDataSource";

export function useGetIssueById(id: string | undefined) {
    return useQuery<IssueModel | null>(`issue-${id}`,
        () => {
            if (!id) return Promise.resolve(null);
            return issuesService.getIssueById(id);
        },
        {
            enabled: !!id,
            delay: 1000,
        }
    );
}