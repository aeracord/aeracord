import { Client, Guild, GuildData } from "../../internal";

export default function fromData(client: Client, guildData: GuildData): Guild {

    // Get guild from cache
    let guild: Guild | undefined = client.guilds.get(guildData.id);

    // Create guild
    if (!guild) guild = new Guild(client, guildData);

    // Return
    return guild;
}