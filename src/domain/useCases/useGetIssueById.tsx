import {useQuery} from "../../lib/query";
import {IssueModel} from "../models/Issue.model";
import {issuesService} from "../../data/api/IssueDataSource";
import {useRecentIssuesStore} from "../../stores/useRecentIssuesStore";

export function useGetIssueById(id: string | undefined) {
    const addIssue = useRecentIssuesStore(state => state.addIssue);

    return useQuery<IssueModel | null>(
        `issue-${id}`,
        async () => {
            if (!id) return Promise.resolve(null);
            const issue = await issuesService.getIssueById(id);
            if (issue) addIssue(issue);
            return issue;
        },
        {
            enabled: !!id,
            delay: 1000,
        }
    );
}
