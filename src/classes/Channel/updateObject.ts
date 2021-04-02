import { Channel, ChannelData } from "../../internal";

export default function updateObject(channel: Channel, channelData: ChannelData) {

    // Unmark as deleted
    if (channel.deleted) channel._unmarkAsDeleted();

    // Set data
    channel.type = channelData.type;
}