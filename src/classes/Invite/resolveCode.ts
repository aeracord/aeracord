import { Invite, InviteResolvable } from "../../internal";

export default function resolveCode(inviteResolvable: InviteResolvable): string | undefined {

    // Invite
    if (inviteResolvable instanceof Invite) return inviteResolvable.code;

    // Invite code
    else if (/^[a-zA-Z0-9]$/.test(inviteResolvable)) return inviteResolvable;
}