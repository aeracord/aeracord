/**
 * Command Permissions Data
 *
 * Represents a `CommandPermissions`
 */
export interface CommandPermissionsData {

    /**
     * ID
     *
     * The command's ID
     */
    id: string;

    /**
     * Guild ID
     *
     * The ID of the guild this command is in
     * `null` if it's a global command
     */
    guildID: string | null;

    /**
     * Application ID
     *
     * The ID of the application that owns this command
     */
    applicationID: string;

    /**
     * Permissions
     *
     * The command's permissions
     */
    permissions: CommandPermission[];

    /**
     * Fetched At
     *
     * The timestamp for when this command was fetched
     */
    fetchedAt: number;
}

/**
 * Command Permission
 *
 * A command permission
 */
export interface CommandPermission {

    /**
     * ID
     *
     * The command permission's ID
     */
    id: string;

    /**
     * Type
     *
     * The command permission's type
     */
    type: CommandPermissionType;

    /**
     * Permission
     *
     * Whether or not the command can be used
     */
    permission: boolean;
}

/**
 * Command Permission Type
 *
 * The types of command permissions
 */
export type CommandPermissionType = typeof CommandPermissionTypes.ROLE | typeof CommandPermissionTypes.USER;
export const CommandPermissionTypes: {

    /**
     * Role
     *
     * A role command permission type
     */
    ROLE: 1,

    /**
     * User
     *
     * A user command permission type
     */
    USER: 2
} = {
    ROLE: 1,
    USER: 2
};