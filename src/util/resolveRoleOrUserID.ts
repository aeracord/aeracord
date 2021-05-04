import { RoleResolvable, UserResolvable } from "../internal";

/**
 * Resolve Role or User ID
 *
 * Resolve a role or user object to an ID
 *
 * @param roleOrUserResolvable The role or user resolvable
 *
 * @returns {string | undefined} The resolved ID, or `undefined` if the role or user resolvable is invalid
 */
export default function resolveRoleOrUserID(roleOrUserResolvable: RoleResolvable | UserResolvable): string | undefined {

    // Member
    if ((typeof roleOrUserResolvable === "object") && ("user" in roleOrUserResolvable)) return roleOrUserResolvable.user.id;

    // User
    else if ((typeof roleOrUserResolvable === "object") && ("id" in roleOrUserResolvable)) return roleOrUserResolvable.id;

    // User ID
    else if (typeof roleOrUserResolvable === "string") return roleOrUserResolvable;
}