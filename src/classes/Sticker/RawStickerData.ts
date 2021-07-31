import { RawUserData, StickerFormatType, StickerType } from "../../internal";

export interface RawStickerData {
    id: string;
    guild_id?: string;
    name: string;
    description: string;
    pack_id?: string;
    type: StickerType;
    tags: string;
    format_type: StickerFormatType;
    available?: boolean;
    user?: RawUserData;
    sort_value?: number;
}

export interface RawStickerPackData {
    id: string;
    name: string;
    description: string;
    stickers: RawStickerData[];
    cover_sticker_id?: string;
    banner_asset_id: string;
    sku_id: string;
}