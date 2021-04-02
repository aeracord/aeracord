/**
 * Role Data
 *
 * Represents a `Role`
 */
export interface RoleData {

    /**
     * ID
     *
     * The role's ID
     */
    id: string;

    /**
     * Name
     *
     * The role's name
     */
    name: string;

    /**
     * Guild ID
     *
     * The ID of the guild this role is in
     */
    guildID: string;

    /**
     * Color
     *
     * The role's color
     * `0` indicates that the role doesn't have a color
     */
    color: number;

    /**
     * Hoist
     *
     * Whether or not this role is hoisted
     */
    hoist: boolean;

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
    permissions: string;

    /**
     * Mentionable
     *
     * Whether or not this role is mentionable
     */
    mentionable: boolean;

    /**
     * Managed
     *
     * Whether or not this role is managed by an integration
     */
    managed: boolean;

    /**
     * Tags
     *
     * The role's tags
     */
    tags: RoleTags;
}

/**
 * Role Tags
 *
 * The role's tags
 */
export interface RoleTags {

    /**
     * Bot ID
     *
     * The ID of the bot that manages this role
     */
    botID: string | null;

    /**
     * Integration ID
     *
     * The ID of the integration that manages this role
     */
    integrationID: string | null;

    /**
     * Premium Role
     *
     * Whether or not this role is the server's Nitro Booster role
     */
    premiumRole: boolean;
}