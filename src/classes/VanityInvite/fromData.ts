import { Client, VanityInvite, VanityInviteData } from "../../internal";

export default function fromData(client: Client, vanityInviteData: VanityInviteData): VanityInvite {

    // Get vanity invite from cache
    let vanityInvite: VanityInvite | undefined = client.vanityInvites.get(vanityInviteData.guildID);

    // Update vanity invite object
    if (vanityInvite) VanityInvite._updateObject(vanityInvite, vanityInviteData);

    // Create vanity invite
    else vanityInvite = new VanityInvite(client, vanityInviteData);

    // Return
    return vanityInvite;
}