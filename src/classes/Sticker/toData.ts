import { Sticker, StickerData } from "../../internal";

export default function toData(sticker: Sticker): StickerData {

    // Parse sticker data
    return {
        id: sticker.id,
        packID: sticker.packID,
        name: sticker.name,
        description: sticker.description,
        tags: sticker.tags,
        asset: sticker.asset,
        previewAsset: sticker.previewAsset,
        formatType: sticker.formatType
    };
}