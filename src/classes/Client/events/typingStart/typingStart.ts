import { Client, Member } from "../../../../internal";
import { RawTypingStartData } from "./rawTypingStartData";
import { TypingStartData } from "./typingStartData";

export default function typingStart(client: Client, rawData: RawTypingStartData) {

    // Parse data
    const data: TypingStartData = {
        guildID: rawData.guild_id || null,
        channelID: rawData.channel_id,
        userID: rawData.user_id,
        timestamp: rawData.timestamp,
        member: (rawData.member && rawData.guild_id) ? Member._fromRawData(rawData.member, rawData.guild_id) : null
    };

    // Emit event
    client.emit("typingStart", data, rawData);
}