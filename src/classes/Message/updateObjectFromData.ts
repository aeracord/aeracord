import { Client, Message, MessageData } from "../../internal";

export default function updateObjectFromData(client: Client, messageData: MessageData): Message | undefined {

    // Get message from cache
    let message: Message | undefined = client.messages.get(messageData.id);

    // Update message object
    if (message) Message._updateObject(message, messageData);

    // Return
    return message;
}