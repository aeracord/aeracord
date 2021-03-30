import { Client, Message } from "../../../../internal";
import { MessageReactionRemoveAllData } from "./messageReactionRemoveAllData";
import { RawMessageReactionRemoveAllData } from "./rawMessageReactionRemoveAllData";

export default function messageReactionRemoveAll(client: Client, rawData: RawMessageReactionRemoveAllData) {

    // Parse data
    const data: MessageReactionRemoveAllData = {
        messageID: rawData.message_id,
        channelID: rawData.channel_id,
        guildID: rawData.guild_id
    };

    // Get message
    const message: Message | undefined = client.messages.get(data.messageID);

    // Remove reactions
    if (message) message.reactions = [];

    // Emit event
    client.emit("messageReactionRemoveAll", data, {
        rawData,
        message,
        guild: data.guildID ? client.guilds.get(data.guildID) : undefined,
        channel: client.channels.get(data.channelID)
    });
}