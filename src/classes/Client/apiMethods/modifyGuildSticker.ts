import { Client, FetchQueue, Guild, GuildResolvable, PermissionError, RawStickerData, Sticker, StickerResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface ModifyGuildStickerData {
    name?: string;
    description?: string | null;
    tags?: string;
}

export default async function modifyGuildSticker(client: Client, guildResolvable: GuildResolvable, stickerResolvable: StickerResolvable, modifyGuildStickerData: ModifyGuildStickerData, reason?: string): Promise<Sticker> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");
    const stickerID: string | undefined = Sticker.resolveID(stickerResolvable);
    if (!stickerID) throw new Error("Invalid sticker resolvable");

    // Missing permissions
    if (!client.hasPermission("MANAGE_EMOJIS_AND_STICKERS", guildID)) throw new PermissionError({ permission: "MANAGE_EMOJIS_AND_STICKERS" });

    // Define fetch data
    const path: string = `/guilds/${guildID}/stickers/${stickerID}`;
    const method: string = "PATCH";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawStickerData = await fetchQueue.request({
        path,
        method,
        data: {
            name: modifyGuildStickerData.name,
            description: modifyGuildStickerData.description,
            tags: modifyGuildStickerData.tags
        },
        auditLogReason: reason
    });

    // Parse sticker
    const sticker: Sticker = Sticker._fromRawData(client, result);

    // Return
    return sticker;
}