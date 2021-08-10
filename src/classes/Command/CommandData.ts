/**
 * Command Data
 *
 * Represents a `Command`
 */
export interface CommandData {

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
     * Name
     *
     * The command's name
     */
    name: string;

    /**
     * Type
     *
     * The command's type
     */
    type: CommandType;

    /**
     * Description
     *
     * The command's description
     */
    description: string;

    /**
     * Options
     *
     * The command's options
     */
    options: CommandOption[];

    /**
     * Default Permission
     *
     * Whether or not the command is enabled by default
     */
    defaultPermission: boolean;

    /**
     * Fetched At
     *
     * The timestamp for when this command was fetched
     */
    fetchedAt: number;
}

/**
 * Command Type
 * https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types
 */
export type CommandType = typeof COMMAND_TYPE_CHAT_INPUT | ContextMenuCommandType;
export type ContextMenuCommandType = typeof COMMAND_TYPE_USER | typeof COMMAND_TYPE_MESSAGE;
export const COMMAND_TYPE_CHAT_INPUT = 1;
export const COMMAND_TYPE_USER = 2;
export const COMMAND_TYPE_MESSAGE = 3;

/**
 * Command Option
 *
 * A command option
 */
export interface CommandOption {

    /**
     * Type
     *
     * The option's type
     */
    type: CommandOptionType;

    /**
     * Name
     *
     * The option's name
     */
    name: string;

    /**
     * Description
     *
     * The option's description
     */
    description: string;

    /**
     * Required
     *
     * Whether or not this option is required
     */
    required: boolean;

    /**
     * Choices
     *
     * The option's choices
     */
    choices?: CommandChoice[];

    /**
     * Options
     *
     * The nested options for subcommands and subcommand groups
     */
    options?: CommandOption[];
}

/**
 * Command Option Type
 * https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptiontype
 */
export type CommandOptionType = typeof COMMAND_OPTION_TYPE_SUB_COMMAND | typeof COMMAND_OPTION_TYPE_SUB_COMMAND_GROUP | typeof COMMAND_OPTION_TYPE_STRING | typeof COMMAND_OPTION_TYPE_INTEGER | typeof COMMAND_OPTION_TYPE_BOOLEAN | typeof COMMAND_OPTION_TYPE_USER | typeof COMMAND_OPTION_TYPE_CHANNEL | typeof COMMAND_OPTION_TYPE_ROLE | typeof COMMAND_OPTION_TYPE_MENTIONABLE | typeof COMMAND_OPTION_TYPE_NUMBER;
export const COMMAND_OPTION_TYPE_SUB_COMMAND = 1;
export const COMMAND_OPTION_TYPE_SUB_COMMAND_GROUP = 2;
export const COMMAND_OPTION_TYPE_STRING = 3;
export const COMMAND_OPTION_TYPE_INTEGER = 4;
export const COMMAND_OPTION_TYPE_BOOLEAN = 5;
export const COMMAND_OPTION_TYPE_USER = 6;
export const COMMAND_OPTION_TYPE_CHANNEL = 7;
export const COMMAND_OPTION_TYPE_ROLE = 8;
export const COMMAND_OPTION_TYPE_MENTIONABLE = 9;
export const COMMAND_OPTION_TYPE_NUMBER = 10;

/**
 * Command Choice
 *
 * A command choice
 */
export interface CommandChoice {

    /**
     * Name
     *
     * The choice's name
     */
    name: string;

    /**
     * Value
     *
     * The choice's value
     */
    value: string | number;
}