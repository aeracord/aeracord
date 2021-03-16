import { GuildChannel, StoreChannel, StoreChannelData } from "../../internal";

export default function updateObject(storeChannel: StoreChannel, storeChannelData: StoreChannelData, fromConstructor?: boolean) {

    /**
     * If this function was not called from a constructor,
     * call the `updateObject()` function for the class store channels extend
     */
    if (!fromConstructor) GuildChannel._updateObject(storeChannel, storeChannelData);
}