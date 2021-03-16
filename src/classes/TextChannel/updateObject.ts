import { GuildChannel, TextChannel, TextChannelData } from "../../internal";

export default function updateObject(textChannel: TextChannel, textChannelData: TextChannelData, fromConstructor?: boolean) {

    // Set data
    textChannel.topic = textChannelData.topic;
    textChannel.nsfw = Boolean(textChannelData.nsfw);
    textChannel.rateLimitPerUser = textChannelData.rateLimitPerUser;
    textChannel.lastMessageID = textChannelData.lastMessageID;
    textChannel.lastPinTimestamp = textChannelData.lastPinTimestamp;

    /**
     * If this function was not called from a constructor,
     * call the `updateObject()` function for the class text channels extend
     */
    if (!fromConstructor) GuildChannel._updateObject(textChannel, textChannelData);
}