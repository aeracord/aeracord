import { Client, Invite, InviteData } from "../../internal";

export default function fromData(client: Client, inviteData: InviteData): Invite {

    // Update cached invite
    let invite: Invite | undefined = Invite._updateObjectFromData(client, inviteData);

    // Create invite
    if (!invite) invite = new Invite(client, inviteData);

    // Return
    return invite;
}