import { GuildWidget, GuildWidgetData } from "../../internal";

export default function updateObject(guildWidget: GuildWidget, guildWidgetData: GuildWidgetData) {

    // Set data
    guildWidget.enabled = Boolean(guildWidgetData.enabled);
    guildWidget.channelID = guildWidgetData.channelID;
}