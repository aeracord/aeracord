import { Client, FetchQueue, Guild, GuildResolvable, Member, PermissionError, Role, RoleResolvable, User, UserResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";

export default async function removeGuildMemberRole(client: Client, guildResolvable: GuildResolvable, userResolvable: UserResolvable, roleResolvable: RoleResolvable, reason?: string): Promise<void> {

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guildResolvable);
    if (!guildID) throw new Error("Invalid guild resolvable");
    const userID: string | undefined = User.resolveID(userResolvable);
    if (!userID) throw new Error("Invalid user resolvable");
    const roleID: string | undefined = Role.resolveID(roleResolvable);
    if (!roleID) throw new Error("Invalid role resolvable");

    // Missing permissions
    if (client._cacheStrategies.permissions.enabled) {
        if (!client.hasPermission("MANAGE_ROLES", guildID)) throw new PermissionError({ permission: "MANAGE_ROLES" });
        if ((userResolvable instanceof Member) && (!client.canManageMember(userResolvable))) throw new PermissionError({ member: userResolvable.user.id });
        if (!client.canManageRoles(guildID, roleID)) throw new PermissionError({ role: roleID });
    }

    // Define fetch data
    const path: string = `/guilds/${guildID}/members/${userID}/roles/${roleID}`;
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