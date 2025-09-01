import {DropdownItemConfig} from "./Dropdown";
import {DropdownItem} from "./DropdownItem";

interface DropdownMenuProps {
    items: DropdownItemConfig[];
    onItemClick: (item: DropdownItemConfig) => void;
}

export const DropdownMenu = (props: DropdownMenuProps) => {
    const {items, onItemClick} = props;

    return (
        <>
            {items.map((item, index) => (
                <DropdownItem key={item.id} index={index} total={items.length}
                              onClick={() => onItemClick(item)}{...item}/>
            ))}
        </>
    );
};
