import { Client, TextBasedChannel } from "../../../../internal";
import { ChannelPinsUpdateData } from "./channelPinsUpdateData";
import { RawChannelPinsUpdateData } from "./rawChannelPinsUpdateData";

export default function channelPinsUpdate(client: Client, rawData: RawChannelPinsUpdateData) {

    // Parse data
    const data: ChannelPinsUpdateData = {
        guildID: rawData.guild_id || null,
        channelID: rawData.channel_id,
        lastPinTimestamp: rawData.last_pin_timestamp ? new Date(rawData.last_pin_timestamp).getTime() : null
    };

    // Get channel
    const channel: TextBasedChannel | undefined = client.channels.get(data.channelID) as TextBasedChannel | undefined;

    // Update last pin timestamp
    if (channel) channel.lastPinTimestamp = data.lastPinTimestamp;

    // Emit event
    client.emit("channelPinsUpdate", data, {
        rawData,
        channel
    });
}