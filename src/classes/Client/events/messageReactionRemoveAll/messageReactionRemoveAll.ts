import { Client } from "../../../../internal";
import { MessageReactionRemoveAllData } from "./messageReactionRemoveAllData";
import { RawMessageReactionRemoveAllData } from "./rawMessageReactionRemoveAllData";

export default function messageReactionRemoveAll(client: Client, rawData: RawMessageReactionRemoveAllData) {

    // Parse data
    const data: MessageReactionRemoveAllData = {
        messageID: rawData.message_id,
        channelID: rawData.channel_id,
        guildID: rawData.guild_id
    };

    // Emit event
    client.emit("messageReactionRemoveAll", data, rawData);
}