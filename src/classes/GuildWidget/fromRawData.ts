import { Client, GuildWidget, GuildWidgetData, RawGuildWidgetData } from "../../internal";

export default function fromRawData(client: Client, rawData: RawGuildWidgetData, guildID: string): GuildWidgetData {

    // Parse guild widget data
    const guildWidgetData: GuildWidgetData = {
        guildID,
        enabled: rawData.enabled,
        channelID: rawData.channel_id
    };

    // Create guild widget object
    if (client._guildWidgets.cacheAll) GuildWidget.fromData(client, guildWidgetData);

    // Return
    return guildWidgetData;
}