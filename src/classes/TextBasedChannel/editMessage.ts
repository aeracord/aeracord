import { EditMessageData, Embed, MessageData, MessageResolvable, TextBasedChannel } from "../../internal";

export default function editMessage(channel: TextBasedChannel, message: MessageResolvable, contentOrEmbed: string | Embed | undefined, editMessageData: EditMessageData = {}): Promise<MessageData> {

    // Parse data
    if (typeof contentOrEmbed === "string") editMessageData.content = contentOrEmbed;
    else if (contentOrEmbed instanceof Embed) editMessageData.embed = contentOrEmbed;

    // Create message
    return channel.client.editMessage(channel, message, editMessageData);
}