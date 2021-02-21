import { Invite, InviteResolvable } from "../../internal";

export default function resolveID(inviteResolvable: InviteResolvable): string {

    // Invite
    if (inviteResolvable instanceof Invite) return inviteResolvable.code;

    // Invite code
    else return inviteResolvable;
}