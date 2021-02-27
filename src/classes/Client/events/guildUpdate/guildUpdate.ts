import { Client, Guild, RawGuildData } from "../../../../internal";

export default function guildUpdate(client: Client, rawData: RawGuildData) {

    // Parse guild
    const guild: Guild = Guild._fromRawData(client, rawData);

    // Emit event
    client.emit("guildUpdate", guild, rawData);
}