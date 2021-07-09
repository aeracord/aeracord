import { AnyChannel, EditMessageData, Embed, Message, MessageResolvable, TextBasedChannel } from "../../internal";

export default function editMessage(channel: TextBasedChannel, message: MessageResolvable, contentOrEmbed: string | Embed | undefined, editMessageData: EditMessageData = {}): Promise<Message> {

    // Parse data
    if (typeof contentOrEmbed === "string") editMessageData.content = contentOrEmbed;
    else if (contentOrEmbed instanceof Embed) editMessageData.embeds = [contentOrEmbed];

    // Create message
    return channel.client.editMessage(channel as AnyChannel, message, editMessageData);
}