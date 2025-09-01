import {ChangeEventHandler, forwardRef, InputHTMLAttributes, ReactNode, useRef} from "react";
import {useOnClickOutside} from "../../../hooks/useOnClickOutside";
import {Dropdown, DropdownItemConfig} from "../Dropdown";
import {Input} from "../Input/Input";
import {useDropdownOpenState} from "./hooks/useDropdownOpenState";
import {createSyntheticChange} from "./utils/createSyntheticChange";
import "./search.css";

export interface SearchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "value" | "onChange"> {
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    items?: DropdownItemConfig[];
    onItemSelect?: (id: string | number) => void;
    loading?: boolean;
    addonBefore?: ReactNode;
    addonAfter?: ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchProps>(
    (props, ref) => {
        const {
            value,
            onChange,
            items,
            onItemSelect,
            loading,
            addonBefore,
            addonAfter,
            open: controlledOpen,
            onOpenChange,
            ...rest
        } = props;

        const {open, setOpen} = useDropdownOpenState(controlledOpen, onOpenChange);

        const wrapperRef = useRef<HTMLDivElement>(null);
        useOnClickOutside(wrapperRef, () => setOpen(false));

        const handleItemSelect = (id: string | number) => {
            const selectedItem = items?.find((item) => item.id === id);

            if (selectedItem?.label && typeof selectedItem.label === "string") onChange(createSyntheticChange(selectedItem.label));

            onItemSelect?.(id);
            setOpen(false);
        };

        return (
            <Dropdown
                trigger={
                    <Input ref={ref} value={value}
                           onChange={(e) => {
                               onChange(e);
                               if (!open) setOpen(true);
                           }}
                           addonBefore={addonBefore} addonAfter={addonAfter}{...rest}
                    />
                }
                items={items}
                onSelect={handleItemSelect}
                loading={loading}
            />
        );
    }
);