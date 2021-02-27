import { StickerFormatType } from "../../internal";

export default interface RawStickerData {
    id: string;
    pack_id: string;
    name: string;
    description: string;
    tags?: string;
    asset: string;
    preview_asset: string;
    format_type: StickerFormatType;
}