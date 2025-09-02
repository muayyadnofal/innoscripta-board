import React from "react";
import {closestCenter, DndContext} from "@dnd-kit/core";
import {Column} from "./Column";
import {IssueModel} from "../../domain/models/Issue.model";
import {IssueStatus} from "../../types";
import "./board.css";
import {useBoardState} from "./hooks/useBoardState";
import {useBoardDrag} from "./hooks/useBoardDrag";
import {useBoardScroll} from "./hooks/useBoardScroll";
import {useCan} from "../../Permissions/useCan";

interface BoardProps {
    issues: IssueModel[];
    statuses: IssueStatus[];
    onIssueMove?: (issue: IssueModel, toStatus: IssueStatus) => void;
    loading?: boolean;
}

export const Board = (props: BoardProps) => {
    const {issues, statuses, onIssueMove, loading} = props;
    const {can} = useCan();
    const {boardData, moveIssue: originalMoveIssue} = useBoardState(issues, statuses, onIssueMove);
    const {setColumnRef, scrollToCard} = useBoardScroll();

    const moveIssue = (id: string, from: IssueStatus, to: IssueStatus) => {
        if (!can("move_issue")) return;
        originalMoveIssue(id, from, to);
        scrollToCard(to, id, {block: "nearest", behavior: "smooth", attempts: 3});
    };

    const {handleDragEnd} = useBoardDrag(moveIssue);

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div className="board">
                {statuses.map((status) => (
                    <Column key={status} status={status} issues={boardData[status]} loading={loading}
                            innerRef={setColumnRef(status)}/>
                ))}
            </div>
        </DndContext>
    );
};
