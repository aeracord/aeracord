import FormData from "form-data";
import { promises as fs } from "fs";
import { Channel, ChannelResolvable, Client, Embed, FetchQueue, Message, RawMessageData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface CreateMessageData {
    content?: string;
    tts?: boolean;
    embed?: Embed;
    allowedMentions?: AllowedMentions;
    messageReference?: CreateMessageReference;
    file?: CreateMessageFile;
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

export interface CreateMessageFile {
    file: Buffer | string;
    filename: string;
}

export default async function createMessage(client: Client, channelResolvable: ChannelResolvable, createMessageData: CreateMessageData): Promise<Message> {

    // Resolve objects
    const channelID: string | undefined = Channel.resolveID(channelResolvable);
    if (!channelID) throw new Error("Invalid channel resolvable");

    // Define fetch data
    const path: string = `/channels/${channelID}/messages`;
    const method: string = "POST";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Parse file
    if (typeof createMessageData.file?.file === "string") createMessageData.file.file = await fs.readFile(createMessageData.file.file);

    // Parse payload data
    const data: object = {
        content: createMessageData.content,
        tts: createMessageData.tts,
        embed: createMessageData.embed?._toJSON(),
        allowed_mentions: createMessageData.allowedMentions,
        message_reference: createMessageData.messageReference
    };

    // Parse form data
    let formData: FormData | undefined;
    if (createMessageData.file) {

        // Create form data
        formData = new FormData();

        // Add file
        formData.append("file", createMessageData.file.file, { filename: createMessageData.file.filename });

        // Add data
        formData.append("payload_json", JSON.stringify(data));
    }

    // Add to fetch queue
    const result: RawMessageData = await fetchQueue.request({
        path,
        method,
        contentType: createMessageData.file ? `multipart/form-data; boundary=${formData?.getBoundary()}` : "application/json",
        data: createMessageData.file ? formData : data
    });

    // Parse message
    const message: Message = Message._fromRawData(client, result);

    // Return
    return message;
}