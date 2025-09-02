import "./sidebar.css";
import {ReactNode} from "react";
import {TaskCard} from "../../KanbanBoard/TaskCard/TaskCard";
import {useRecentIssuesStore} from "../../../stores/useRecentIssuesStore";

export type SidebarProps = {
    items: { label: string; icon?: ReactNode; path: string }[];
};


export const Sidebar = ({items}: SidebarProps) => {
    const recentIssues = useRecentIssuesStore(state => state.recent);

    return (
        <aside className="sidebar">
            <ul className="sidebar__list">
                {items.map(item => (
                    <li key={item.path} className="sidebar__item">
                        <a href={item.path} className="sidebar__link">
                            {item.icon && <span className="sidebar__icon">{item.icon}</span>}
                            <span>{item.label}</span>
                        </a>
                    </li>
                ))}
            </ul>

            {recentIssues.length > 0 && (
                <>
                    <hr/>
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