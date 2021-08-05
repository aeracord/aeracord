import { Client, RawWebhookData, User, Webhook, WebhookData } from "../../internal";

export default function dataFromRawData(client: Client, rawData: RawWebhookData): WebhookData {

    // Parse webhook data
    const webhookData: WebhookData = {
        id: rawData.id,
        type: rawData.type,
        guildID: rawData.guild_id,
        channelID: rawData.channel_id,
        name: rawData.name,
        avatar: rawData.avatar,
        creator: rawData.user && User._dataFromRawData(client, rawData.user),
        token: rawData.token || null,
        applicationID: rawData.application_id,
        fetchedAt: Date.now()
    };

    // Update cached webhook
    Webhook._updateObjectFromData(client, webhookData);

    // Return
    return webhookData;
}