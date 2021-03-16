import { Client, Message, MessageData } from "../../internal";

export default function fromRawData(client: Client, messageData: MessageData): Message {

    // Create message
    const message: Message = new Message(client, messageData);

    // Return
    return message;
}