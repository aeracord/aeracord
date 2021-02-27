import { Client, Message, RawMessageData } from "../../../../internal";

export default function messageCreate(client: Client, rawData: RawMessageData) {

    // Parse message
    const message: Message = Message._fromRawData(client, rawData);

    // Emit event
    client.emit("messageCreate", message, rawData);
}