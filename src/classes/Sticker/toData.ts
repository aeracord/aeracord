import { Sticker, StickerData, User } from "../../internal";

export default function toData(sticker: Sticker): StickerData {

    // Parse sticker data
    return {
        id: sticker.id,
        guildID: sticker.guildID,
        name: sticker.name,
        description: sticker.description,
        packID: sticker.packID,
        type: sticker.type,
        tags: sticker.tags,
        formatType: sticker.formatType,
        available: sticker.available,
        creator: sticker.creator && User.toData(sticker.creator),
        sortValue: sticker.sortValue,
        fetchedAt: sticker._lastUpdatedAt
    };
}