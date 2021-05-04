import { RoleResolvable } from "../../internal";

export default function resolveID(roleResolvable: RoleResolvable): string | undefined {

    // Role
    if ((typeof roleResolvable === "object") && ("id" in roleResolvable)) return roleResolvable.id;

    // Role ID
    else if (typeof roleResolvable === "string") return roleResolvable;
}