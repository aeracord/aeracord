import { Client, Message, MessageData, RawMessageData } from "../../../../internal";

export default function messageCreate(client: Client, rawData: RawMessageData) {

    // Parse message data
    const messageData: MessageData = Message._fromRawData(client, rawData);

    // Emit event
    client.emit("messageCreate", messageData, {
        rawData,
        message: client.messages.get(messageData.id),
        guild: messageData.guildID ? client.guilds.get(messageData.guildID) : undefined,
        channel: client.channels.get(messageData.channelID)
    });
}