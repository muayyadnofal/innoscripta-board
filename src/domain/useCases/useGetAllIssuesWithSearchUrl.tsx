import {useQuery} from "../../lib/query";
import {IssueModel} from "../models/Issue.model";
import {issuesService} from "../../data/api/IssueDataSource";
import {useObjectSearchParams} from "../../hooks/useObjectSearchParam";
import {useEffect} from "react";

export function useGetAllIssuesWithSearchUrl() {
    const {getAll, getParams} = useObjectSearchParams();
    const assignees = getAll("assignee");
    const {search} = getParams();

    const query = useQuery<IssueModel[]>(
        "issues",
        () => issuesService.getAllIssues({assignees, search: search as string}),
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
