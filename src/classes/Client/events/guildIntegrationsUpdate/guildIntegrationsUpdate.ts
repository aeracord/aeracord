import { Client, GuildIntegrationsUpdateData, RawGuildIntegrationsUpdateData } from "../../../../internal";

export default function guildIntegrationsUpdate(client: Client, rawData: RawGuildIntegrationsUpdateData) {

    // Parse data
    const data: GuildIntegrationsUpdateData = {
        guildID: rawData.guild_id
    };

    // Emit event
    client.emit("guildIntegrationsUpdate", data, {
        rawData,
        guild: client.guilds.get(data.guildID)
    });
}