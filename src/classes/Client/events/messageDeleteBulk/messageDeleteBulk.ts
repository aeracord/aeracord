import { Client } from "../../../../internal";
import { MessageDeleteBulkData } from "./messageDeleteBulkData";
import { RawMessageDeleteBulkData } from "./rawMessageDeleteBulkData";

export default function messageDeleteBulk(client: Client, rawData: RawMessageDeleteBulkData) {

    // Parse data
    const data: MessageDeleteBulkData = {
        ids: rawData.ids,
        channelID: rawData.channel_id,
        guildID: rawData.guild_id || null
    };

    // Emit event
    client.emit("messageDeleteBulk", data, rawData);
}