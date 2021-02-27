import { Client, RawVanityInviteData, VanityInvite } from "../../internal";

export default function fromRawData(client: Client, rawData: RawVanityInviteData, guildID: string): VanityInvite {

    // Parse vanity invite
    const vanityInvite: VanityInvite = new VanityInvite(client, {
        guildID,
        code: rawData.code || undefined,
        uses: rawData.uses
    });

    // Return
    return vanityInvite;
}