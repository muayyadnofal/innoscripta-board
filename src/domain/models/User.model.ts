import {UserEntity} from "../../data/api/entities/user.entity";

export interface UserModel extends UserEntity {
    url: string;
}