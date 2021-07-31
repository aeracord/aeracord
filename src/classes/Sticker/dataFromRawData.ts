import { RawStickerData, StickerData, User } from "../../internal";

export default function dataFromRawData(rawData: RawStickerData): StickerData {

    // Parse sticker data
    return {
        id: rawData.id,
        guildID: rawData.guild_id || null,
        name: rawData.name,
        description: rawData.description,
        packID: rawData.pack_id || null,
        type: rawData.type,
        tags: rawData.tags,
        formatType: rawData.format_type,
        available: Boolean(rawData.available),
        creator: rawData.user ? User._dataFromRawData(rawData.user) : null,
        sortValue: rawData.sort_value === undefined ? null : rawData.sort_value,
        fetchedAt: Date.now()
    };
}