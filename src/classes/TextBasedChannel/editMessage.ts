import { EditMessageData, Message, MessageEmbed, MessageResolvable, TextBasedChannel } from "../../internal";

export default function editMessage(channel: TextBasedChannel, message: MessageResolvable, contentOrEmbed: string | MessageEmbed | undefined, editMessageData: EditMessageData = {}): Promise<Message> {

    // Parse data
    if (typeof contentOrEmbed === "string") editMessageData.content = contentOrEmbed;
    else if (contentOrEmbed instanceof MessageEmbed) editMessageData.embed = contentOrEmbed;

    // Create message
    return channel.client.editMessage(channel, message, editMessageData);
}