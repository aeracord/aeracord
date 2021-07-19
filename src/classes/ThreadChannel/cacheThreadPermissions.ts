import { Client, ThreadChannelType } from "../../internal";

export interface CacheThreadPermissionsData {
    id: string;
    type: ThreadChannelType;
    guildID: string;
    parentID: string;
}

export default function cacheThreadPermissions(client: Client, cacheThreadPermissionsData: CacheThreadPermissionsData) {

    // Add to guild threads
    if (client._guildThreads) {
        const guildThreads: string[] | undefined = client._guildThreads.get(cacheThreadPermissionsData.guildID);
        if (guildThreads) guildThreads.push(cacheThreadPermissionsData.id);
    }

    // Add to thread channels
    if (client._threadChannels) client._threadChannels.set(cacheThreadPermissionsData.id, {
        type: cacheThreadPermissionsData.type,
        parentID: cacheThreadPermissionsData.parentID
    });
}