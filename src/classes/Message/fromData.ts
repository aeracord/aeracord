import { Client, Message, MessageData } from "../../internal";

export default function fromData(client: Client, messageData: MessageData): Message {

    // Update cached message
    let message: Message | undefined = Message._updateObjectFromData(client, messageData);

    // Create message
    if (!message) message = new Message(client, messageData);

    // Return
    return message;
}