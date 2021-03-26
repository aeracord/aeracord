import { Client, Member } from "../../../../internal";
import { MessageReactionAddData } from "./messageReactionAddData";
import { RawMessageReactionAddData } from "./rawMessageReactionAddData";

export default function messageReactionAdd(client: Client, rawData: RawMessageReactionAddData) {

    // Parse data
    const data: MessageReactionAddData = {
        messageID: rawData.message_id,
        channelID: rawData.channel_id,
        guildID: rawData.guild_id || null,
        userID: rawData.user_id,
        member: (rawData.member && rawData.guild_id) ? Member._fromRawData(client, rawData.member, rawData.guild_id) : null,
        emoji: {
            id: rawData.emoji.id,
            name: rawData.emoji.name,
            animated: Boolean(rawData.emoji.animated)
        }
    };

    // Emit event
    client.emit("messageReactionAdd", data, {
        rawData,
        message: client.messages.get(data.messageID),
        guild: data.guildID ? client.guilds.get(data.guildID) : undefined,
        channel: client.channels.get(data.channelID),
        user: client.users.get(data.userID)
    });
}