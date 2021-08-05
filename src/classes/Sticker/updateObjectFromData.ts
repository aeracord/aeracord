import { Client, Sticker, StickerData } from "../../internal";

export default function updateObjectFromData(client: Client, stickerData: StickerData) {

    // Get sticker from cache
    let sticker: Sticker | undefined = client.stickers.get(stickerData.id);

    // Update sticker object
    if (sticker) Sticker._updateObject(sticker, stickerData);
}