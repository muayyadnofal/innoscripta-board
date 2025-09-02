import React from "react";
import {toast} from "react-toastify";
import {useAccountStore} from "../../../stores/useAccountStore";
import {Dropdown, DropdownItemConfig} from "../../ui/Dropdown";
import {Tag} from "../../ui/Tag/Tag";
import {Button} from "../../ui/Button";
import {SwitchIcon} from "../../icons";

const users = [
    {name: "Johnson", role: "admin"},
    {name: "Smith", role: "contributor"},
];

export const SwitchAccountDropdown = () => {
    const {setSelectedUser} = useAccountStore();

    const items: DropdownItemConfig[] = users.map((user) => ({
        id: user.name,
        render: () => (
            <div style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                <span>{user.name}</span>
                <Tag variant={user.role === "admin" ? "info" : "default"}>
                    {user.role}
                </Tag>
            </div>
        ),
        closeOnSelect: true,
    }));

    const handleSelect = (id: string | number) => {
        const user = users.find(u => u.name === id);
        if (user) {
            setSelectedUser(user);
            toast.info(`Switched to user: ${user.name} (${user.role})`, {position: "bottom-right"});
        }
    };

    return (
        <Dropdown
            trigger={<Button icon={<SwitchIcon/>} variant="text"/>}
            items={items}
            onSelect={handleSelect}
        />
    );
};
