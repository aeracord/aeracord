import { StickerResolvable } from "../../internal";

export default function resolveID(stickerResolvable: StickerResolvable): string | undefined {

    // Sticker
    if ((typeof stickerResolvable === "object") && ("id" in stickerResolvable)) return stickerResolvable.id;

    // Sticker ID
    else if (typeof stickerResolvable === "string") return stickerResolvable;
}