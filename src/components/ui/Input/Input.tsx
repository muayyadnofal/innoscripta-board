import {ChangeEventHandler, forwardRef, InputHTMLAttributes, ReactNode} from "react";
import {Size} from "../../../types";
import {InputControl} from "./InputControl";
import {InputWrapper} from "./InputWrapper";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "value" | "onChange"> {
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    size?: Size;
    allowClear?: boolean;
    addonBefore?: ReactNode;
    addonAfter?: ReactNode;
    loading?: boolean;
    disabled?: boolean;
    bordered?: boolean;
    maxLength?: number;
    width?: number | string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const {
        value,
        onChange,
        size = "md",
        allowClear,
        addonBefore,
        addonAfter,
        loading,
        disabled,
        bordered,
        maxLength,
        width = '100%',
        ...rest
    } = props;

    return (
        <InputWrapper width={width} addonBefore={addonBefore} addonAfter={addonAfter} disabled={disabled}>
            <InputControl
                ref={ref}
                value={value}
                onChange={onChange}
                size={size}
                allowClear={allowClear}
                loading={loading}
                disabled={disabled}
                bordered={bordered}
                width={width}
                {...rest}
            />
        </InputWrapper>
    );
});
