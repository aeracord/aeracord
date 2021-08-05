import { Ban, BanData, Client } from "../../internal";

export default function fromData(client: Client, banData: BanData): Ban {

    // Get ban from cache
    let ban: Ban | undefined = client.bans.get(banData.guildID, banData.user.id);

    // Create ban
    if (!ban) ban = new Ban(client, banData);

    // Return
    return ban;
}