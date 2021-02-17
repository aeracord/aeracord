import { Client } from "../../../../internal";
import parseMember from "../parseMember";
import { MessageReactionAddData } from "./messageReactionAddData";
import { RawMessageReactionAddData } from "./rawMessageReactionAddData";

export default function messageReactionAdd(client: Client, rawData: RawMessageReactionAddData) {

    // Parse data
    const data: MessageReactionAddData = {
        messageID: rawData.message_id,
        channelID: rawData.channel_id,
        guildID: rawData.guild_id,
        userID: rawData.user_id,
        member: (rawData.member && rawData.guild_id) ? parseMember(client, rawData.member, rawData.guild_id) : undefined,
        emoji: {
            id: rawData.emoji.id || undefined,
            name: rawData.emoji.name || undefined,
            animated: Boolean(rawData.emoji.animated)
        }
    };

    // Emit event
    client.emit("messageReactionAdd", data, rawData);
}