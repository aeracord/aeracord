import { GuildWidget } from "../../../internal";
import { RawGuildWidgetData } from "./rawGuildWidgetData";

export default function parseGuildWidget(rawData: RawGuildWidgetData): GuildWidget {

    // Parse guild widget
    const guildWidget: GuildWidget = {
        enabled: rawData.enabled,
        channelID: rawData.channel_id || undefined
    };

    // Return
    return guildWidget;
}