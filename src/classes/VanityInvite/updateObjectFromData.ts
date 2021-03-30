import { Client, VanityInvite, VanityInviteData } from "../../internal";

export default function updateObjectFromData(client: Client, vanityInviteData: VanityInviteData): VanityInvite | undefined {

    // Get vanityInvite from cache
    let vanityInvite: VanityInvite | undefined = client.vanityInvites.get(vanityInviteData.guildID);

    // Update vanityInvite object
    if (vanityInvite) VanityInvite._updateObject(vanityInvite, vanityInviteData);

    // Return
    return vanityInvite;
}