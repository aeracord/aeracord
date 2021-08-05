import { Client, RawStickerData, Sticker, StickerData, User } from "../../internal";

export default function dataFromRawData(client: Client, rawData: RawStickerData): StickerData {

    // Parse sticker data
    const stickerData: StickerData = {
        id: rawData.id,
        guildID: rawData.guild_id || null,
        name: rawData.name,
        description: rawData.description,
        packID: rawData.pack_id || null,
        type: rawData.type,
        tags: rawData.tags,
        formatType: rawData.format_type,
        available: Boolean(rawData.available),
        creator: rawData.user ? User._dataFromRawData(client, rawData.user) : null,
        sortValue: rawData.sort_value === undefined ? null : rawData.sort_value,
        fetchedAt: Date.now()
    };

    // Update cached sticker
    Sticker._updateObjectFromData(client, stickerData);

    // Return
    return stickerData;
}