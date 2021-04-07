import { ObjectCacheStrategies } from "../../internal";

/**
 * Client Cache Strategy Data
 *
 * How the client should cache objects
 */
export interface ClientCacheStrategyData {
    objects?: ObjectCacheStrategies;
    permissions?: ClientPermissionsCacheStrategyData;
}

/**
 * Client Permissions Cache Strategy Data
 *
 * How the client should cache permissions
 */
export interface ClientPermissionsCacheStrategyData {

    /**
     * Enabled
     *
     * Whether or not to cache permissions
     * This needs to be `true` in order for other properties to take effect
     * `true` by default
     */
    enabled?: boolean;

    /**
     * External Emojis
     *
     * Whether or not to cache a map of emoji IDs to guild IDs
     * This is used to determine if an external emoji is about to be used without having permissions
     */
    externalEmojis?: boolean;
}