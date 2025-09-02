export type Role = "admin" | "contributor";

export type Permission = | "move_issue" | "mark_resolved" | "view_board" | "edit_issue";

export const permissionsConfig: Record<Role, Permission[]> = {
    admin: ["move_issue", "mark_resolved", "view_board", "edit_issue"],
    contributor: ["view_board"],
};
