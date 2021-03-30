import { Ban, BanData, Client } from "../../internal";

export default function updateObjectFromData(client: Client, banData: BanData): Ban | undefined {

    // Get ban from cache
    let ban: Ban | undefined = client.bans.get(banData.guildID, banData.user.id);

    // Update ban object
    if (ban) Ban._updateObject(ban, banData);

    // Return
    return ban;
}