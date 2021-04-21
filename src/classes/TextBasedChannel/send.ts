import { CreateMessageData, Message, MessageEmbed, TextBasedChannel } from "../../internal";

export default function send(channel: TextBasedChannel, contentOrData: string | MessageEmbed | CreateMessageData, createMessageData: CreateMessageData = {}): Promise<Message> {

    // Parse data
    if (typeof contentOrData === "string") createMessageData.content = contentOrData;
    else if (contentOrData instanceof MessageEmbed) createMessageData.embed = contentOrData;
    else createMessageData = contentOrData;

    // Create message
    return channel.client.createMessage(channel, createMessageData);
}