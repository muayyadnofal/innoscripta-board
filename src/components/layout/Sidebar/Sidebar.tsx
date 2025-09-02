import classNames from "classnames";
import "./sidebar.css";
import {ReactNode} from "react";

export type SidebarProps = {
    items: { label: string; icon?: ReactNode; path: string }[];
};

export const Sidebar = ({items}: SidebarProps) => {
    return (
        <aside className={classNames("sidebar")}>
            <ul className="sidebar__list">
                {items.map((item) => (
                    <li key={item.path} className="sidebar__item">
                        <a href={item.path} className="sidebar__link">
                            {item.icon && <span className="sidebar__icon">{item.icon}</span>}
                            <span>{item.label}</span>
                        </a>
                    </li>
                ))}
            </ul>
        </aside>
    );
};
