import { Client, Emoji, FetchQueue, Guild, GuildResolvable, PermissionError, RawEmojiData, Role, RoleResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface CreateGuildEmojiData {
    name: string;
    image: string;
    roles?: RoleResolvable[];
}

export default async function createGuildEmoji(client: Client, guildResolvable: GuildResolvable, createGuildEmojiData: CreateGuildEmojiData, reason?: string): Promise<Emoji> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");
    const roles: Array<string | undefined> | undefined = createGuildEmojiData.roles?.map((r: RoleResolvable) => Role.resolveID(r));
    if (roles?.find((r: string | undefined) => !r)) throw new Error("Invalid role resolvable in array of allowed roles");

    // Missing permissions
    if (!client.hasPermission("MANAGE_EMOJIS_AND_STICKERS", guildID)) throw new PermissionError({ permission: "MANAGE_EMOJIS_AND_STICKERS" });

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
            roles: roles || []
        },
        auditLogReason: reason
    });

    // Parse emoji
    const emoji: Emoji = Emoji._fromRawData(client, result, guildID);

    // Return
    return emoji;
}