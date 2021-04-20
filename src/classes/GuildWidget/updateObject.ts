import { GuildWidget, GuildWidgetData } from "../../internal";

export default function updateObject(guildWidget: GuildWidget, guildWidgetData: GuildWidgetData) {

    // If the `GuildWidgetData` was fetched before the `GuildWidget` object was last updated, dont update anything
    if (guildWidgetData.fetchedAt < guildWidget._lastUpdatedAt) return;

    // Unmark as deleted
    if (guildWidget.deleted) guildWidget._unmarkAsDeleted();

    // Set data
    guildWidget.enabled = guildWidgetData.enabled;
    guildWidget.channelID = guildWidgetData.channelID;
    guildWidget._lastUpdatedAt = Date.now();
}