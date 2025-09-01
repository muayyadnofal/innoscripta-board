import React from 'react';
import {FilterPanel} from "../components/Filters/FilterPanel";
import {Board} from "../components/KanbanBoard/Board";
import {useGetAllIssues} from "../domain/useCases/useGetAllIssues";

const statuses = ["Backlog", "In Progress", "Done"];

export const BoardPage = () => {
    const {data: issues, isLoading} = useGetAllIssues()

    return <div style={{padding: '1rem'}}>
        <div style={{display: "flex", flexDirection: "column", gap: "2rem"}}>
            <FilterPanel/>
            {!isLoading && <Board issues={issues ?? []} statuses={statuses}/>}
        </div>
    </div>;
};
