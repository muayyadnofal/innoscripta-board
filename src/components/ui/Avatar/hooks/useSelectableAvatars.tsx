import {AvatarGroupProps} from "../AvatarGroup";
import {useState} from "react";

interface UseSelectableAvatarsProps extends Pick<AvatarGroupProps, "value" | "defaultValue" | "onSelectChange"> {
}

export const useSelectableAvatars = (props: UseSelectableAvatarsProps) => {
    const {value, defaultValue = [], onSelectChange} = props;
    const [internal, setInternal] = useState<string[]>(defaultValue);
    console.log(value)
    const selected = value ?? internal;

    const updateSelection = (next: string[]) => {
        if (value === undefined) setInternal(next);
        onSelectChange?.(next);
    }

    const toggleSelect = (id: string) => {
        const next = selected.includes(id) ? selected.filter((item) => item !== id) : [...selected, id];
        updateSelection(next);
    }

    return {selected, toggleSelect};
}