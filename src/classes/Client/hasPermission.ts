import { Channel, ChannelResolvable, Client, Guild, GuildResolvable, Permissions, PermissionsResolvable, PermissionOverwrite, PERMISSION_TYPE_ROLE, RolePermissionData } from "../../internal";
import checkPermission from "./checkPermission";

export default function hasPermission(client: Client, permission: PermissionsResolvable, guild: GuildResolvable, channel?: ChannelResolvable): boolean {

    // If permission caching isnt enabled, this method cant be used
    if (!client.cacheStrategies.permissions) throw new Error("Permission caching isn't enabled");

    // Resolve objects
    const guildID: string | undefined = Guild.resolveID(guild);
    if (!guildID) throw new Error("Invalid guild resolvable");
    const channelID: string | undefined | null = channel ? Channel.resolveID(channel) : null;
    if (channelID === undefined) throw new Error("Invalid channel resolvable");

    // Get the client's roles in the guild
    const clientRoles: string[] | undefined = client._clientRoles?.get(guildID);

    // If the roles cant be found, the bot isnt in the guild
    if (!clientRoles) throw new Error("Unknown guild");

    // Get the permissions of the roles the client has
    const rolePermissions: RolePermissionData[] = clientRoles.map((r: string) => client._rolePermissions?.get(r)) as RolePermissionData[];

    // Get the permission overwrites of the channel
    let channelPermissionOverwrites: PermissionOverwrite[] | undefined | null = channelID ? client._channelPermissions?.get(channelID) : null;
    if (

        // If theres a channel ID
        channelID &&
        (

            // If the permission overwrites cant be found, the channel doesnt exist
            channelPermissionOverwrites === undefined ||

            // Or if the channel isnt in the guild
            !client._guildChannels?.get(guildID)?.includes(channelID)
        )
    ) throw new Error("Unknown channel");

    // Filter out permission overwrite members that arent the client
    channelPermissionOverwrites = channelPermissionOverwrites ? channelPermissionOverwrites.filter((p: PermissionOverwrite) => p.type === PERMISSION_TYPE_ROLE || p.id === client.id) : undefined;

    // If one of the roles have the admin permission, return `true`
    if (rolePermissions.some((r: RolePermissionData) => r.permissions.has("ADMINISTRATOR"))) return true;

    // Check implicit permissions
    const permissionBit: bigint = Permissions.resolveBits(permission);
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

    // Check permission
    return checkPermission(permission, rolePermissions, channelPermissionOverwrites);
}