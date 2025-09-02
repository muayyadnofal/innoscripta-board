import {useQuery} from "../../lib/query";
import {IssueModel} from "../models/Issue.model";
import {useCallback, useEffect} from "react";
import {useObjectSearchParams} from "../../hooks/useObjectSearchParam";
import {issuesService} from "../../data/api/IssueDataSource";

export function useGetAllIssuesWithSearchUrl() {
    const {getAll, getParams} = useObjectSearchParams();
    const assignees = getAll("assignee");
    const {search} = getParams();

    const fetchIssues = useCallback(
        () => issuesService.getAllIssues({assignees, search: search as string}),
        [assignees, search]
    );

    const query = useQuery<IssueModel[]>(
        "issues",
        fetchIssues,
        {
            delay: 500,
            refetchInterval: 10000,
            enabled: true,
        }
    );

    useEffect(() => {
        query.refetch().then();
    }, [assignees.join(","), search]);

    return query;
}
