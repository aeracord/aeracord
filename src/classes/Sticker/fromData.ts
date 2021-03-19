import { Client, Sticker, StickerData } from "../../internal";

export default function fromData(client: Client, stickerData: StickerData): Sticker {

    // Create sticker
    const sticker: Sticker = new Sticker(client, stickerData);

    // Return
    return sticker;
}