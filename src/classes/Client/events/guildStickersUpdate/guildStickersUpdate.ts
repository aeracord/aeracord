import { Client, Guild, GuildStickersUpdateData, RawGuildStickersUpdateData, RawStickerData, Sticker, StickerData } from "../../../../internal";

export default function guildStickersUpdate(client: Client, rawData: RawGuildStickersUpdateData) {

    // Get sticker IDs
    const stickerIDs: string[] = rawData.stickers.map((s: RawStickerData) => s.id);

    // Get old stickers data
    const oldStickers: Sticker[] = stickerIDs.map((s: string) => client.stickers.get(s)).filter((s: Sticker | undefined) => s) as Sticker[];
    const oldStickersData: StickerData[] = oldStickers.map((s: Sticker) => Sticker.toData(s));

    // Parse data
    const data: GuildStickersUpdateData = {
        guildID: rawData.guild_id,
        stickers: rawData.stickers.map((s: RawStickerData) => Sticker._fromRawData(client, s))
    };

    // Get guild
    const guild: Guild | undefined = client.guilds.get(data.guildID);

    // Update stickers
    if (guild) guild.stickerData = rawData.stickers.map((s: RawStickerData) => Sticker._dataFromRawData(client, s));

    // Mark as deleted
    const deletedStickers: Sticker[] = [...client.stickers.filter((s: Sticker) => s.guildID === data.guildID && !stickerIDs.includes(s.id)).values()];
    deletedStickers.forEach((s: Sticker) => s._markAsDeleted());

    // Get guild stickers
    const guildStickers: string[] | undefined = client._guildStickers.get(data.guildID);

    // Remove sticker guilds
    if (guildStickers) guildStickers.forEach((s: string) => client._stickerGuilds.delete(s));

    // Set sticker guilds
    stickerIDs.forEach((e: string) => client._stickerGuilds.set(e, data.guildID));

    // Set guild stickers
    client._guildStickers.set(data.guildID, stickerIDs);

    // Emit event
    client.emit("guildStickersUpdate", data, {
        rawData,
        guild,
        oldStickersData
    });
}