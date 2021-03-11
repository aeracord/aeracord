import { Channel, ChannelResolvable, Client, FetchQueue, Guild, GuildResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export interface ModifyGuildChannelPositionsData {
    channel: ChannelResolvable;
    position: number;
}

interface PositionsData {
    id: string | undefined;
    position: number;
}

export default async function modifyGuildChannelPositions(client: Client, guildResolvable: GuildResolvable, modifyGuildChannelPositionsData: ModifyGuildChannelPositionsData[]): Promise<void> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");
    const positions: PositionsData[] = modifyGuildChannelPositionsData.map((p: ModifyGuildChannelPositionsData) => ({
        id: Channel.resolveID(p.channel),
        position: p.position
    }));
    if (positions.find((p: PositionsData) => !p.id)) throw new Error("Invalid channel resolvable in array of channel positions");

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