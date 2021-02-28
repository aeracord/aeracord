import { Client, Emoji, FetchQueue, Guild, GuildResolvable, RawEmojiData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface CreateGuildEmojiData {
    name: string;
    image: string;
    roles?: string[];
}

export default async function createGuildEmoji(client: Client, guildResolvable: GuildResolvable, createGuildEmojiData: CreateGuildEmojiData): Promise<Emoji> {

    // Resolve objects
    const guildID: string = Guild.resolveID(guildResolvable);

    // Define fetch data
    const path: string = `/guilds/${guildID}/emojis`;
    const method: string = "POST";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawEmojiData = await fetchQueue.request({
        path,
        method,
        data: {
            name: createGuildEmojiData.name,
            image: createGuildEmojiData.image,
            roles: createGuildEmojiData.roles || []
        }
    });

    // Parse emoji
    const emoji: Emoji = Emoji._fromRawData(client, result);

    // Return
    return emoji;
}