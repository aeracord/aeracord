import { Client, Guild, GuildData, RawGuildData } from "../../../../internal";

export default function guildUpdate(client: Client, rawData: RawGuildData) {

    // Parse guild data
    const guildData: GuildData = Guild._fromRawData(client, rawData);

    // Emit event
    client.emit("guildUpdate", guildData, {
        rawData,
        guild: client.guilds.get(guildData.id)
    });
}