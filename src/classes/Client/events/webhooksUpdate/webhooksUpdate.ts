import { Client, WebhookData } from "../../../../internal";
import { RawWebhooksUpdateData } from "./rawWebhooksUpdateData";
import { WebhooksUpdateData } from "./webhooksUpdateData";

export default async function webhooksUpdate(client: Client, rawData: RawWebhooksUpdateData) {

    // Get webhooks
    const webhooks: WebhookData[] = await client.getChannelWebhooks(rawData.channel_id);

    // Parse data
    const data: WebhooksUpdateData = {
        guildID: rawData.guild_id,
        channelID: rawData.channel_id,
        webhooks
    };

    // Emit event
    client.emit("webhooksUpdate", data, {
        rawData,
        channel: client.channels.get(data.channelID),
        guild: client.guilds.get(data.guildID)
    });
}