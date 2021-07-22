import { Client, Emoji, EmojiData, Guild, GuildEmojisUpdateData, RawEmojiData, RawGuildEmojisUpdateData } from "../../../../internal";

export default function guildEmojisUpdate(client: Client, rawData: RawGuildEmojisUpdateData) {

    // Get emoji IDs
    const emojiIDs: string[] = rawData.emojis.map((e: RawEmojiData) => e.id);

    // Get old emojis data
    const oldEmojis: Emoji[] = emojiIDs.map((e: string) => client.emojis.get(e)).filter((e: Emoji | undefined) => e) as Emoji[];
    const oldEmojisData: EmojiData[] = oldEmojis.map((e: Emoji) => Emoji.toData(e));

    // Parse data
    const data: GuildEmojisUpdateData = {
        guildID: rawData.guild_id,
        emojis: rawData.emojis.map((e: RawEmojiData) => Emoji._fromRawData(client, e, rawData.guild_id))
    };

    // Get guild
    const guild: Guild | undefined = client.guilds.get(data.guildID);

    // Update emojis
    if (guild) guild.emojiData = rawData.emojis.map((e: RawEmojiData) => Emoji._dataFromRawData(e, rawData.guild_id));

    // Mark as deleted
    const deletedEmojis: Emoji[] = [...client.emojis.filter((e: Emoji) => e.guildID === data.guildID && !emojiIDs.includes(e.id)).values()];
    deletedEmojis.forEach((e: Emoji) => e._markAsDeleted());

    // Get guild emojis
    const guildEmojis: string[] | undefined = client._guildEmojis.get(data.guildID);

    // Remove emoji guilds
    if (guildEmojis) guildEmojis.forEach((e: string) => client._emojiGuilds.delete(e));

    // Set emoji guilds
    emojiIDs.forEach((e: string) => client._emojiGuilds.set(e, data.guildID));

    // Set guild emojis
    client._guildEmojis.set(data.guildID, emojiIDs);

    // Emit event
    client.emit("guildEmojisUpdate", data, {
        rawData,
        guild,
        oldEmojisData
    });
}