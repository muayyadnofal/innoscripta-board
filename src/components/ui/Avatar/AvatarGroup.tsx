import classNames from "classnames";
import {Avatar, AvatarProps} from "./Avatar";
import {Dropdown} from "../Dropdown";
import "./avatar.css";
import {buildDropdownItems} from "./utils/buildDropdownItems";
import {useSelectableAvatars} from "./hooks/useSelectableAvatars";
import {Size} from "../../../types";

export interface AvatarGroupProps {
    avatars: (AvatarProps & { id: string; label?: string })[];
    max?: number;
    size?: Size;
    selectable?: boolean;
    className?: string;
    value?: string[];
    defaultValue?: string[];
    onSelectChange?: (selected: string[]) => void;
}

interface AvatarContainerBase {
    size: Size;
    selectable: boolean;
    selected: string[];
    onToggle: (id: string) => void;
}

interface VisibleAvatarsProps extends AvatarContainerBase {
    avatars: (AvatarProps & { id: string; label?: string })[];
}

interface HiddenAvatarsDropdownProps extends AvatarContainerBase {
    hidden: (AvatarProps & { id: string; label?: string })[];
    onSelectChange?: (selected: string[]) => void;
}

const VisibleAvatars = (props: VisibleAvatarsProps) => {
    const {avatars, size, selectable, selected, onToggle} = props;

    return (<>
        {avatars.map((avatar) => {
            const isSelected = selected.includes(avatar.id);
            return (
                <span key={avatar.id} onClick={() => selectable && onToggle(avatar.id)}
                      className={classNames({"cursor-pointer": selectable})}>
                    <Avatar {...avatar} size={size}
                            selected={isSelected}/>
                </span>
            );
        })}
    </>)
}

const HiddenAvatarsDropdown = (props: HiddenAvatarsDropdownProps) => {
    const {hidden, size, selectable, selected, onToggle, onSelectChange} = props;

    if (hidden.length === 0) return null;

    const dropdownItems = buildDropdownItems(hidden, selected, selectable);

    return (
        <Dropdown
            trigger={<Avatar size={size} fallback={`+${hidden.length}`} className="avatar-plus"/>}
            items={dropdownItems}
            onSelect={(id) => {
                if (selectable) {
                    onToggle(id as string);
                } else {
                    onSelectChange?.([id as string]);
                }
            }}
        />
    );
};

export const AvatarGroup = (props: AvatarGroupProps) => {
    const {avatars, max = 3, size = "md", selectable = false, className, value, defaultValue, onSelectChange} = props;
    const {selected, toggleSelect} = useSelectableAvatars({value, defaultValue, onSelectChange});

    const visible = avatars.slice(0, max);
    const hidden = avatars.slice(max);

    return (
        <div className={classNames("avatar-group", className)}>
            <VisibleAvatars avatars={visible} size={size} selectable={selectable} selected={selected}
                            onToggle={toggleSelect}/>
            <HiddenAvatarsDropdown hidden={hidden} size={size} selectable={selectable} selected={selected}
                                   onToggle={toggleSelect} onSelectChange={onSelectChange}/>
        </div>
    );
};
