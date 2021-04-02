import { GuildWidget, GuildWidgetData } from "../../internal";

export default function updateObject(guildWidget: GuildWidget, guildWidgetData: GuildWidgetData) {

    // Unmark as deleted
    if (guildWidget.deleted) guildWidget._unmarkAsDeleted();

    // Set data
    guildWidget.enabled = guildWidgetData.enabled;
    guildWidget.channelID = guildWidgetData.channelID;
}