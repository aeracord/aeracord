import { Permissions, PermissionOverwrite, ThreadChannelType } from "../../internal";

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
 * Thread Cache Data
 *
 * Cached thread channel data
 */
export interface ThreadCacheData {

    /**
     * Type
     *
     * The thread's channel type
     */
    type: ThreadChannelType;

    /**
     * Parent ID
     *
     * The ID of this thread's parent channel
     */
    parentID: string;

    /**
     * Guild ID
     *
     * The ID of the guild this thread is in
     */
    guildID: string;

    /**
     * Joined
     *
     * Whether or not the client has joined this thread
     */
    joined: boolean;

    /**
     * Created by Client
     *
     * Whether or not the client created this thread
     */
    createdByClient: boolean;
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