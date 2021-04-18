import { Client, Message, RawMessageData, TextBasedChannel } from "../../../../internal";

export default function messageCreate(client: Client, rawData: RawMessageData) {

    // Parse message
    const message: Message = Message._fromRawData(client, rawData);

    // Get channel
    const channel: TextBasedChannel | undefined = client.channels.get(message.channelID) as TextBasedChannel | undefined;

    // Update last message ID
    if (channel) channel.lastMessageID = message.id;

    // Resolve pending interaction response message
    if (rawData.interaction) {

        // Get pending interaction response message
        const resolvePendingMessage: Function | undefined = client._pendingInteractionResponseMessages.get(rawData.interaction.id);

        // Remove pending interaction response message
        client._pendingInteractionResponseMessages.delete(rawData.interaction.id);

        // Resolve message
        if (resolvePendingMessage) resolvePendingMessage(message);
    }

    // Emit event
    client.emit("messageCreate", message, {
        rawData,
        guild: message.guildID ? client.guilds.get(message.guildID) : undefined,
        channel
    });
}