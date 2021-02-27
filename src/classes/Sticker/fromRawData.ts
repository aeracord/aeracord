import { Client, RawStickerData, Sticker } from "../../internal";

export default function fromRawData(client: Client, rawData: RawStickerData): Sticker {

    // Parse sticker
    const sticker: Sticker = new Sticker(client, {
        id: rawData.id,
        packID: rawData.pack_id,
        name: rawData.name,
        description: rawData.description,
        tags: rawData.tags,
        asset: rawData.asset,
        previewAsset: rawData.preview_asset,
        formatType: rawData.format_type
    });

    // Return
    return sticker;
}