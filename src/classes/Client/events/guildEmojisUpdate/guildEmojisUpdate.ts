import { Client, Emoji, EmojiData, Guild, GuildEmojisUpdateData, RawEmojiData, RawGuildEmojisUpdateData } from "../../../../internal";

export default function guildEmojisUpdate(client: Client, rawData: RawGuildEmojisUpdateData) {

    // Parse data
    const data: GuildEmojisUpdateData = {
        guildID: rawData.guild_id,
        emojis: rawData.emojis.map((e: RawEmojiData) => Emoji._fromRawData(client, e, rawData.guild_id))
    };

    // Get emoji IDs
    const emojiIDs: string[] = data.emojis.map((e: EmojiData) => e.id);

    // Get guild
    const guild: Guild | undefined = client.guilds.get(data.guildID);

    // Update emojis
    if (guild) guild.emojiData = data.emojis;

    // Mark as deleted
    const deletedEmojis: Emoji[] = [...client.emojis.filter((e: Emoji) => e.guildID === data.guildID && !emojiIDs.includes(e.id)).values()];
    deletedEmojis.forEach((e: Emoji) => e._markAsDeleted());

    // Remove emoji guilds
    if (client._emojiGuilds) {

        // Get guild emojis
        const guildEmojis: string[] | undefined = client._guildEmojis?.get(data.guildID);

        // Remove emoji guilds
        if (guildEmojis) guildEmojis.forEach((e: string) => client._emojiGuilds?.delete(e));
    }

    // Set emoji guilds
    if (client._emojiGuilds) emojiIDs.forEach((e: string) => client._emojiGuilds?.set(e, data.guildID));

    // Set guild emojis
    if (client._guildEmojis) client._guildEmojis.set(data.guildID, emojiIDs);

    // Emit event
    client.emit("guildEmojisUpdate", data, {
        rawData,
        guild
    });
}