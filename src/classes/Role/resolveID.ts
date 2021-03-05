import { Role, RoleResolvable } from "../../internal";
import isID from "../../util/isID";

export default function resolveID(roleResolvable: RoleResolvable): string | undefined {

    // Role
    if (roleResolvable instanceof Role) return roleResolvable.id;

    // Role ID
    else if (isID(roleResolvable)) return roleResolvable;
}