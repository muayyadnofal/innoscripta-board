import {useQuery} from "../../lib/query";
import {IssueModel} from "../models/Issue.model";
import {issuesService} from "../../data/api/IssueDataSource";

export function useGetAllIssues() {
    return useQuery<IssueModel[]>("issues", () => issuesService.getAllIssues(),);
}
