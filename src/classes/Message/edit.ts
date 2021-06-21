import { EditMessageData, Embed, Message } from "../../internal";

export default function edit(message: Message, channelID: string, contentOrEmbed: string | Embed | undefined, editMessageData: EditMessageData = {}): Promise<Message> {

    // Parse data
    if (typeof contentOrEmbed === "string") editMessageData.content = contentOrEmbed;
    else if (contentOrEmbed instanceof Embed) editMessageData.embeds = [contentOrEmbed];

    // Create message
    return message.client.editMessage(channelID, message, editMessageData);
}