import { DMChannel, DMChannelData, TextBasedChannel } from "../../internal";

export default function updateObject(dmChannel: DMChannel, dmChannelData: DMChannelData, fromConstructor?: boolean) {

    // Set data
    dmChannel.recipient = dmChannelData.recipient;

    /**
     * If this function was not called from a constructor,
     * call the `updateObject()` function for the class DM channels extend
     */
    if (!fromConstructor) TextBasedChannel._updateObject(dmChannel, dmChannelData);
}