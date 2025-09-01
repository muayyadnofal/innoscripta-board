import {ReactNode, useRef, useState} from "react";
import classNames from "classnames";
import {useOnClickOutside} from "../../../hooks/useOnClickOutside";
import {BaseAvatarProps} from "../Avatar/Avatar";
import {DropdownMenu} from "./DropdownMenu";
import "./dropdown.css";


export interface DropdownItemConfig {
    id: string | number;
    label?: ReactNode;
    avatar?: BaseAvatarProps;
    selected?: boolean;
    selectable?: boolean;
    render?: () => ReactNode;
    closeOnSelect?: boolean;
}

interface DropdownProps {
    trigger: ReactNode;
    items?: DropdownItemConfig[];
    children?: ReactNode;
    onSelect?: (id: string | number) => void;
    loading?: boolean
}

export const Dropdown = (props: DropdownProps) => {
    const {trigger, items, children, onSelect, loading} = props;
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useOnClickOutside(ref, () => setOpen(false));

    const handleItemClick = (item: DropdownItemConfig) => {
        onSelect?.(item.id);
        if (item.closeOnSelect) setOpen(false);
    };

    return (
        <div className="dropdown" ref={ref}>
            <div className="dropdown-trigger" onClick={() => setOpen((o) => !o)}>
                {trigger}
            </div>
            <div className={classNames("dropdown-menu", {open})}>
                {loading && <div className="search-loading">Loading...</div>}
                {items && !loading && <DropdownMenu items={items} onItemClick={handleItemClick}/>}
                {!items && !loading && children}
            </div>
        </div>
    );
};
