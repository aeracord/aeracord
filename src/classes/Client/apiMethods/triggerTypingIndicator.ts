import { Channel, ChannelResolvable, Client, FetchQueue, PermissionError } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function triggerTypingIndicator(client: Client, channelResolvable: ChannelResolvable): Promise<void> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");

    // Missing permissions
    if (!client.hasPermission("SEND_MESSAGES", channelID)) throw new PermissionError({ permission: "SEND_MESSAGES" });

    // Define fetch data
    const path: string = `/channels/${channelID}/typing`;
    const method: string = "POST";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    await fetchQueue.request({
        path,
        method
    });
}