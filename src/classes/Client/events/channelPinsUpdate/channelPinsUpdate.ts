import { Client } from "../../../../internal";
import { ChannelPinsUpdateData } from "./channelPinsUpdateData";
import { RawChannelPinsUpdateData } from "./rawChannelPinsUpdateData";

export default function channelPinsUpdate(client: Client, rawData: RawChannelPinsUpdateData) {

    // Parse data
    const data: ChannelPinsUpdateData = {
        guildID: rawData.guild_id,
        channelID: rawData.channel_id,
        lastPinTimestamp: rawData.last_pin_timestamp ? new Date(rawData.last_pin_timestamp).getTime() : undefined
    };

    // Emit event
    client.emit("channelPinsUpdate", data, rawData);
}