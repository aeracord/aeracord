import { Client, FetchQueue, Guild, GuildResolvable, User, UserResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function removeGuildBan(client: Client, guildResolvable: GuildResolvable, userResolvable: UserResolvable): Promise<void> {

    // Resolve objects
    const guildID: string = Guild.resolveID(guildResolvable);
    const userID: string = User.resolveID(userResolvable);

    // Define fetch data
    const path: string = `/guilds/${guildID}/bans/${userID}`;
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