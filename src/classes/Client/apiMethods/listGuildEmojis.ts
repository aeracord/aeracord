import { Client, Emoji, EmojiData, FetchQueue, Guild, GuildResolvable, RawEmojiData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function listGuildEmojis(client: Client, guildResolvable: GuildResolvable): Promise<EmojiData[]> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");

    // Define fetch data
    const path: string = `/guilds/${guildID}/emojis`;
    const method: string = "GET";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawEmojiData[] = await fetchQueue.request({
        path,
        method
    });

    // Parse emojis
    const emojis: EmojiData[] = result.map((e: RawEmojiData) => Emoji._fromRawData(client, e, guildID));

    // Return
    return emojis;
}