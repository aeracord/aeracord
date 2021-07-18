import { Channel, Client, RawChannelData, ThreadChannel, ThreadChannelData } from "../../../../internal";

export default function threadUpdate(client: Client, rawData: RawChannelData) {

    // Get old thread data
    const oldThread: ThreadChannel | undefined = client.threads.get(rawData.id) as ThreadChannel | undefined;
    const oldThreadData: ThreadChannelData | undefined = (oldThread && Channel.toData(oldThread)) as ThreadChannelData | undefined;

    // Parse thread
    const thread: ThreadChannel = Channel._fromRawData(client, rawData) as ThreadChannel;

    // If the thread is archived, set the expire from cache at
    if (
        (
            !oldThread ||
            !oldThread.archived
        ) &&
        thread.archived
    ) thread.expireFromCacheIn(thread._cacheManager.cacheArchivedFor || null);

    // If the thread is no longer archived, set the expire from cache at
    if (
        (
            !oldThread ||
            oldThread.archived
        ) &&
        !thread.archived
    ) thread.expireFromCacheIn(thread._cacheManager.cacheFor || null);

    // Emit event
    client.emit("threadUpdate", thread, {
        rawData,
        oldThreadData
    });
}