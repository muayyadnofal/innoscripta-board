import {IssueEntity} from "./entities/issue.entity";
import {JsonServiceArray} from "../../lib/api-sdk/json.service";
import {IssueModel} from "../../domain/models/Issue.model";
import {issuesMapper} from "./mappers/issue.mapper";

export class IssueDataSource extends JsonServiceArray<IssueEntity> {
    constructor(filePath: string) {
        super({filePath, persistToStorage: true, storageKey: "issues"});
    }

    async getAllIssues(): Promise<IssueModel[]> {
        const response = await this.getAll<IssueEntity>();
        return issuesMapper(response)
    }

    async getIssueById(id: string): Promise<IssueModel | null> {
        const response = await this.getAll<IssueEntity>(issue => issue.id === id);
        return response.length > 0 ? issuesMapper([response[0]])[0] : null;
    }

    async updateById(id: string, partial: Partial<IssueEntity>): Promise<IssueModel> {
        const updatedEntity = await this.update(i => i.id === id, i => ({...i, ...partial}));
        if (!updatedEntity) throw new Error(`Issue with id ${id} not found`);
        return issuesMapper([updatedEntity])[0];
    }
}

export const issuesService = new IssueDataSource("/issues.json");
