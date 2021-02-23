import { Client, FetchQueue, Guild, GuildResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function deleteGuild(client: Client, guildResolvable: GuildResolvable): Promise<void> {

    // Resolve objects
    const guildID: string = Guild.resolveID(guildResolvable);

    // Define fetch data
    const path: string = `/guilds/${guildID}`;
    const method: string = "DELETE";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    await fetchQueue.request({
        path,
        method
    });
}