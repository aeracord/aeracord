import { Client, Member, RawTypingStartData, TypingStartData } from "../../../../internal";

export default function typingStart(client: Client, rawData: RawTypingStartData) {

    // Parse data
    const data: TypingStartData = {
        guildID: rawData.guild_id || null,
        channelID: rawData.channel_id,
        userID: rawData.user_id,
        timestamp: rawData.timestamp,
        member: (rawData.member && rawData.guild_id) ? Member._fromRawData(client, rawData.member, rawData.guild_id) : null
    };

    // Emit event
    client.emit("typingStart", data, {
        rawData,
        channel: client.channels.get(data.channelID),
        user: client.users.get(data.userID)
    });
}