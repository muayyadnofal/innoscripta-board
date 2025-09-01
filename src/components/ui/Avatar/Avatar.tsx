import {ReactNode, useState} from "react";
import classNames from "classnames";
import "./avatar.css";
import {Size} from "../../../types";

type avatarStatusType = 'loading' | 'error' | 'loaded';

export interface BaseAvatarProps {
    size?: Size;
    className?: string;
    children?: ReactNode;
}

interface AvatarImageProps extends BaseAvatarProps {
    src: string;
    alt?: string;
    onLoad: () => void;
    onError: () => void;
}

interface AvatarFallbackProps extends BaseAvatarProps {
    children?: ReactNode;
}

export interface AvatarProps extends BaseAvatarProps {
    src?: string;
    alt?: string;
    fallback?: ReactNode;
    selected?: boolean;
}

const AvatarContainer = (props: BaseAvatarProps & { selected?: boolean }) => {
    const {size = "md", className, children, selected} = props;

    return (
        <span
            className={classNames(
                "avatar",
                `avatar-${size}`,
                className,
                {"avatar__selected": selected}
            )}
        >
            {children}
        </span>
    );
};

const AvatarImage = (props: AvatarImageProps) => {
    const {src, alt, onLoad, onError, className} = props;

    return <img src={src} alt={alt} className={classNames("avatar__image", className)} onLoad={onLoad}
                onError={onError}/>
};

const AvatarFallback = (props: AvatarFallbackProps) => {
    const {children, className} = props;

    return <span className={classNames("avatar__fallback", className)}>{children}</span>
};

export const Avatar = ({src, alt, size = "md", fallback, className, selected}: AvatarProps) => {
    const [status, setStatus] = useState<avatarStatusType>(src ? "loading" : "error");

    return (
        <AvatarContainer size={size} className={className} selected={selected}>
            {src && status !== "error" ? (
                <AvatarImage src={src} alt={alt} onLoad={() => setStatus("loaded")} onError={() => setStatus("error")}/>
            ) : (
                <AvatarFallback>{fallback}</AvatarFallback>
            )}
        </AvatarContainer>
    );
};
