import { Client, Invite, InviteData } from "../../internal";

export default function fromData(client: Client, inviteData: InviteData): Invite {

    // Create invite
    const invite: Invite = new Invite(client, inviteData);

    // Return
    return invite;
}