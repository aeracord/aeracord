import { NewsChannel, NewsChannelData, TextChannel } from "../../internal";

export default function updateObject(newsChannel: NewsChannel, newsChannelData: NewsChannelData, fromConstructor?: boolean) {

    /**
     * If this function was not called from a constructor,
     * call the `updateObject()` function for the class news channels extend
     */
    if (!fromConstructor) TextChannel._updateObject(newsChannel, newsChannelData);
}