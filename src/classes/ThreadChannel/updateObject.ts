import { TextBasedChannel, ThreadChannel, ThreadChannelData } from "../../internal";

export default function updateObject(threadChannel: ThreadChannel, threadChannelData: ThreadChannelData, fromConstructor?: boolean) {

    // Set data
    threadChannel.name = threadChannelData.name;
    threadChannel.guildID = threadChannelData.guildID;
    threadChannel.parentID = threadChannelData.parentID;
    threadChannel.creatorID = threadChannelData.creatorID;
    threadChannel.archived = threadChannelData.archived;
    threadChannel.autoArchivedDuration = threadChannelData.autoArchivedDuration;
    threadChannel.archivedAt = threadChannelData.archivedAt;
    threadChannel.locked = threadChannelData.locked;
    threadChannel.member = threadChannelData.member;
    threadChannel.messageCount = threadChannelData.messageCount;
    threadChannel.memberCount = threadChannelData.memberCount;

    /**
     * If this function was not called from a constructor,
     * call the `updateObject()` function for the class thread channels extend
     */
    if (!fromConstructor) TextBasedChannel._updateObject(threadChannel, threadChannelData);
}