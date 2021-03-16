import { Channel, TextBasedChannel, TextBasedChannelData } from "../../internal";

export default function updateObject(textBasedChannel: TextBasedChannel, textBasedChannelData: TextBasedChannelData, fromConstructor?: boolean) {

    // Set data
    textBasedChannel.lastMessageID = textBasedChannelData.lastMessageID;
    textBasedChannel.lastPinTimestamp = textBasedChannelData.lastPinTimestamp;

    /**
     * If this function was not called from a constructor,
     * call the `updateObject()` function for the class text based channels extend
     */
    if (!fromConstructor) Channel._updateObject(textBasedChannel, textBasedChannelData);
}