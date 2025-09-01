import {useState} from "react";

export const useDropdownOpenState = (controlledOpen?: boolean, onOpenChange?: (open: boolean) => void) => {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
    const open = controlledOpen ?? uncontrolledOpen;
    const setOpen = onOpenChange ?? setUncontrolledOpen;

    return {open, setOpen};
}
