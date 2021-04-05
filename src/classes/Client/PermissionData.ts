import { Permissions, PermissionOverwrite } from "../../internal";

/**
 * Channel Permission Data
 *
 * Cached channel permission data
 */
export interface ChannelPermissionData {

    /**
     * Guild ID
     *
     * The ID of the guild this channel is in
     */
    guildID: string;

    /**
     * Permission Overwrites
     *
     * The permission overwrites of this channel
     */
    permissionOverwrites: PermissionOverwrite[];
}

/**
 * Role Permission Data
 *
 * Cached role permission data
 */
export interface RolePermissionData {

    /**
     * Position
     *
     * The role's position
     */
    position: number;

    /**
     * Permissions
     *
     * The role's permissions
     */
    permissions: Permissions;
}