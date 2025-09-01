import {RefObject, useEffect} from "react";

type EventType = MouseEvent | TouchEvent;

export const useOnClickOutside = (
    ref: RefObject<HTMLDivElement | null>,
    handler: (event: EventType) => void
) => {
    useEffect(() => {
        const listener = (event: EventType) => {
            const element = ref?.current;
            if (!element || element.contains(event.target as Node)) return;
            handler(event);
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
};