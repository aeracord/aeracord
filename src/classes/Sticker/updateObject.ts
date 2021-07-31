import { Sticker, StickerData, User } from "../../internal";

export default function updateObject(sticker: Sticker, stickerData: StickerData) {

    // If the `StickerData` was fetched before the `Sticker` object was last updated, dont update anything
    if (stickerData.fetchedAt < sticker._lastUpdatedAt) return;

    // Unmark as deleted
    if (sticker.deleted) sticker._unmarkAsDeleted();

    // Set data
    sticker.guildID = stickerData.guildID;
    sticker.name = stickerData.name;
    sticker.description = stickerData.description;
    sticker.packID = stickerData.packID;
    sticker.type = stickerData.type;
    sticker.tags = stickerData.tags;
    sticker.formatType = stickerData.formatType;
    sticker.available = stickerData.available;
    sticker.creator = stickerData.creator && User.fromData(sticker.client, stickerData.creator);
    sticker.sortValue = stickerData.sortValue;
    sticker._lastUpdatedAt = Date.now();
}