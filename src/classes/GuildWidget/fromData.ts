import { Client, GuildWidget, GuildWidgetData } from "../../internal";

export default function fromData(client: Client, guildWidgetData: GuildWidgetData): GuildWidget {

    // Update cached guild widget
    let guildWidget: GuildWidget | undefined = GuildWidget._updateObjectFromData(client, guildWidgetData);

    // Create guild widget
    if (!guildWidget) guildWidget = new GuildWidget(client, guildWidgetData);

    // Return
    return guildWidget;
}