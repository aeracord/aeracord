import { Client, FetchQueue, Guild, GuildResolvable, PermissionError, Sticker, StickerResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function deleteGuildSticker(client: Client, guildResolvable: GuildResolvable, stickerResolvable: StickerResolvable, reason?: string): Promise<void> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");
    const stickerID: string | undefined = Sticker.resolveID(stickerResolvable);
    if (!stickerID) throw new Error("Invalid sticker resolvable");

    // Missing permissions
    if (!client.hasPermission("MANAGE_EMOJIS", guildID)) throw new PermissionError({ permission: "MANAGE_EMOJIS" });

    // Define fetch data
    const path: string = `/guilds/${guildID}/stickers/${stickerID}`;
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