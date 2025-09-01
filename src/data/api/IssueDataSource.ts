import {IssueEntity} from "./entities/issue.entity";
import {JsonServiceArray} from "../../lib/api-sdk/json.service";
import {IssueModel} from "../../domain/models/Issue.model";
import {issuesMapper} from "./mappers/issue.mapper";

export class IssueDataSource extends JsonServiceArray<IssueEntity> {
    constructor(filePath: string) {
        super({filePath});
    }

    updateById(id: string, partial: Partial<IssueEntity>) {
        return this.update(i => i.id === id, i => ({...i, ...partial}));
    }

    deleteById(id: string) {
        return this.delete(i => i.id === id);
    }

    async getAllIssues(): Promise<IssueModel[]> {
        const response = await this.getAll<IssueEntity>();
        return issuesMapper(response)
    }
}

export const issuesService = new IssueDataSource("/issues.json");
