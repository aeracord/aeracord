import { CreateMessageData, Embed, Message } from "../../internal";

export default function reply(message: Message, contentOrData: string | Embed | CreateMessageData, createMessageData: CreateMessageData = {}): Promise<Message> {

    // Parse data
    if (typeof contentOrData === "string") createMessageData.content = contentOrData;
    else if (contentOrData instanceof Embed) createMessageData.embed = contentOrData;
    else createMessageData = contentOrData;

    // Set message reference
    createMessageData.messageReference = { id: message.id };

    // Create message
    return message.client.createMessage(message.channelID, createMessageData);
}