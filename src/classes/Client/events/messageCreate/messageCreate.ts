import { Client, Message } from "../../../../internal";
import parseMessage from "../parseMessage";
import { RawMessageData } from "../rawMessageData";

export default function messageCreate(client: Client, rawData: RawMessageData) {

    // Parse message
    const message: Message = parseMessage(client, rawData);

    // Emit event
    client.emit("messageCreate", message, rawData);
}