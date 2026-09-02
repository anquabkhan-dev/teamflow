const rolePermissions = {
    admin: [
        "VIEW_PROJECT",
        "CREATE_PROJECT",
        "EDIT_PROJECT",
        "DELETE_PROJECT",
        "MANAGE_SETTINGS",
    ],
    manager: ["VIEW_PROJECT", "CREATE_PROJECT", "EDIT_PROJECT"],
    developer: ["VIEW_PROJECT"],
} as const;

export type Role = keyof typeof rolePermissions;

export type Permission = "VIEW_PROJECT"|"CREATE_PROJECT"|"EDIT_PROJECT"|"DELETE_PROJECT"

export type PersmissionConfig = Record<Permission, boolean>

const permissions : PersmissionConfig = {
    "VIEW_PROJECT": true,
    "CREATE_PROJECT": true,
    "EDIT_PROJECT": false,
    "DELETE_PROJECT": true
}

export const hasPermission = (role: Role, permission: string) => {
    const allowedPermissions = rolePermissions[role];

    for (const currentPermission of allowedPermissions) {
        if (currentPermission === permission) return true;
    }
    return false;
};
