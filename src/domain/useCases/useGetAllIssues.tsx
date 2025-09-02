import {useQuery} from "../../lib/query";
import {IssueModel} from "../models/Issue.model";
import {issuesService} from "../../data/api/IssueDataSource";

export function useGetAllIssues() {
    return useQuery<IssueModel[]>("issues", () => issuesService.getAllIssues(), {
        delay: 500,
        refetchInterval: 10000,
        enabled: true
    });
}