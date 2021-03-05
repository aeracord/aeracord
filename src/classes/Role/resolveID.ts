import { Role, RoleResolvable } from "../../internal";

export default function resolveID(roleResolvable: RoleResolvable): string | undefined {

    // Role
    if (roleResolvable instanceof Role) return roleResolvable.id;

    // Role ID
    else if (/^[0-9]{17,}$/.test(roleResolvable)) return roleResolvable;
}