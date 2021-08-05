import { Client, VanityInvite, VanityInviteData } from "../../internal";

export default function updateObjectFromData(client: Client, vanityInviteData: VanityInviteData) {

    // Get vanity invite from cache
    let vanityInvite: VanityInvite | undefined = client.vanityInvites.get(vanityInviteData.guildID);

    // Update vanity invite object
    if (vanityInvite) VanityInvite._updateObject(vanityInvite, vanityInviteData);
}