import {ButtonHTMLAttributes, forwardRef, ReactNode} from "react";
import "./button.css"
import classNames from "classnames";
import {Size} from "../../../types";
import {Spinner} from "../Spinner/Spinner";

type ButtonVariant = "solid" | "outline" | "text";
type ButtonSize = Size;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    block?: boolean;
    loading?: boolean;
    disabled?: boolean;
    icon?: ReactNode;
    iconPosition?: "start" | "end";
}


export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const {
        variant = "solid",
        size = "md",
        block = false,
        loading = false,
        disabled = false,
        icon,
        iconPosition = "start",
        children,
        className,
        ...rest
    } = props;

    const isDisabled = disabled || loading;

    const btnClass = classNames(
        "btn",
        `btn-${variant}`,
        `btn-${size}`,
        {
            "btn-block": block,
            "btn-disabled": isDisabled,
            "btn-icon-only": !children && icon,
            "btn-icon-end": iconPosition === "end",
        },
        className
    );

    return (
        <button className={btnClass} ref={ref} disabled={isDisabled} aria-disabled={isDisabled}{...rest}>
            {loading ? (
                <Spinner/>
            ) : (
                icon && <span className="btn-icon">{icon}</span>
            )}
            {children && <span className="btn-label">{children}</span>}
        </button>
    );
});