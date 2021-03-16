import { Client, VanityInvite, VanityInviteData } from "../../internal";

export default function fromRawData(client: Client, vanityInviteData: VanityInviteData): VanityInvite {

    // Create vanity invite
    const vanityInvite: VanityInvite = new VanityInvite(client, vanityInviteData);

    // Return
    return vanityInvite;
}