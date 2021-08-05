import { Client, Sticker, StickerData } from "../../internal";

export default function fromData(client: Client, stickerData: StickerData): Sticker {

    // Get sticker from cache
    let sticker: Sticker | undefined = client.stickers.get(stickerData.id);

    // Create sticker
    if (!sticker) sticker = new Sticker(client, stickerData);

    // Return
    return sticker;
}