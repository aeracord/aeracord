import { Channel, ChannelResolvable, Client, FetchQueue, Message, MessageResolvable, PermissionError } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function deletePinnedChannelMessage(client: Client, channelResolvable: ChannelResolvable, messageResolvable: MessageResolvable, reason?: string): Promise<void> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");
    const messageID: string | undefined = Message.resolveID(messageResolvable);
    if (!messageID) throw new Error("Invalid message resolvable");

    // Missing permissions
    if (!client.hasPermission("MANAGE_MESSAGES", channelID)) throw new PermissionError({ permission: "MANAGE_MESSAGES" });

    // Define fetch data
    const path: string = `/channels/${channelID}/pins/${messageID}`;
    const method: string = "DELETE";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    await fetchQueue.request({
        path,
        method,
        auditLogReason: reason
    });
}