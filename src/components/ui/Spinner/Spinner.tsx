import React, {FC} from "react";
import classNames from "classnames";
import "./spinner.css";

type SpinnerSize = "sm" | "md" | "lg";

interface SpinnerProps {
    size?: SpinnerSize;
    className?: string;
}

export const Spinner: FC<SpinnerProps> = ({size = "md", className}) => {
    const spinnerClass = classNames("spinner", `spinner-${size}`, className);
    return <span className={spinnerClass} aria-label="loading"/>;
};
