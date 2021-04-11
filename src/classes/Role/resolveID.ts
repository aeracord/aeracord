import { RoleResolvable } from "../../internal";
import isID from "../../util/isID";

export default function resolveID(roleResolvable: RoleResolvable): string | undefined {

    // Role
    if ((typeof roleResolvable === "object") && ("id" in roleResolvable)) return roleResolvable.id;

    // Role ID
    else if (isID(roleResolvable)) return roleResolvable;
}