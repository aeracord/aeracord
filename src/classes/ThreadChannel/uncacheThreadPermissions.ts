import { Client } from "../../internal";

export interface UncacheThreadPermissionsData {
    id: string;
    guildID: string;
}

export default function uncacheThreadPermissions(client: Client, uncacheThreadPermissionsData: UncacheThreadPermissionsData) {

    // Remove from guild threads
    if (client._guildThreads) {
        const guildThreads: string[] | undefined = client._guildThreads.get(uncacheThreadPermissionsData.guildID);
        if ((guildThreads) && (guildThreads.includes(uncacheThreadPermissionsData.id))) guildThreads.splice(guildThreads.indexOf(uncacheThreadPermissionsData.id), 1);
    }

    // Remove from thread channels
    if (client._threadChannels) client._threadChannels.delete(uncacheThreadPermissionsData.id);
}