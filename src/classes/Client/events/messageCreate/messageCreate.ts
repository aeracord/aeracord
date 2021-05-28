import { Client, Message, RawMessageData, TextBasedChannel } from "../../../../internal";

export default function messageCreate(client: Client, rawData: RawMessageData) {

    // Parse message
    const message: Message = Message._fromRawData(client, rawData);

    // Get channel
    const channel: TextBasedChannel | undefined = client.channels.get(message.channelID) as TextBasedChannel | undefined;

    // Update last message ID
    if (channel) channel.lastMessageID = message.id;

    // Emit event
    client.emit("messageCreate", message, {
        rawData,
        guild: message.guildID ? client.guilds.get(message.guildID) : undefined,
        channel
    });
}