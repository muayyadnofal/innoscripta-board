import React from "react";
import classNames from "classnames";
import "./severity-dot.css"


interface SeverityDotProps {
    level: number;
    className?: string;
}

export const SeverityDot = (props: SeverityDotProps) => {
    const {level, className} = props;

    return (
        <span className={classNames("severity-dot", `severity-dot--${level}`, className)}/>
    );
};
