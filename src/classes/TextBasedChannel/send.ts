import { AnyChannel, CreateMessageData, Embed, Message, TextBasedChannel } from "../../internal";

export default function send(channel: TextBasedChannel, contentOrData: string | Embed | CreateMessageData, createMessageData: CreateMessageData = {}): Promise<Message> {

    // Parse data
    if (typeof contentOrData === "string") createMessageData.content = contentOrData;
    else if (contentOrData instanceof Embed) createMessageData.embeds = [contentOrData];
    else createMessageData = contentOrData;

    // Create message
    return channel.client.createMessage(channel as AnyChannel, createMessageData);
}