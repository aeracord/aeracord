import { Client, RawWebhooksUpdateData, Webhook, WebhooksUpdateData, WebhookData } from "../../../../internal";

export default async function webhooksUpdate(client: Client, rawData: RawWebhooksUpdateData) {

    // Get webhooks
    const webhooks: WebhookData[] = await client.getChannelWebhooks(rawData.channel_id);

    // Parse data
    const data: WebhooksUpdateData = {
        guildID: rawData.guild_id,
        channelID: rawData.channel_id,
        webhooks
    };

    // Get webhook IDs
    const webhookIDs: string[] = data.webhooks.map((w: WebhookData) => w.id);

    // Mark as deleted
    const deletedWebhooks: Webhook[] = [...client.webhooks.filter((w: Webhook) => w.guildID === data.guildID && !webhookIDs.includes(w.id)).values()];
    deletedWebhooks.forEach((w: Webhook) => w._markAsDeleted());

    // Emit event
    client.emit("webhooksUpdate", data, {
        rawData,
        channel: client.channels.get(data.channelID),
        guild: client.guilds.get(data.guildID)
    });
}