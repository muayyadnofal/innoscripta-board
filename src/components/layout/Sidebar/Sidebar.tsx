import "./sidebar.css";
import {TaskCard} from "../../KanbanBoard/TaskCard/TaskCard";
import {useRecentIssuesStore} from "../../../stores/useRecentIssuesStore";

export const Sidebar = () => {
    const recentIssues = useRecentIssuesStore(state => state.recent);

    return (
        <aside className="sidebar">
            {recentIssues.length > 0 && (
                <>
                    <h4 className="sidebar__recent-title">Recently Opened</h4>
                    <ul className="sidebar__recent-list">
                        {recentIssues.map(issue => (
                            <li key={issue.id} className="sidebar__recent-item">
                                <TaskCard issue={issue} dragEnabled={false}/>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </aside>
    );
};