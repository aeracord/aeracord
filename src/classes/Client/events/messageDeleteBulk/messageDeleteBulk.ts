import { Client, Message } from "../../../../internal";
import { MessageDeleteBulkData } from "./messageDeleteBulkData";
import { RawMessageDeleteBulkData } from "./rawMessageDeleteBulkData";

export default function messageDeleteBulk(client: Client, rawData: RawMessageDeleteBulkData) {

    // Parse data
    const data: MessageDeleteBulkData = {
        ids: rawData.ids,
        channelID: rawData.channel_id,
        guildID: rawData.guild_id || null
    };

    // Get messages
    const messages: Message[] = data.ids.map((id: string) => client.messages.get(id)).filter((m: Message | undefined) => m) as Message[];

    // Remove from cache
    messages.forEach((m: Message) => m.uncache());

    // Emit event
    client.emit("messageDeleteBulk", data, {
        rawData,
        messages,
        guild: data.guildID ? client.guilds.get(data.guildID) : undefined,
        channel: client.channels.get(data.channelID)
    });
}