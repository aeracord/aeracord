import { RawStickerData } from "../../../../internal";

export interface RawGuildStickersUpdateData {
    guild_id: string;
    stickers: RawStickerData[];
}