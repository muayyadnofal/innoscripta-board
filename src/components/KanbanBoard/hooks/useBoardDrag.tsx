import {DragEndEvent} from "@dnd-kit/core";
import {IssueStatus} from "../../../types";

export const useBoardDrag = (moveIssue: (id: string, from: IssueStatus, to: IssueStatus) => void) => {
    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;
        if (!over) return;

        const sourceStatus = active.data.current?.status as IssueStatus | undefined;
        const targetStatus = over.data.current?.status as IssueStatus | undefined;

        if (!sourceStatus || !targetStatus || sourceStatus === targetStatus) return;

        moveIssue(active.id as string, sourceStatus, targetStatus);
    };

    return {handleDragEnd};
};
