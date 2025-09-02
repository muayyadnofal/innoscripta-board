import {useAccountStore} from "../stores/useAccountStore";
import {Permission, permissionsConfig} from "./permissions";

export const useCan = () => {
    const {selectedUser} = useAccountStore();
    const role = selectedUser.role as keyof typeof permissionsConfig;

    const can = (permission: Permission) => {
        return permissionsConfig[role]?.includes(permission);
    };

    return {can};
};
