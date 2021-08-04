import { Client, FetchQueue, Guild, GuildResolvable, RawStickerData, Sticker } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function listGuildStickers(client: Client, guildResolvable: GuildResolvable): Promise<Sticker[]> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");

    // Define fetch data
    const path: string = `/guilds/${guildID}/stickers`;
    const method: string = "GET";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawStickerData[] = await fetchQueue.request({
        path,
        method
    });

    // Parse stickers
    const stickers: Sticker[] = result.map((s: RawStickerData) => Sticker._fromRawData(client, s));

    // Return
    return stickers;
}