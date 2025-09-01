import {SVGProps} from "react";

export interface SVGIconProps extends SVGProps<SVGSVGElement> {
    size?: number;
}

export const IconComponent = (props: SVGIconProps) => {
    const {width, height, size, viewBox, children, ...rest} = props;

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox || "0 0 24 24"} width={size || width || 24}
             height={size || height || 24}{...rest}>
            {children}
        </svg>
    );
};