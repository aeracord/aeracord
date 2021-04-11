import { Client, Message, MessageData, RawMessageData, TextBasedChannel } from "../../../../internal";

export default function messageCreate(client: Client, rawData: RawMessageData) {

    // Parse message data
    const messageData: MessageData = Message._fromRawData(client, rawData);

    // Get channel
    const channel: TextBasedChannel | undefined = client.channels.get(messageData.channelID) as TextBasedChannel | undefined;

    // Update last message ID
    if (channel) channel.lastMessageID = messageData.id;

    // Resolve pending interaction response message
    if (rawData.interaction) {

        // Get pending interaction response message
        const resolvePendingMessage: Function | undefined = client._pendingInteractionResponseMessages.get(rawData.interaction.id);

        // Remove pending interaction response message
        client._pendingInteractionResponseMessages.delete(rawData.interaction.id);

        // Resolve message
        if (resolvePendingMessage) resolvePendingMessage(messageData);
    }

    // Emit event
    client.emit("messageCreate", messageData, {
        rawData,
        message: client.messages.get(messageData.id),
        guild: messageData.guildID ? client.guilds.get(messageData.guildID) : undefined,
        channel
    });
}