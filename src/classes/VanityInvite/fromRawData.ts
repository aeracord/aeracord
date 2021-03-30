import { Client, RawVanityInviteData, VanityInvite, VanityInviteData } from "../../internal";

export default function fromRawData(client: Client, rawData: RawVanityInviteData, guildID: string): VanityInviteData {

    // Parse vanity invite data
    const vanityInviteData: VanityInviteData = {
        guildID,
        code: rawData.code,
        uses: rawData.uses
    };

    // Create vanity invite or update object
    if (client._vanityInvites.cacheAll) VanityInvite.fromData(client, vanityInviteData);
    else VanityInvite._updateObjectFromData(client, vanityInviteData);

    // Return
    return vanityInviteData;
}