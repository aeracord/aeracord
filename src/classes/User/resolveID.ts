import { Member, User, UserResolvable } from "../../internal";

export default function resolveID(userResolvable: UserResolvable): string {

    // User
    if (userResolvable instanceof User) return userResolvable.id;

    // Member
    else if (userResolvable instanceof Member) return userResolvable.user.id;

    // User ID
    else return userResolvable;
}