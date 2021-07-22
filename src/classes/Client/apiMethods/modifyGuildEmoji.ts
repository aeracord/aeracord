import { Client, Emoji, EmojiResolvable, FetchQueue, Guild, GuildResolvable, PermissionError, RawEmojiData, Role, RoleResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface ModifyGuildEmojiData {
    name?: string;
    roles?: RoleResolvable[];
}

export default async function modifyGuildEmoji(client: Client, guildResolvable: GuildResolvable, emojiResolvable: EmojiResolvable, modifyGuildEmojiData: ModifyGuildEmojiData, reason?: string): Promise<Emoji> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");
    const emojiID: string | undefined = Emoji.resolveID(emojiResolvable);
    if (!emojiID) throw new Error("Invalid emoji resolvable");
    const roles: Array<string | undefined> | undefined = modifyGuildEmojiData.roles?.map((r: RoleResolvable) => Role.resolveID(r));
    if (roles?.find((r: string | undefined) => !r)) throw new Error("Invalid role resolvable in array of allowed roles");

    // Missing permissions
    if (!client.hasPermission("MANAGE_EMOJIS", guildID)) throw new PermissionError({ permission: "MANAGE_EMOJIS" });

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
            roles: roles
        },
        auditLogReason: reason
    });

    // Parse emoji
    const emoji: Emoji = Emoji._fromRawData(client, result, guildID);

    // Return
    return emoji;
}