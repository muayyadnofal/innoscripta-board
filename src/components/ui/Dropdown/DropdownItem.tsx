import classNames from "classnames";
import {Avatar, BaseAvatarProps} from "../Avatar/Avatar";
import {ReactNode} from "react";
import "./dropdown.css";

interface DropdownItemProps {
    id: string | number;
    label?: ReactNode;
    avatar?: BaseAvatarProps;
    selected?: boolean;
    selectable?: boolean;
    render?: () => ReactNode;
    onClick: () => void;
    index: number;
    total: number;
}

export const DropdownItem = (props: DropdownItemProps) => {
    const {label, avatar, selected = false, selectable = false, render, onClick, index, total} = props;

    const classes = classNames("dropdown-item", {
        selected: selectable && selected,
        "is-first": index === 0,
        "is-last": index === total - 1,
    });

    return (
        <div className={classes} onClick={onClick}>
            {render ? render() : (
                <>
                    {avatar && <Avatar size="sm" {...avatar} />}
                    <span>{label}</span>
                </>
            )}
        </div>
    );
};
