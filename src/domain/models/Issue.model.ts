import {IssueEntity} from "../../data/api/entities/issue.entity";
import {UserModel} from "./User.model";

export interface IssueModel extends Omit<IssueEntity, 'assignee'> {
    assignee: UserModel;
}