import { Client } from "../../../../internal";
import parseMember from "../parseMember";
import { RawTypingStartData } from "./rawTypingStartData";
import { TypingStartData } from "./typingStartData";

export default function typingStart(client: Client, rawData: RawTypingStartData) {

    // Parse data
    const data: TypingStartData = {
        guildID: rawData.guild_id,
        channelID: rawData.channel_id,
        userID: rawData.user_id,
        timestamp: rawData.timestamp,
        member: (rawData.member && rawData.guild_id) ? parseMember(client, rawData.member, rawData.guild_id) : undefined
    };

    // Emit event
    client.emit("typingStart", data, rawData);
}