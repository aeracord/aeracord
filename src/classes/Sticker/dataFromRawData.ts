import { RawStickerData, StickerData } from "../../internal";

export default function dataFromRawData(rawData: RawStickerData): StickerData {

    // Parse sticker data
    return {
        id: rawData.id,
        packID: rawData.pack_id,
        name: rawData.name,
        description: rawData.description,
        tags: rawData.tags || null,
        asset: rawData.asset,
        previewAsset: rawData.preview_asset,
        formatType: rawData.format_type
    };
}