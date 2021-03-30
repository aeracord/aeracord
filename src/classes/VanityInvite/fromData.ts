import { Client, VanityInvite, VanityInviteData } from "../../internal";

export default function fromData(client: Client, vanityInviteData: VanityInviteData): VanityInvite {

    // Update cached vanity invite
    let vanityInvite: VanityInvite | undefined = VanityInvite._updateObjectFromData(client, vanityInviteData);

    // Create vanity invite
    if (!vanityInvite) vanityInvite = new VanityInvite(client, vanityInviteData);

    // Return
    return vanityInvite;
}