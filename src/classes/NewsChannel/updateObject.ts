import { GuildChannel, NewsChannel, NewsChannelData } from "../../internal";

export default function updateObject(newsChannel: NewsChannel, newsChannelData: NewsChannelData, fromConstructor?: boolean) {

    // Set data
    newsChannel.topic = newsChannelData.topic;
    newsChannel.nsfw = newsChannelData.nsfw;
    newsChannel.rateLimitPerUser = newsChannelData.rateLimitPerUser;
    newsChannel.lastMessageID = newsChannelData.lastMessageID;
    newsChannel.lastPinTimestamp = newsChannelData.lastPinTimestamp;

    /**
     * If this function was not called from a constructor,
     * call the `updateObject()` function for the class news channels extend
     */
    if (!fromConstructor) GuildChannel._updateObject(newsChannel, newsChannelData);
}