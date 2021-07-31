import { Client, FetchQueue, RawStickerData, RawStickerPackData, Sticker, StickerPack } from "../../../internal";
import getRoute from "../../../util/getRoute";

interface RawListStickerPacksData {
    sticker_packs: RawStickerPackData[];
}

export interface ListStickerPacksData {
    stickerPacks: StickerPack[];
}

export default async function listNitroStickerPacks(client: Client): Promise<ListStickerPacksData> {

    // Define fetch data
    const path: string = "/sticker-packs";
    const method: string = "GET";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawListStickerPacksData = await fetchQueue.request({
        path,
        method
    });

    // Return
    return {
        stickerPacks: result.sticker_packs.map((s: RawStickerPackData) => ({
            id: s.id,
            name: s.name,
            description: s.description,
            stickers: s.stickers.map((s: RawStickerData) => Sticker._dataFromRawData(s)),
            coverStickerID: s.cover_sticker_id || null,
            bannerAssetID: s.banner_asset_id,
            skuID: s.sku_id
        }))
    };
}