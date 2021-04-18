import { GuildWidgetData, RawGuildWidgetData } from "../../internal";

export default function dataFromRawData(rawData: RawGuildWidgetData, guildID: string): GuildWidgetData {

    // Parse guild widget data
    return {
        guildID,
        enabled: rawData.enabled,
        channelID: rawData.channel_id
    };
}