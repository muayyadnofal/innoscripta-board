import React from "react";
import classNames from "classnames";
import "./tag.css"

interface TagProps {
    children: React.ReactNode;
    variant?: "default" | "info" | "warning" | "success";
    className?: string;
}

export const Tag = (props: TagProps) => {
    const {children, variant = "default", className} = props;
    return (
        <span className={classNames("tag", `tag--${variant}`, className)}>
            {children}
        </span>
    );
};
