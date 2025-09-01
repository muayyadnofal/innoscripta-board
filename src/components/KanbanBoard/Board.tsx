import React, {useState} from "react";
import {closestCenter, DndContext, DragEndEvent} from "@dnd-kit/core";
import {Column} from "./Column";
import {IssueModel} from "../../domain/models/Issue.model";
import "./board.css"

interface BoardProps {
    issues: IssueModel[];
    statuses: string[];
}

export const Board: React.FC<BoardProps> = ({issues, statuses}) => {
    const [boardData, setBoardData] = useState<Record<string, IssueModel[]>>(() => {
        const grouped: Record<string, IssueModel[]> = {};
        statuses.forEach(status => grouped[status] = issues.filter(i => i.status === status));
        return grouped;
    });

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;

        const activeData = active.data?.current;
        const overData = over?.data?.current;

        if (!activeData || !overData) return;

        const sourceStatus = activeData.status;
        const targetStatus = overData.status;

        if (sourceStatus === targetStatus) return;

        const movingIssue = boardData[sourceStatus].find(i => i.id === active.id);
        if (!movingIssue) return;

        setBoardData(prev => ({
            ...prev,
            [sourceStatus]: prev[sourceStatus].filter(i => i.id !== active.id),
            [targetStatus]: [...prev[targetStatus], {...movingIssue, status: targetStatus}],
        }));
    };

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div className='board'>
                {statuses.map(status => (
                    <Column key={status} status={status} issues={boardData[status]}/>
                ))}
            </div>
        </DndContext>
    );
};
