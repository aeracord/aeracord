import { UserResolvable } from "../../internal";
import isID from "../../util/isID";

export default function resolveID(userResolvable: UserResolvable): string | undefined {

    // Member
    if ((typeof userResolvable === "object") && ("user" in userResolvable)) return userResolvable.user.id;

    // User
    else if ((typeof userResolvable === "object") && ("id" in userResolvable)) return userResolvable.id;

    // User ID
    else if (isID(userResolvable)) return userResolvable;
}