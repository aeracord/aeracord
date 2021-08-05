import { Client, GuildWidget, GuildWidgetData, RawGuildWidgetData } from "../../internal";

export default function dataFromRawData(client: Client, rawData: RawGuildWidgetData, guildID: string): GuildWidgetData {

    // Parse guild widget data
    const guildWidgetData: GuildWidgetData = {
        guildID,
        enabled: rawData.enabled,
        channelID: rawData.channel_id,
        fetchedAt: Date.now()
    };

    // Update cached guild widget
    GuildWidget._updateObjectFromData(client, guildWidgetData);

    // Return
    return guildWidgetData;
}