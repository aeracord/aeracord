import { Webhook, WebhookData } from "../../internal";

export default function updateObject(webhook: Webhook, webhookData: WebhookData) {

    // If the `WebhookData` was fetched before the `Webhook` object was last updated, dont update anything
    if (webhookData.fetchedAt < webhook._lastUpdatedAt) return;

    // Unmark as deleted
    if (webhook.deleted) webhook._unmarkAsDeleted();

    // Set data
    webhook.type = webhookData.type;
    webhook.guildID = webhookData.guildID;
    webhook.channelID = webhookData.channelID;
    webhook.name = webhookData.name;
    webhook.avatar = webhookData.avatar;
    webhook.creator = webhookData.creator;
    webhook.token = webhookData.token;
    webhook.applicationID = webhookData.applicationID;
    webhook._lastUpdatedAt = Date.now();
}