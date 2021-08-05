import { Client, Message, MessageData } from "../../internal";

export default function fromData(client: Client, messageData: MessageData): Message {

    // Get message from cache
    let message: Message | undefined = client.messages.get(messageData.id);

    // Create message
    if (!message) message = new Message(client, messageData);

    // Return
    return message;
}