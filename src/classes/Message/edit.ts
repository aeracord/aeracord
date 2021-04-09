import { EditMessageData, Embed, Message, MessageData } from "../../internal";

export default function edit(message: Message, channelID: string, contentOrEmbed: string | Embed | undefined, editMessageData: EditMessageData = {}): Promise<MessageData> {

    // Parse data
    if (typeof contentOrEmbed === "string") editMessageData.content = contentOrEmbed;
    else if (contentOrEmbed instanceof Embed) editMessageData.embed = contentOrEmbed;

    // Create message
    return message.client.editMessage(channelID, message, editMessageData);
}