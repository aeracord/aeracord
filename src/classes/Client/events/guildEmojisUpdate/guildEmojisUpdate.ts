import { Client, Emoji, RawEmojiData } from "../../../../internal";
import { GuildEmojisUpdateData } from "./guildEmojisUpdateData";
import { RawGuildEmojisUpdateData } from "./rawGuildEmojisUpdateData";

export default function guildEmojisUpdate(client: Client, rawData: RawGuildEmojisUpdateData) {

    // Parse data
    const data: GuildEmojisUpdateData = {
        guildID: rawData.guild_id,
        emojis: rawData.emojis.map((e: RawEmojiData) => Emoji._fromRawData(e, rawData.guild_id))
    };

    // Emit event
    client.emit("guildEmojisUpdate", data, rawData);
}