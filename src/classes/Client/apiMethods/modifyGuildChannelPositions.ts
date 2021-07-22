import { Channel, ChannelResolvable, Client, FetchQueue, Guild, GuildResolvable, PermissionError } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface ModifyGuildChannelPositionsData {
    channel: ChannelResolvable;
    position?: number;
    lockPermissions?: boolean;
    parent?: ChannelResolvable | null;
}

interface PositionsData {
    id: string | undefined;
    position?: number;
    lock_permissions?: boolean;
    parent_id?: string | null;
}

export default async function modifyGuildChannelPositions(client: Client, guildResolvable: GuildResolvable, modifyGuildChannelPositionsData: ModifyGuildChannelPositionsData[]): Promise<void> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");
    const positions: PositionsData[] = modifyGuildChannelPositionsData.map((p: ModifyGuildChannelPositionsData) => ({
        id: Channel.resolveID(p.channel),
        position: p.position,
        lock_permissions: p.lockPermissions,
        parent_id: p.parent ? Channel.resolveID(p.parent) : null
    }));
    if (positions.find((p: PositionsData) => !p.id)) throw new Error("Invalid channel resolvable in array of channel position channels");
    if (positions.find((p: PositionsData) => p.parent_id === undefined)) throw new Error("Invalid channel resolvable in array of channel position parent channels");

    // Missing permissions
    if (!client.hasPermission("MANAGE_CHANNELS", guildID)) throw new PermissionError({ permission: "MANAGE_CHANNELS" });

    // Define fetch data
    const path: string = `/guilds/${guildID}/channels`;
    const method: string = "PATCH";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    await fetchQueue.request({
        path,
        method,
        data: positions
    });
}