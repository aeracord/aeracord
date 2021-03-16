import { CategoryChannel, CategoryChannelData, GuildChannel } from "../../internal";

export default function updateObject(categoryChannel: CategoryChannel, categoryChannelData: CategoryChannelData, fromConstructor?: boolean) {

    /**
     * If this function was not called from a constructor,
     * call the `updateObject()` function for the class category channels extend
     */
    if (!fromConstructor) GuildChannel._updateObject(categoryChannel, categoryChannelData);
}