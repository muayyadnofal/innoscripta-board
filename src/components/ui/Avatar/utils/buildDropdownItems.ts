import {AvatarProps} from "../Avatar";
import {DropdownItemConfig} from "../../Dropdown";

export function buildDropdownItems(hidden: (AvatarProps & {
    id: string;
    label?: string
})[], selected: string[], selectable: boolean): DropdownItemConfig[] {
    return hidden.map((avatar) => ({
        id: avatar.id,
        label: avatar.label ?? avatar.alt ?? "User",
        avatar: {...avatar, size: "sm", selected: selected.includes(avatar.id)},
        selectable,
        selected: selected.includes(avatar.id),
        closeOnSelect: !selectable,
    }));
}