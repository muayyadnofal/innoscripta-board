import {useCallback, useRef} from "react";
import {IssueStatus} from "../../../types";

type ColumnRefs = Record<IssueStatus, HTMLDivElement | null>;

export function useBoardScroll() {
    const columnRefs = useRef<ColumnRefs>({} as ColumnRefs);

    const setColumnRef = useCallback(
        (status: IssueStatus) =>
            (el: HTMLDivElement | null) => {
                columnRefs.current[status] = el;
            },
        []
    );

    const scrollToCard = useCallback(
        (status: IssueStatus, id: string, opts?: Partial<ScrollIntoViewOptions> & { attempts?: number }) => {
            const {behavior = "smooth", block = "nearest", inline = "nearest", attempts = 2} = opts || {};
            let remaining = Math.max(0, attempts);

            const tick = () => {
                const column = columnRefs.current[status];
                if (!column) return;

                const el = column.querySelector<HTMLElement>(`[data-id="${id}"]`);
                if (el) {
                    el.scrollIntoView({behavior, block, inline});
                } else if (remaining-- > 0) {
                    requestAnimationFrame(tick);
                }
            };

            requestAnimationFrame(tick);
        },
        []
    );

    const scrollColumnToBottom = useCallback((status: IssueStatus, behavior: ScrollBehavior = "smooth") => {
        const col = columnRefs.current[status];
        if (col) col.scrollTo({top: col.scrollHeight, behavior});
    }, []);

    return {setColumnRef, scrollToCard, scrollColumnToBottom, columnRefs};
}
