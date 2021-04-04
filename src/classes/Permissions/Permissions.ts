import has from "./has";
import resolveBits from "./resolveBits";

/**
 * Permissions Resolvable
 *
 * The types that can be resolved to a permissions
 */
export type PermissionsResolvable = Permissions | string | number | bigint | PermissionName | PermissionsResolvable[];

/**
 * Permission Name
 * https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags
 */
export type PermissionName = "CREATE_INSTANT_INVITE" | "KICK_MEMBERS" | "BAN_MEMBERS" | "ADMINISTRATOR" | "MANAGE_CHANNELS" | "MANAGE_GUILD" | "ADD_REACTIONS" | "VIEW_AUDIT_LOG" | "PRIORITY_SPEAKER" | "STREAM" | "VIEW_CHANNEL" | "SEND_MESSAGES" | "SEND_TTS_MESSAGES" | "MANAGE_MESSAGES" | "EMBED_LINKS" | "ATTACH_FILES" | "READ_MESSAGE_HISTORY" | "MENTION_EVERYONE" | "USE_EXTERNAL_EMOJIS" | "VIEW_GUILD_INSIGHTS" | "CONNECT" | "SPEAK" | "MUTE_MEMBERS" | "DEAFEN_MEMBERS" | "MOVE_MEMBERS" | "USE_VAD" | "CHANGE_NICKNAME" | "MANAGE_NICKNAMES" | "MANAGE_ROLES" | "MANAGE_WEBHOOKS" | "MANAGE_EMOJIS";

export default class Permissions {

    /**
     * Bits
     *
     * The permissions' bits
     */
    bits: bigint;

    /**
     * Permissions
     *
     * @param permissions The permissions
     */
    constructor(permissions: PermissionsResolvable) {

        // Set data
        this.bits = Permissions.resolveBits(permissions);
    }

    /**
     * Add
     *
     * Add permissions to these permissions
     *
     * @param permission The permission
     *
     * @returns {Permissions} The permissions
     */
    add(permission: PermissionsResolvable): Permissions {
        this.bits |= Permissions.resolveBits(permission);
        return this;
    }

    /**
     * Remove
     *
     * Remove permissions from these permissions
     *
     * @param permission The permission
     *
     * @returns {Permissions} The permissions
     */
    remove(permission: PermissionsResolvable): Permissions {
        this.bits &= ~Permissions.resolveBits(permission);
        return this;
    }

    /**
     * Has
     *
     * Check if the permissions have other permissions
     *
     * @param permissions The permissions
     *
     * @returns {boolean} Whether or not the permissions have the other permissions
     */
    has(permissions: PermissionsResolvable): boolean {
        return has(this, permissions);
    }

    /**
     * Resolve Bits
     *
     * Resolve an object to permissions bits
     *
     * @param permissionsResolvable The permissions resolvable
     *
     * @returns {bigint} The resolved permissions' bits
     */
    static resolveBits(permissionsResolvable: PermissionsResolvable): bigint {
        return resolveBits(permissionsResolvable);
    }
}