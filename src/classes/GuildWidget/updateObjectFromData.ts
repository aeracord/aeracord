import { Client, GuildWidget, GuildWidgetData } from "../../internal";

export default function updateObjectFromData(client: Client, guildWidgetData: GuildWidgetData) {

    // Get guild widget from cache
    let guildWidget: GuildWidget | undefined = client.guildWidgets.get(guildWidgetData.guildID);

    // Update guild widget object
    if (guildWidget) GuildWidget._updateObject(guildWidget, guildWidgetData);
}