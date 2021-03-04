import { Client, Emoji, EmojiResolvable, FetchQueue, Guild, GuildResolvable, RawEmojiData } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface ModifyGuildEmojiData {
    name?: string;
    roles?: string[];
}

export default async function modifyGuildEmoji(client: Client, guildResolvable: GuildResolvable, emojiResolvable: EmojiResolvable, modifyGuildEmojiData: ModifyGuildEmojiData): Promise<Emoji> {

    // Resolve objects
    const guildID: string = Guild.resolveID(guildResolvable);
    const emojiID: string = Emoji.resolveID(emojiResolvable);

    // Define fetch data
    const path: string = `/guilds/${guildID}/emojis/${emojiID}`;
    const method: string = "PATCH";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawEmojiData = await fetchQueue.request({
        path,
        method,
        data: {
            name: modifyGuildEmojiData.name,
            roles: modifyGuildEmojiData.roles
        }
    });

    // Parse emoji
    const emoji: Emoji = Emoji._fromRawData(client, result, guildID);

    // Return
    return emoji;
}