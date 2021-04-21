import { EditMessageData, Message, MessageEmbed } from "../../internal";

export default function edit(message: Message, channelID: string, contentOrEmbed: string | MessageEmbed | undefined, editMessageData: EditMessageData = {}): Promise<Message> {

    // Parse data
    if (typeof contentOrEmbed === "string") editMessageData.content = contentOrEmbed;
    else if (contentOrEmbed instanceof MessageEmbed) editMessageData.embed = contentOrEmbed;

    // Create message
    return message.client.editMessage(channelID, message, editMessageData);
}