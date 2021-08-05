import { Client, GuildWidget, GuildWidgetData } from "../../internal";

export default function fromData(client: Client, guildWidgetData: GuildWidgetData): GuildWidget {

    // Get guild widget from cache
    let guildWidget: GuildWidget | undefined = client.guildWidgets.get(guildWidgetData.guildID);

    // Create guild widget
    if (!guildWidget) guildWidget = new GuildWidget(client, guildWidgetData);

    // Return
    return guildWidget;
}