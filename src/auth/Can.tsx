import type { ReactNode } from "react";
import { hasPermission } from "./Permissions";
import { type Role } from "./Permissions";

export const Can = ({
    role,
    permission,
    children
}: {
    role: Role,
    permission: string,
    children: ReactNode
}) : ReactNode | null => {
    if(hasPermission(role,permission)){
        return <>{children}</>
    }
    return null;
}