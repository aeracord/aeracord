import { Client, FetchQueue, Guild, GuildResolvable, Role, RoleResolvable, User, UserResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function removeGuildMemberRole(client: Client, guildResolvable: GuildResolvable, userResolvable: UserResolvable, roleResolvable: RoleResolvable): Promise<void> {

    // Resolve objects
    const guildID: string = Guild.resolveID(guildResolvable);
    const userID: string = User.resolveID(userResolvable);
    const roleID: string = Role.resolveID(roleResolvable);

    // Define fetch data
    const path: string = `/guilds/${guildID}/members/${userID}/roles/${roleID}`;
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