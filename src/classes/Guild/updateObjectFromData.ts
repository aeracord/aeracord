import { Client, Guild, GuildData } from "../../internal";

export default function updateObjectFromData(client: Client, guildData: GuildData) {

    // Get guild from cache
    let guild: Guild | undefined = client.guilds.get(guildData.id);

    // Update guild object
    if (guild) Guild._updateObject(guild, guildData);
}