import { Client, Invite, InviteData } from "../../internal";

export default function fromData(client: Client, inviteData: InviteData): Invite {

    // Get invite from cache
    let invite: Invite | undefined = client.invites.get(inviteData.code);

    // Create invite
    if (!invite) invite = new Invite(client, inviteData);

    // Return
    return invite;
}