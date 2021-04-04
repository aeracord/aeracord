import { ChannelData, GuildChannelType, Permissions } from "../../internal";

/**
 * Guild Channel Data
 *
 * Represents a `GuildChannel`
 */
export interface GuildChannelData extends ChannelData {

    /**
     * Type
     *
     * The channel's type
     */
    type: GuildChannelType;

    /**
     * Name
     *
     * The channel's name
     */
    name: string;

    /**
     * Guild ID
     *
     * The ID of the guild this channel is in
     */
    guildID: string;

    /**
     * Position
     *
     * The position of this channel
     */
    position: number;

    /**
     * Permission Overwrites
     *
     * The permission overwrites of this channel
     */
    permissionOverwrites: PermissionOverwrite[];

    /**
     * Parent ID
     *
     * The ID of this channel's parent channel
     */
    parentID: string | null;
}

/**
 * Permission Overwrite
 *
 * A permission overwrite
 */
export interface PermissionOverwrite {

    /**
     * ID
     *
     * The permission overwrite's ID
     */
    id: string;

    /**
     * Type
     *
     * The permission overwrite's type
     */
    type: PermissionType;

    /**
     * Allow
     *
     * The allowed permissions
     */
    allow: Permissions;

    /**
     * Deny
     *
     * The denied permissions
     */
    deny: Permissions;
}

/**
 * Permission Type
 *
 * The types of permission overwrites
 */
export type PermissionType = typeof PERMISSION_TYPE_ROLE | typeof PERMISSION_TYPE_MEMBER;
export const PERMISSION_TYPE_ROLE = 0;
export const PERMISSION_TYPE_MEMBER = 1;