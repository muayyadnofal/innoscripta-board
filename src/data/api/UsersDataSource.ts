import {JsonServiceArray} from "../../lib/api-sdk/json.service";
import {UserEntity} from "./entities/user.entity";
import {UserModel} from "../../domain/models/User.model";
import {usersMapper} from "./mappers/user.mapper";

export class UserDataSource extends JsonServiceArray<UserEntity> {
    constructor(filePath: string) {
        super({filePath});
    }

    async getAllUsers(): Promise<UserModel[]> {
        const response = await this.getAll<UserModel>();
        return usersMapper(response)
    }
}

export const usersService = new UserDataSource("/users.json");
