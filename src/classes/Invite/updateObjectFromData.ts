import { Client, Invite, InviteData } from "../../internal";

export default function updateObjectFromData(client: Client, inviteData: InviteData): Invite | undefined {

    // Get invite from cache
    let invite: Invite | undefined = client.invites.get(inviteData.code);

    // Update invite object
    if (invite) Invite._updateObject(invite, inviteData);

    // Return
    return invite;
}