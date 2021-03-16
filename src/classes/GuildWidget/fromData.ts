import { Client, GuildWidget, GuildWidgetData } from "../../internal";

export default function fromRawData(client: Client, guildWidgetData: GuildWidgetData): GuildWidget {

    // Create guild widget
    const guildWidget: GuildWidget = new GuildWidget(client, guildWidgetData);

    // Return
    return guildWidget;
}