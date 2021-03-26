import { Client } from "../../../../internal";
import { RawWebhooksUpdateData } from "./rawWebhooksUpdateData";
import { WebhooksUpdateData } from "./webhooksUpdateData";

export default function webhooksUpdate(client: Client, rawData: RawWebhooksUpdateData) {

    // Parse data
    const data: WebhooksUpdateData = {
        guildID: rawData.guild_id,
        channelID: rawData.channel_id
    };

    // Emit event
    client.emit("webhooksUpdate", data, {
        rawData,
        channel: client.channels.get(data.channelID),
        guild: client.guilds.get(data.guildID)
    });
}