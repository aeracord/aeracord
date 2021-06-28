import { Channel, ChannelResolvable, Client, FetchQueue, Message, MessageResolvable, RawChannelData, ThreadChannel } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface StartThreadData {
    name: string;
    autoArchiveDuration?: number;
}

export default async function startPublicThread(client: Client, channelResolvable: ChannelResolvable, messageResolvable: MessageResolvable, startThreadData: StartThreadData): Promise<ThreadChannel> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");
    const messageID: string | undefined = Message.resolveID(messageResolvable);
    if (!messageID) throw new Error("Invalid message resolvable");

    // Define fetch data
    const path: string = `/channels/${channelID}/messages/${messageID}/threads`;
    const method: string = "POST";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawChannelData = await fetchQueue.request({
        path,
        method,
        data: {
            name: startThreadData.name,
            auto_archive_duration: startThreadData.autoArchiveDuration
        }
    });

    // Parse thread channel
    const threadChannel: ThreadChannel = Channel._fromRawData(client, result) as ThreadChannel;

    // Return
    return threadChannel;
}