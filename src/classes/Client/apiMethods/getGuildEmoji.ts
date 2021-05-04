import { APIError, Client, Emoji, EmojiResolvable, FetchQueue, Guild, GuildResolvable, RawEmojiData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function getGuildEmoji(client: Client, guildResolvable: GuildResolvable, emojiResolvable: EmojiResolvable): Promise<Emoji | undefined> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");
    const emojiID: string | undefined = Emoji.resolveID(emojiResolvable);
    if (!emojiID) throw new Error("Invalid emoji resolvable");

    // Define fetch data
    const path: string = `/guilds/${guildID}/emojis/${emojiID}`;
    const method: string = "GET";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    let unknownEmoji: boolean = false;
    const result: RawEmojiData = await fetchQueue.request({
        path,
        method
    }).catch((err: APIError) => {

        // Unknown emoji
        if (err.code === 10014) unknownEmoji = true;

        // Throw error
        else throw err;
    });

    // Unknown emoji
    if (unknownEmoji) return;

    // Parse emoji
    const emoji: Emoji = Emoji._fromRawData(client, result, guildID);

    // Return
    return emoji;
}