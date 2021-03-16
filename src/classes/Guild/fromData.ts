import { Client, Guild, GuildData } from "../../internal";

export default function fromData(client: Client, guildData: GuildData): Guild {

    // Get guild from cache
    let guild: Guild | undefined = client.guilds.get(guildData.id);

    // Update guild object
    if (guild) Guild._updateObject(guild, guildData);

    // Create guild
    else guild = new Guild(client, guildData);

    // Return
    return guild;
}