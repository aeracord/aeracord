import { Client } from "../../../../internal";
import { MessageDeleteData } from "./messageDeleteData";
import { RawMessageDeleteData } from "./rawMessageDeleteData";

export default function messageDelete(client: Client, rawData: RawMessageDeleteData) {

    // Parse data
    const data: MessageDeleteData = {
        id: rawData.id,
        channelID: rawData.channel_id,
        guildID: rawData.guild_id
    };

    // Emit event
    client.emit("messageDelete", data, rawData);
}