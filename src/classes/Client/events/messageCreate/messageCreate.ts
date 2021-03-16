import { Client, Message, MessageData, RawMessageData } from "../../../../internal";

export default function messageCreate(client: Client, rawData: RawMessageData) {

    // Parse message data
    const messageData: MessageData = Message._fromRawData(rawData);

    // Emit event
    client.emit("messageCreate", messageData, rawData);
}