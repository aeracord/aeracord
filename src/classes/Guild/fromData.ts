import { Client, Guild, GuildData } from "../../internal";

export default function fromData(client: Client, guildData: GuildData): Guild {

    // Update cached guild
    let guild: Guild | undefined = Guild._updateObjectFromData(client, guildData);

    // Create guild
    if (!guild) guild = new Guild(client, guildData);

    // Return
    return guild;
}