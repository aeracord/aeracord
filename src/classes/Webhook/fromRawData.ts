import { RawWebhookData, User, WebhookData } from "../../internal";

export default function fromRawData(rawData: RawWebhookData): WebhookData {

    // Parse webhook data
    return {
        id: rawData.id,
        type: rawData.type,
        guildID: rawData.guild_id,
        channelID: rawData.channel_id,
        name: rawData.name,
        avatar: rawData.avatar,
        creator: rawData.user && User._fromRawData(rawData.user),
        token: rawData.token || null,
        applicationID: rawData.application_id
    };
}