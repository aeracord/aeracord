import { ChannelPermissionData, Client, Permissions, PermissionsResolvable, PermissionOverwrite, RolePermissionData } from "../../internal";
import checkPermission from "./checkPermission";

export default function hasPermission(client: Client, permission: PermissionsResolvable, guildOrChannel: string): boolean {

    // If permission caching isnt enabled, this method cant be used
    if (!client._cacheStrategies.permissions.enabled) throw new Error("Permission caching isn't enabled");

    // Define guild and channel IDs
    let guildID: string;
    let channelID: string | undefined;

    // Check client roles cache for guild ID
    if (client._clientRoles?.get(guildOrChannel)) guildID = guildOrChannel;
    else {

        const channelIDData: ChannelPermissionData | undefined = client._channelPermissions?.get(guildOrChannel);

        // Check channel permissions cache for channel ID
        if (channelIDData) {
            channelID = guildOrChannel;
            guildID = channelIDData.guildID;
        }

        // Invalid guild or channel ID
        else throw new Error("Invalid guild or channel ID");
    }

    // Get the client's roles in the guild
    const clientRoles: string[] = client._clientRoles?.get(guildID) as string[];

    // Get the permissions of the roles the client has
    const rolePermissions: RolePermissionData[] = clientRoles.map((r: string) => client._rolePermissions?.get(r)) as RolePermissionData[];

    // Get the permission overwrites of the channel
    let channelPermissionOverwrites: PermissionOverwrite[] | undefined = channelID ? (client._channelPermissions?.get(channelID) as ChannelPermissionData).permissionOverwrites : undefined;

    // Filter out permission overwrite roles that the client doesnt have and permission overwrite members that arent the client
    channelPermissionOverwrites = channelPermissionOverwrites ? channelPermissionOverwrites.filter((p: PermissionOverwrite) => clientRoles.includes(p.id) || p.id === client.id) : undefined;

    // If one of the roles have the admin permission, return `true`
    if (rolePermissions.some((r: RolePermissionData) => r.permissions.has("ADMINISTRATOR"))) return true;

    // Convert permission to an array
    if (!(permission instanceof Array)) permission = [permission];

    // Check permissions
    return permission.every((p: PermissionsResolvable) => {

        // Check implicit permissions
        const permissionBit: bigint = Permissions.resolveBits(p);
        if ((permissionBit === Permissions.resolveBits("CREATE_INSTANT_INVITE")) && (!checkPermission("VIEW_CHANNEL", rolePermissions, channelPermissionOverwrites))) return false;
        else if ((permissionBit === Permissions.resolveBits("MANAGE_CHANNELS")) && (channelPermissionOverwrites) && (!checkPermission("VIEW_CHANNEL", rolePermissions, channelPermissionOverwrites))) return false;
        else if ((permissionBit === Permissions.resolveBits("ADD_REACTIONS")) && (!checkPermission("VIEW_CHANNEL", rolePermissions, channelPermissionOverwrites))) return false;
        else if ((permissionBit === Permissions.resolveBits("PRIORITY_SPEAKER")) && (!checkPermission("VIEW_CHANNEL", rolePermissions, channelPermissionOverwrites))) return false;
        else if ((permissionBit === Permissions.resolveBits("STREAM")) && (!checkPermission("VIEW_CHANNEL", rolePermissions, channelPermissionOverwrites))) return false;
        else if ((permissionBit === Permissions.resolveBits("SEND_MESSAGES")) && (!checkPermission("VIEW_CHANNEL", rolePermissions, channelPermissionOverwrites))) return false;
        else if ((permissionBit === Permissions.resolveBits("SEND_TTS_MESSAGES")) && (!checkPermission("SEND_MESSAGES", rolePermissions, channelPermissionOverwrites))) return false;
        else if ((permissionBit === Permissions.resolveBits("MANAGE_MESSAGES")) && (!checkPermission("VIEW_CHANNEL", rolePermissions, channelPermissionOverwrites))) return false;
        else if ((permissionBit === Permissions.resolveBits("EMBED_LINKS")) && (!checkPermission("SEND_MESSAGES", rolePermissions, channelPermissionOverwrites))) return false;
        else if ((permissionBit === Permissions.resolveBits("ATTACH_FILES")) && (!checkPermission("SEND_MESSAGES", rolePermissions, channelPermissionOverwrites))) return false;
        else if ((permissionBit === Permissions.resolveBits("READ_MESSAGE_HISTORY")) && (!checkPermission("VIEW_CHANNEL", rolePermissions, channelPermissionOverwrites))) return false;
        else if ((permissionBit === Permissions.resolveBits("MENTION_EVERYONE")) && (!checkPermission("SEND_MESSAGES", rolePermissions, channelPermissionOverwrites))) return false;
        else if ((permissionBit === Permissions.resolveBits("USE_EXTERNAL_EMOJIS")) && (!checkPermission("VIEW_CHANNEL", rolePermissions, channelPermissionOverwrites))) return false;
        else if ((permissionBit === Permissions.resolveBits("CONNECT")) && (!checkPermission("VIEW_CHANNEL", rolePermissions, channelPermissionOverwrites))) return false;
        else if ((permissionBit === Permissions.resolveBits("SPEAK")) && (!checkPermission("CONNECT", rolePermissions, channelPermissionOverwrites))) return false;
        else if ((permissionBit === Permissions.resolveBits("MUTE_MEMBERS")) && (!checkPermission("VIEW_CHANNEL", rolePermissions, channelPermissionOverwrites))) return false;
        else if ((permissionBit === Permissions.resolveBits("DEAFEN_MEMBERS")) && (!checkPermission("VIEW_CHANNEL", rolePermissions, channelPermissionOverwrites))) return false;
        else if ((permissionBit === Permissions.resolveBits("MOVE_MEMBERS")) && (!checkPermission("VIEW_CHANNEL", rolePermissions, channelPermissionOverwrites))) return false;
        else if ((permissionBit === Permissions.resolveBits("USE_VAD")) && (!checkPermission("CONNECT", rolePermissions, channelPermissionOverwrites))) return false;
        else if ((permissionBit === Permissions.resolveBits("MANAGE_ROLES")) && (channelPermissionOverwrites) && (!checkPermission("VIEW_CHANNEL", rolePermissions, channelPermissionOverwrites))) return false;
        else if ((permissionBit === Permissions.resolveBits("MANAGE_WEBHOOKS")) && (channelPermissionOverwrites) && (!checkPermission("VIEW_CHANNEL", rolePermissions, channelPermissionOverwrites))) return false;
        else if ((permissionBit === Permissions.resolveBits("USE_SLASH_COMMANDS")) && (!checkPermission("SEND_MESSAGES", rolePermissions, channelPermissionOverwrites))) return false;

        // Check permission
        return checkPermission(p, rolePermissions, channelPermissionOverwrites);
    });
}