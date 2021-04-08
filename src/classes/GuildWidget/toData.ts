import { GuildWidget, GuildWidgetData } from "../../internal";

export default function toData(guildWidget: GuildWidget): GuildWidgetData {

    // Parse guildWidget data
    return {
        guildID: guildWidget.guildID,
        enabled: guildWidget.enabled,
        channelID: guildWidget.channelID
    };
}