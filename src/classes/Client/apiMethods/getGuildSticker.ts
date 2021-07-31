import { APIError, Client, FetchQueue, Guild, GuildResolvable, RawStickerData, Sticker, StickerResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function getGuildSticker(client: Client, guildResolvable: GuildResolvable, stickerResolvable: StickerResolvable): Promise<Sticker | undefined> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");
    const stickerID: string | undefined = Sticker.resolveID(stickerResolvable);
    if (!stickerID) throw new Error("Invalid sticker resolvable");

    // Define fetch data
    const path: string = `/guilds/${guildID}/stickers/${stickerID}`;
    const method: string = "GET";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    let unknownSticker: boolean = false;
    const result: RawStickerData = await fetchQueue.request({
        path,
        method
    }).catch((err: APIError) => {

        // Unknown sticker
        if (err.code === 10060) unknownSticker = true;

        // Throw error
        else throw err;
    });

    // Unknown sticker
    if (unknownSticker) return;

    // Parse sticker
    const sticker: Sticker = Sticker._fromRawData(client, result);

    // Return
    return sticker;
}