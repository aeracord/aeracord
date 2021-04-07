import { Client, Guild, GuildResolvable, Role, RolePermissionData, RoleResolvable } from "../../internal";

export default function canManageRoles(client: Client, guild: GuildResolvable, roles: RoleResolvable | RoleResolvable[]): boolean {

    // If permission caching isnt enabled, this method cant be used
    if (!client._cacheStrategies.permissions.enabled) throw new Error("Permission caching isn't enabled");

    // Convert roles to an array
    if (!(roles instanceof Array)) roles = [roles];

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guild);
    if (!guildID) throw new Error("Invalid guild resolvable");
    const roleIDs: Array<string | undefined> = roles.map((r: RoleResolvable) => Role.resolveID(r));
    if (roleIDs.find((r: string | undefined) => !r)) throw new Error("Invalid role resolvable");

    // If the client is the owner of the guild, return `true`
    if (client.id === client._guildOwners?.get(guildID)) return true;

    // Get the clients roles in the guild
    let clientRoles: string[] | undefined = client._clientRoles?.get(guildID);

    // If the client roles cant be found, the bot isnt in the guild
    if (!clientRoles) throw new Error("Unknown guild");

    // Sort the clients roles
    clientRoles.sort((a: string, b: string) => {

        // Get positions
        const positionA: number = client._rolePermissions?.get(a)?.position as number;
        const positionB: number = client._rolePermissions?.get(b)?.position as number;

        // Return
        return positionA - positionB;
    });

    // Compare role positions
    return (roleIDs as string[]).every((r: string) => {

        // Get the roles permissions
        const rolePermissions: RolePermissionData | undefined = client._rolePermissions?.get(r);

        // If the role permissions dont exist or the role isnt in the guild, throw an error
        if ((!rolePermissions) || (!client._guildRoles?.get(guildID)?.includes(r))) throw new Error("Unknown role");

        // Get the clients highest roles permissions
        const clientRolePermissions: RolePermissionData = client._rolePermissions?.get((clientRoles as string[])[(clientRoles as string[]).length - 1]) as RolePermissionData;

        // Compare position
        return clientRolePermissions.position > rolePermissions.position;
    });
}