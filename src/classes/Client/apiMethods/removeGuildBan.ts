import { Client, FetchQueue, Guild, GuildResolvable, PermissionError, User, UserResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function removeGuildBan(client: Client, guildResolvable: GuildResolvable, userResolvable: UserResolvable, reason?: string): Promise<void> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");
    const userID: string | undefined = User.resolveID(userResolvable);
    if (!userID) throw new Error("Invalid user resolvable");

    // Missing permissions
    if (!client.hasPermission("BAN_MEMBERS", guildID)) throw new PermissionError({ permission: "BAN_MEMBERS" });

    // Define fetch data
    const path: string = `/guilds/${guildID}/bans/${userID}`;
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