import {IssuesFilterInput} from "./IssuesFilterInput";
import {AssigneeFilter} from "./AssigneeFilter";
import "./filter-panel.css"

export const FilterPanel = () => {
    return <div className="filter-panel">
        <IssuesFilterInput/>
        <AssigneeFilter max={8}/>
    </div>
}