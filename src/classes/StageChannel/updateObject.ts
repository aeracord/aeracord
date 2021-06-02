import { GuildChannel, StageChannel, StageChannelData } from "../../internal";

export default function updateObject(stageChannel: StageChannel, stageChannelData: StageChannelData, fromConstructor?: boolean) {

    /**
     * If this function was not called from a constructor,
     * call the `updateObject()` function for the class stage channels extend
     */
    if (!fromConstructor) GuildChannel._updateObject(stageChannel, stageChannelData);
}