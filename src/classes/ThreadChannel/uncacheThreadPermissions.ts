import { Client } from "../../internal";

export interface UncacheThreadPermissionsData {
    id: string;
    guildID: string;
}

export default function uncacheThreadPermissions(client: Client, uncacheThreadPermissionsData: UncacheThreadPermissionsData) {

    // Remove from guild threads
    const guildThreads: string[] | undefined = client._guildThreads.get(uncacheThreadPermissionsData.guildID);
    if ((guildThreads) && (guildThreads.includes(uncacheThreadPermissionsData.id))) guildThreads.splice(guildThreads.indexOf(uncacheThreadPermissionsData.id), 1);

    // Remove from thread channels
    client._threadChannels.delete(uncacheThreadPermissionsData.id);
}