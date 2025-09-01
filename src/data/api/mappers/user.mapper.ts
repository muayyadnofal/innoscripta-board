import {UserEntity} from "../entities/user.entity";
import {UserModel} from "../../../domain/models/User.model";
import {generateAvatarUrl} from "../../../utils/avatar";

export const usersMapper = (users: UserEntity[]): UserModel[] => {
    return users.map(user => userMapper(user));
}

export const userMapper = (user: UserEntity): UserModel => {
    return {
        ...user,
        url: generateAvatarUrl(),
    };
};
