import { Member, User, UserResolvable } from "../../internal";

export default function resolveID(userResolvable: UserResolvable): string | undefined {

    // User
    if (userResolvable instanceof User) return userResolvable.id;

    // Member
    else if (userResolvable instanceof Member) return userResolvable.user.id;

    // User ID
    else if (/^[0-9]{17,}$/.test(userResolvable)) return userResolvable;
}