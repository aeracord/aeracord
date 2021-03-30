import { Client, RawWebhookData, User, Webhook, WebhookData } from "../../internal";

export default function fromRawData(client: Client, rawData: RawWebhookData): WebhookData {

    // Parse webhook data
    const webhookData: WebhookData = {
        id: rawData.id,
        type: rawData.type,
        guildID: rawData.guild_id,
        channelID: rawData.channel_id,
        name: rawData.name,
        avatar: rawData.avatar,
        creator: rawData.user && User._fromRawData(client, rawData.user),
        token: rawData.token || null,
        applicationID: rawData.application_id
    };

    // Create webhook or update object
    if (client._webhooks.cacheAll) Webhook.fromData(client, webhookData);
    else Webhook._updateObjectFromData(client, webhookData);

    // Return
    return webhookData;
}