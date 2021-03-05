import { Member, User, UserResolvable } from "../../internal";
import isID from "../../util/isID";

export default function resolveID(userResolvable: UserResolvable): string | undefined {

    // User
    if (userResolvable instanceof User) return userResolvable.id;

    // Member
    else if (userResolvable instanceof Member) return userResolvable.user.id;

    // User ID
    else if (isID(userResolvable)) return userResolvable;
}