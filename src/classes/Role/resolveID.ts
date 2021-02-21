import { Role, RoleResolvable } from "../../internal";

export default function resolveID(roleResolvable: RoleResolvable): string {

    // Role
    if (roleResolvable instanceof Role) return roleResolvable.id;

    // Role ID
    else return roleResolvable;
}