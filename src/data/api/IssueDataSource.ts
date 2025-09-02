import {IssueEntity} from "./entities/issue.entity";
import {JsonServiceArray} from "../../lib/api-sdk/json.service";
import {IssueModel} from "../../domain/models/Issue.model";
import {issuesMapper} from "./mappers/issue.mapper";

export class IssueDataSource extends JsonServiceArray<IssueEntity> {
    constructor(filePath: string) {
        super({filePath, persistToStorage: true, storageKey: "issues"});
    }


    async getAllIssues(filters?: { assignees?: string[]; search?: string; limit?: number }): Promise<IssueModel[]> {
        const {assignees, search, limit} = filters || {};
        const response = await this.getAll<IssueEntity>(issue =>
            (!assignees?.length || assignees.includes(issue.assignee)) &&
            (!search ||
                issue.title.toLowerCase().includes(search.toLowerCase()) ||
                issue.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
            )
        );

        const mapped = issuesMapper(response);
        return limit ? mapped.slice(0, limit) : mapped;
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
