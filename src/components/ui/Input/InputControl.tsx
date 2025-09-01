import React, {forwardRef, InputHTMLAttributes, useRef} from "react";
import cn from "classnames";
import {Spinner} from "../Spinner/Spinner";
import {Button} from "../Button";
import {ClearIcon} from "../../icons";
import {Size} from "../../../types";
import "./input.css"

export interface InputControlProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'width'> {
    value: string;
    allowClear?: boolean;
    loading?: boolean;
    disabled?: boolean;
    bordered?: boolean;
    size?: Size;
    onClear?: () => void;
    width?: string | number;
}

export const InputControl = forwardRef<HTMLInputElement, InputControlProps>(
    (props, ref) => {
        const {value, allowClear, loading, disabled, bordered = true, size = "md", onClear, width, ...rest} = props;
        const innerRef = useRef<HTMLInputElement>(null);
        const hasValue = (value ?? "").length > 0;

        const handleClear = () => {
            const el = innerRef.current;
            if (!el) return;
            const proto = Object.getPrototypeOf(el);
            const valueSetter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
            valueSetter?.call(el, "");
            el.dispatchEvent(new Event("input", {bubbles: true}));
            el.focus();
            onClear?.();
        };

        return (
            <div className={cn(
                "innoscripta-input",
                `innoscripta-input--${size}`,
                {
                    "is-disabled": disabled,
                    "is-loading": loading,
                    "is-borderless": !bordered,
                }
            )}
                 style={{width}}
            >
                <input ref={(node) => {
                    if (typeof ref === "function") ref(node);
                    else if (ref) ref.current = node;
                    innerRef.current = node;
                }} className="innoscripta-input__control" value={value} disabled={disabled} {...rest}/>

                <span className="innoscripta-input__suffix">
                  {loading && <Spinner size={size}/>}
                    {allowClear && hasValue && !loading && !disabled && (
                        <Button variant="text" className="innoscripta-input__iconbtn" onClick={handleClear}
                                aria-label="Clear" tabIndex={-1} icon={<ClearIcon/>}/>
                    )}
                </span>
            </div>
        );
    }
);
