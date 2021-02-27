import { Client, GuildWidget, RawGuildWidgetData } from "../../internal";

export default function fromRawData(client: Client, rawData: RawGuildWidgetData, guildID: string): GuildWidget {

    // Parse guild widget
    const guildWidget: GuildWidget = new GuildWidget(client, {
        guildID,
        enabled: rawData.enabled,
        channelID: rawData.channel_id || undefined
    });

    // Return
    return guildWidget;
}