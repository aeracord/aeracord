import FormData from "form-data";
import { Client, FetchQueue, Guild, GuildResolvable, PermissionError, RawStickerData, Sticker } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface CreateGuildStickerData {
    name: string;
    description: string;
    tags: string;
    image: Buffer;
}

export default async function createGuildSticker(client: Client, guildResolvable: GuildResolvable, createGuildStickerData: CreateGuildStickerData, reason?: string): Promise<Sticker> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");

    // Missing permissions
    if (!client.hasPermission("MANAGE_EMOJIS_AND_STICKERS", guildID)) throw new PermissionError({ permission: "MANAGE_EMOJIS_AND_STICKERS" });

    // Define fetch data
    const path: string = `/guilds/${guildID}/stickers`;
    const method: string = "POST";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Parse form data
    let data: FormData = new FormData();
    data.append("name", createGuildStickerData.name);
    data.append("description", createGuildStickerData.description);
    data.append("tags", createGuildStickerData.tags);
    data.append("file", createGuildStickerData.image, { filename: "sticker.png" });

    // Add to fetch queue
    const result: RawStickerData = await fetchQueue.request({
        path,
        method,
        contentType: `multipart/form-data; boundary=${data.getBoundary()}`,
        data,
        auditLogReason: reason
    });

    // Parse sticker
    const sticker: Sticker = Sticker._fromRawData(client, result);

    // Return
    return sticker;
}