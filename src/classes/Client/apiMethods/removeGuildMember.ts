import { Client, FetchQueue, Guild, GuildResolvable, Member, User, UserResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function removeGuildMember(client: Client, guildResolvable: GuildResolvable, userResolvable: UserResolvable, reason?: string): Promise<void> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");
    const userID: string | undefined = User.resolveID(userResolvable);
    if (!userID) throw new Error("Invalid user resolvable");

    // Missing permissions
    if (
        client._cacheStrategies.permissions.enabled &&
        (
            !client.hasPermission("KICK_MEMBERS", guildID) ||
            (
                userResolvable instanceof Member &&
                !client.canManageMember(userResolvable)
            )
        )
    ) throw new Error("Missing permissions to kick this member");

    // Define fetch data
    const path: string = `/guilds/${guildID}/members/${userID}`;
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