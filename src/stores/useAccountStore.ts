import {create} from "zustand";
import {persist} from "zustand/middleware";

interface User {
    name: string;
    role: string;
}

interface AccountStore {
    selectedUser: User;
    setSelectedUser: (user: User) => void;
}

export const useAccountStore = create<AccountStore>()(
    persist(
        (set) => ({
            selectedUser: {name: "Johnson", role: "admin"},
            setSelectedUser: (user) => set({selectedUser: user}),
        }),
        {name: "selected-account"}
    )
);
