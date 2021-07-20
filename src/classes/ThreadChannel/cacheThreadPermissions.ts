import { Client, ThreadCacheData, ThreadChannelType } from "../../internal";

export interface CacheThreadPermissionsData {
    id: string;
    type: ThreadChannelType;
    guildID: string;
    parentID: string;
    creatorID: string;
    joined?: boolean;
}

export default function cacheThreadPermissions(client: Client, cacheThreadPermissionsData: CacheThreadPermissionsData) {

    // Add to guild threads
    if (client._guildThreads) {
        const guildThreads: string[] | undefined = client._guildThreads.get(cacheThreadPermissionsData.guildID);
        if (guildThreads) guildThreads.push(cacheThreadPermissionsData.id);
    }

    // Add to thread channels
    if (client._threadChannels) {

        // Get old thread cache data
        const oldThreadCacheData: ThreadCacheData | undefined = client._threadChannels.get(cacheThreadPermissionsData.id);

        // Add to thread channels
        client._threadChannels.set(cacheThreadPermissionsData.id, {
            type: cacheThreadPermissionsData.type,
            parentID: cacheThreadPermissionsData.parentID,
            joined: cacheThreadPermissionsData.joined === undefined ? Boolean(oldThreadCacheData?.joined) : cacheThreadPermissionsData.joined,
            createdByClient: cacheThreadPermissionsData.creatorID === client.id
        });
    }
}