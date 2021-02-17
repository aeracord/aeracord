import { Client } from "../../../../internal";
import ready from "../ready";
import { GuildDeleteData } from "./guildDeleteData";
import { RawGuildDeleteData } from "./rawGuildDeleteData";

export default function guildDelete(client: Client, rawData: RawGuildDeleteData) {

    // Parse data
    const data: GuildDeleteData = {
        id: rawData.id
    };

    // Initial guild delete event
    if (client._uninitializedGuilds.has(data.id)) {

        // Remove from uninitialized guilds
        client._uninitializedGuilds.delete(data.id);

        // Add to ready data
        client._readyData?.data.unavailableGuilds.push(data);

        // Ready
        if (client._uninitializedGuilds.size === 0) ready(client);
    }

    // Guild unavailable
    else if (rawData.unavailable) {

        // Add to unavailable guilds
        client._unavailableGuilds.add(data.id);

        // Emit event
        client.emit("guildUnavailable", data, rawData);
    }

    // Emit event
    else client.emit("guildDelete", data, rawData);
}