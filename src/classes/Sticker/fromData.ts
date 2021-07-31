import { Client, Sticker, StickerData } from "../../internal";

export default function fromData(client: Client, stickerData: StickerData): Sticker {

    // Update cached sticker
    let sticker: Sticker | undefined = Sticker._updateObjectFromData(client, stickerData);

    // Create sticker
    if (!sticker) sticker = new Sticker(client, stickerData);

    // Return
    return sticker;
}