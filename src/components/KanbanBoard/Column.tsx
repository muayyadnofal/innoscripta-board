import React from "react";
import {IssueModel} from "../../domain/models/Issue.model";
import {TaskCard} from "./TaskCard/TaskCard";
import {useDroppable} from "@dnd-kit/core";
import "./board.css";
import {CardSkeleton} from "./TaskCard/Card/CardSkeleton";

interface ColumnProps {
    status: string;
    issues: IssueModel[];
    innerRef?: (el: HTMLDivElement | null) => void;
    loading?: boolean;
}

export const Column = (props: ColumnProps) => {
    const {status, issues, innerRef, loading} = props;
    const {setNodeRef} = useDroppable({id: status, data: {status}});

    const combinedRef = (el: HTMLDivElement | null) => {
        setNodeRef(el);
        innerRef?.(el);
    };

    const showSkeletons = loading && issues.length === 0;
    const showData = issues.length > 0;

    return (
        <div className="column" ref={combinedRef}>
            <div className="column__title">{status}</div>
            <div className="column__list">
                {showSkeletons && Array(10).fill(null).map((_, idx) => <CardSkeleton key={idx}/>)}
                {showData && issues.map(issue => <TaskCard key={issue.id} issue={issue}/>)}
            </div>
        </div>
    );
};