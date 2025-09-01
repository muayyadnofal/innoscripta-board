import {usersService} from "../../data/api/UsersDataSource";
import {UserModel} from "../models/User.model";
import {useQuery} from "../../lib/query";

export function useGetAllUsers() {
    return useQuery<UserModel[]>("users", () => usersService.getAllUsers());
}
