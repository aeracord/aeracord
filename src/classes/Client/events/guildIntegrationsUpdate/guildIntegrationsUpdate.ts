import { Client } from "../../../../internal";
import { GuildIntegrationsUpdateData } from "./guildIntegrationsUpdateData";
import { RawGuildIntegrationsUpdateData } from "./rawGuildIntegrationsUpdateData";

export default function guildIntegrationsUpdate(client: Client, rawData: RawGuildIntegrationsUpdateData) {

    // Parse data
    const data: GuildIntegrationsUpdateData = {
        guildID: rawData.guild_id
    };

    // Emit event
    client.emit("guildIntegrationsUpdate", data, rawData);
}