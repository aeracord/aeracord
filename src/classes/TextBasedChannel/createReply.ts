import { CreateMessageData, Embed, Message, MessageResolvable, TextBasedChannel } from "../../internal";

export default function createReply(channel: TextBasedChannel, messageResolvable: MessageResolvable, contentOrData: string | Embed | CreateMessageData, createMessageData: CreateMessageData = {}): Promise<Message> {

    const messageID: string | undefined = Message.resolveID(messageResolvable);
    if (!messageID) throw new Error("Invalid message resolvable");

    // Parse data
    if (typeof contentOrData === "string") createMessageData.content = contentOrData;
    else if (contentOrData instanceof Embed) createMessageData.embed = contentOrData;
    else createMessageData = contentOrData;

    // Set message reference
    createMessageData.messageReference = { id: messageID };

    // Create message
    return channel.client.createMessage(channel, createMessageData);
}