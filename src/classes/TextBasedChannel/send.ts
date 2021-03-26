import { CreateMessageData, Embed, MessageData, TextBasedChannel } from "../../internal";

export default function send(channel: TextBasedChannel, contentOrEmbed: string | Embed | undefined, createMessageData: CreateMessageData = {}): Promise<MessageData> {

    // Parse data
    if (typeof contentOrEmbed === "string") createMessageData.content = contentOrEmbed;
    else if (contentOrEmbed instanceof Embed) createMessageData.embed = contentOrEmbed;

    // Create message
    return channel.client.createMessage(channel, createMessageData);
}