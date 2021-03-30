import { Channel, ChannelData } from "../../internal";

export default function updateObject(channel: Channel, channelData: ChannelData) {

    // Set data
    channel.type = channelData.type;
}