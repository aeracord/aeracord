import { Client, Guild, GuildData, RawGuildData } from "../../../../internal";

export default function guildUpdate(client: Client, rawData: RawGuildData) {

    // Parse guild data
    const guildData: GuildData = Guild._fromRawData(rawData);

    // Emit event
    client.emit("guildUpdate", guildData, rawData);
}