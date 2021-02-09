import { Client } from "../../../../internal";
import parseEmoji from "../parseEmoji";
import { RawEmojiData } from "../rawEmojiData";
import { GuildEmojisUpdateData } from "./guildEmojisUpdateData";
import { RawGuildEmojisUpdateData } from "./rawGuildEmojisUpdateData";

export default function guildEmojisUpdate(client: Client, rawData: RawGuildEmojisUpdateData) {

    // Parse data
    const data: GuildEmojisUpdateData = {
        guildID: rawData.guild_id,
        emojis: rawData.emojis.map((e: RawEmojiData) => parseEmoji(client, e))
    };

    // Emit event
    client.emit("guildEmojisUpdate", data, rawData);
}