import { Client, Emoji, EmojiResolvable, FetchQueue, Guild, GuildResolvable, PermissionError } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function deleteGuildEmoji(client: Client, guildResolvable: GuildResolvable, emojiResolvable: EmojiResolvable, reason?: string): Promise<void> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");
    const emojiID: string | undefined = Emoji.resolveID(emojiResolvable);
    if (!emojiID) throw new Error("Invalid emoji resolvable");

    // Missing permissions
    if ((client._cacheStrategies.permissions.enabled) && (!client.hasPermission("MANAGE_EMOJIS", guildID))) throw new PermissionError({ permission: "MANAGE_EMOJIS" });

    // Define fetch data
    const path: string = `/guilds/${guildID}/emojis/${emojiID}`;
    const method: string = "DELETE";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    await fetchQueue.request({
        path,
        method,
        auditLogReason: reason
    });
}