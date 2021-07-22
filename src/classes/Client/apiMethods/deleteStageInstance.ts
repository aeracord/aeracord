import { Channel, ChannelResolvable, Client, FetchQueue, PermissionError } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function deleteStageInstance(client: Client, channelResolvable: ChannelResolvable): Promise<void> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");

    // Missing permissions
    if (!client.hasPermission("MANAGE_CHANNELS", channelID)) throw new PermissionError({ permission: "MANAGE_CHANNELS" });
    if (!client.hasPermission("MUTE_MEMBERS", channelID)) throw new PermissionError({ permission: "MUTE_MEMBERS" });
    if (!client.hasPermission("MOVE_MEMBERS", channelID)) throw new PermissionError({ permission: "MOVE_MEMBERS" });

    // Define fetch data
    const path: string = `/stage-instances/${channelID}`;
    const method: string = "DELETE";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    await fetchQueue.request({
        path,
        method
    });
}