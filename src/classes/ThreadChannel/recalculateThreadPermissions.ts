import { Client, CHANNEL_TYPE_PRIVATE_THREAD, CHANNEL_TYPE_PUBLIC_THREAD, ThreadCacheData, ThreadChannel } from "../../internal";

/**
 * Recalculate Thread Permissions
 *
 * Recalculate all the thread channel permissions in a guild
 *
 * This module is run when permissions are updated for a role or channel as well as when the client's roles are updated
 * This module only uncaches thread permissions since gaining access to thread channels is handled by the `THREAD_LIST_SYNC` event
 */
export default function recalculateThreadPermissions(client: Client, guildID: string) {

    // Get the guilds threads
    const threads: string[] | undefined = client._guildThreads?.get(guildID);
    if (!threads) return;

    // Loop through the guilds threads
    threads.forEach((t: string) => {

        // Get the threads cache data
        const threadCacheData: ThreadCacheData | undefined = client._threadChannels?.get(t);

        // If the client cant access the thread
        if (
            threadCacheData &&
            (
                (
                    threadCacheData.type === CHANNEL_TYPE_PUBLIC_THREAD &&
                    !client.hasPermission("VIEW_CHANNEL", threadCacheData.parentID) &&
                    !client.hasPermission("MANAGE_THREADS", threadCacheData.parentID)
                ) ||
                (
                    threadCacheData.type === CHANNEL_TYPE_PRIVATE_THREAD &&
                    !client.hasPermission("MANAGE_THREADS", threadCacheData.parentID)
                )
            )
        ) {

            // Get thread channel
            const thread: ThreadChannel | undefined = client.threads.get(t) as ThreadChannel | undefined;

            // Mark as deleted
            if (thread) thread._markAsDeleted();

            // Uncache thread permissions
            ThreadChannel._uncacheThreadPermissions(client, {
                id: t,
                guildID
            });
        }
    });
}