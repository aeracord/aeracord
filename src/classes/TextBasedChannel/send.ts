import { CreateMessageData, Embed, MessageData, TextBasedChannel } from "../../internal";

export default function send(channel: TextBasedChannel, contentOrData: string | Embed | CreateMessageData, createMessageData: CreateMessageData = {}): Promise<MessageData> {

    // Parse data
    if (typeof contentOrData === "string") createMessageData.content = contentOrData;
    else if (contentOrData instanceof Embed) createMessageData.embed = contentOrData;
    else createMessageData = contentOrData;

    // Create message
    return channel.client.createMessage(channel, createMessageData);
}