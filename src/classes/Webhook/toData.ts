import { Webhook, WebhookData } from "../../internal";

export default function toData(webhook: Webhook): WebhookData {

    // Parse webhook data
    return {
        id: webhook.id,
        type: webhook.type,
        guildID: webhook.guildID,
        channelID: webhook.channelID,
        name: webhook.name,
        avatar: webhook.avatar,
        creator: webhook.creator,
        token: webhook.token,
        applicationID: webhook.applicationID,
        fetchedAt: webhook._lastUpdatedAt
    };
}