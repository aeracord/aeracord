import { Client, Emoji, EmojiData, EmojiResolvable, FetchQueue, Guild, GuildResolvable, RawEmojiData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function getGuildEmoji(client: Client, guildResolvable: GuildResolvable, emojiResolvable: EmojiResolvable): Promise<EmojiData> {

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
    const result: RawEmojiData = await fetchQueue.request({
        path,
        method
    });

    // Parse emoji data
    const emojiData: EmojiData = Emoji._fromRawData(result, guildID);

    // Return
    return emojiData;
}