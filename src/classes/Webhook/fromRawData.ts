import { Client, RawWebhookData, User, Webhook } from "../../internal";

export default function fromRawData(client: Client, rawData: RawWebhookData): Webhook {

    // Parse webhook
    const webhook: Webhook = new Webhook(client, {
        id: rawData.id,
        type: rawData.type,
        guildID: rawData.guild_id,
        channelID: rawData.channel_id,
        name: rawData.name,
        avatar: rawData.avatar || undefined,
        creator: rawData.user && User._fromRawData(client, rawData.user),
        token: rawData.token,
        applicationID: rawData.application_id || undefined
    });

    // Return
    return webhook;
}