import { AllowedMentions, Channel, ChannelResolvable, Client, Embed, FetchQueue, Message, MessageResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";
import parseMessage from "../events/parseMessage";
import { RawMessageData } from "../events/rawMessageData";

export interface EditMessageData {
    content?: string;
    embed?: Embed;
    allowedMentions?: AllowedMentions;
    flags?: number;
}

export default async function editMessage(client: Client, channelResolvable: ChannelResolvable, messageResolvable: MessageResolvable, editMessageData: EditMessageData): Promise<Message> {

    // Resolve objects
    const channelID: string = Channel.resolveID(channelResolvable);
    const messageID: string = Message.resolveID(messageResolvable);

    // Define fetch data
    const path: string = `/channels/${channelID}/messages/${messageID}`;
    const method: string = "PATCH";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawMessageData = await fetchQueue.request({
        path,
        method,
        data: {
            content: editMessageData.content,
            embed: editMessageData.embed?._toJSON(),
            allowed_mentions: editMessageData.allowedMentions,
            flags: editMessageData.flags
        }
    });

    // Parse message
    const message: Message = parseMessage(client, result);

    // Return
    return message;
}