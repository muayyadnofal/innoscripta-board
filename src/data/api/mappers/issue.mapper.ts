import {IssueEntity} from "../entities/issue.entity";
import {IssueModel} from "../../../domain/models/Issue.model";
import {generateAvatarUrl} from "../../../utils/avatar";

export const issuesMapper = (issues: IssueEntity[]): IssueModel[] => {
    return issues.map(issue => issueMapper(issue));
}

export const issueMapper = (issue: IssueEntity): IssueModel => {
    return {
        ...issue,
        assignee: {
            role: "contributor",
            name: issue.assignee,
            url: generateAvatarUrl(),
        },
    };
};
