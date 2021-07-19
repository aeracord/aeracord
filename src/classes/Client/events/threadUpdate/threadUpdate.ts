import { Channel, Client, RawChannelData, ThreadChannel, ThreadChannelData } from "../../../../internal";

export default function threadUpdate(client: Client, rawData: RawChannelData) {

    // Get old thread data
    const oldThread: ThreadChannel | undefined = client.threads.get(rawData.id) as ThreadChannel | undefined;
    const oldThreadData: ThreadChannelData | undefined = (oldThread && Channel.toData(oldThread)) as ThreadChannelData | undefined;

    // Parse thread
    const thread: ThreadChannel = Channel._fromRawData(client, rawData) as ThreadChannel;

    // If the thread is archived
    if (
        (
            !oldThread ||
            !oldThread.archived
        ) &&
        thread.archived
    ) {

        // Set the expire from cache at
        thread.expireFromCacheIn(thread._cacheManager.cacheArchivedFor || null);

        // Uncache thread permissions
        ThreadChannel._uncacheThreadPermissions(client, thread);
    }

    // If the thread is no longer archived
    if (
        (
            !oldThread ||
            oldThread.archived
        ) &&
        !thread.archived
    ) {

        // Set the expire from cache at
        thread.expireFromCacheIn(thread._cacheManager.cacheFor || null);

        // Cache thread permissions
        ThreadChannel._cacheThreadPermissions(client, thread);
    }

    // Emit event
    client.emit("threadUpdate", thread, {
        rawData,
        oldThreadData
    });
}