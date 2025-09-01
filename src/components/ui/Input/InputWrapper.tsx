import React, {FC, ReactNode} from "react";
import cn from "classnames";
import "./input.css"

interface InputWrapperProps {
    addonBefore?: ReactNode;
    addonAfter?: ReactNode;
    disabled?: boolean;
    children: ReactNode;
    width?: number | string;
}

export const InputWrapper: FC<InputWrapperProps> = (props) => {
    const {addonBefore, addonAfter, disabled, children, width} = props;
    if (!addonBefore && !addonAfter) return <>{children}</>;

    return (
        <div style={{width}} className={cn("innoscripta-input-group", {disabled})}>
            {addonBefore && (
                <div className="innoscripta-input-group__addon innoscripta-input-group__addon-before">
                    {addonBefore}
                </div>
            )}
            {children}
            {addonAfter && (
                <div className="innoscripta-input-group__addon innoscripta-input-group__addon-after">
                    {addonAfter}
                </div>
            )}
        </div>
    );
};
