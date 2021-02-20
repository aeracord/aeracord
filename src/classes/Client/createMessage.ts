import { Client, Embed, FetchQueue, Message } from "../../internal";
import getRoute from "../../util/getRoute";
import parseMessage from "./events/parseMessage";
import { RawMessageData } from "./events/rawMessageData";

export interface CreateMessageData {
    content?: string;
    tts?: boolean;
    embed?: Embed;
    allowedMentions?: AllowedMentions;
    messageReference?: CreateMessageReference;
}

export interface AllowedMentions {
    parse?: AllowedMentionType[];
    users?: string[];
    roles?: string[];
    repliedUser?: boolean;
}

export type AllowedMentionType = "users" | "roles" | "everyone";

export interface CreateMessageReference {
    id: string;
    failIfNotExists?: boolean;
}

export default async function createMessage(client: Client, channelID: string, messageData: CreateMessageData): Promise<Message> {

    // Define fetch data
    const path: string = `/channels/${channelID}/messages`;
    const method: string = "POST";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawMessageData = await fetchQueue.request({
        path,
        method,
        data: {
            content: messageData.content,
            tts: messageData.tts,
            embed: messageData.embed?._toJSON(),
            allowed_mentions: messageData.allowedMentions,
            message_reference: messageData.messageReference
        }
    });

    // Parse message
    const message: Message = parseMessage(client, result);

    // Return
    return message;
}