import { Client, FetchQueue, Guild, GuildResolvable, Member, Role, RoleResolvable, User, UserResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function addGuildMemberRole(client: Client, guildResolvable: GuildResolvable, userResolvable: UserResolvable, roleResolvable: RoleResolvable): Promise<void> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");
    const userID: string | undefined = User.resolveID(userResolvable);
    if (!userID) throw new Error("Invalid user resolvable");
    const roleID: string | undefined = Role.resolveID(roleResolvable);
    if (!roleID) throw new Error("Invalid role resolvable");

    // Missing permissions
    if (
        client._cacheStrategies.permissions.enabled &&
        (
            !client.hasPermission("MANAGE_ROLES", guildID) ||
            (
                userResolvable instanceof Member &&
                !client.canManageMember(userResolvable)
            ) ||
            !client.canManageRoles(guildID, roleID)
        )
    ) throw new Error("Missing permissions to manage this member or role");

    // Define fetch data
    const path: string = `/guilds/${guildID}/members/${userID}/roles/${roleID}`;
    const method: string = "PUT";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    await fetchQueue.request({
        path,
        method
    });
}