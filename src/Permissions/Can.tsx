import React from "react";
import {Permission} from "./permissions";
import {useCan} from "./useCan";

interface CanProps {
    permission: Permission;
    fallback?: React.ReactNode;
    children: React.ReactNode;
}

export const Can: React.FC<CanProps> = ({permission, children, fallback = null}) => {
    const {can} = useCan();
    return can(permission) ? <>{children}</> : <>{fallback}</>;
};
