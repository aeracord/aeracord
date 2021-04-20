import { Channel, ChannelData } from "../../internal";

export default function updateObject(channel: Channel, channelData: ChannelData) {

    // If the `ChannelData` was fetched before the `Channel` object was last updated, dont update anything
    if (channelData.fetchedAt < channel._lastUpdatedAt) return;

    // Unmark as deleted
    if (channel.deleted) channel._unmarkAsDeleted();

    // Set data
    channel.type = channelData.type;
    channel._lastUpdatedAt = Date.now();
}