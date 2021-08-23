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
}

/**
 * Command Type
 * https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types
 */
export type CommandType = typeof CommandTypes.CHAT_INPUT | ContextMenuCommandType;
export type ContextMenuCommandType = typeof CommandTypes.USER | typeof CommandTypes.MESSAGE;
export const CommandTypes: {

    /**
     * Chat Input
     *
     * A slash command
     */
    CHAT_INPUT: 1,

    /**
     * User
     *
     * A user context menu command
     */
    USER: 2,

    /**
     * Message
     *
     * A message context menu command
     */
    MESSAGE: 3
} = {
    CHAT_INPUT: 1,
    USER: 2,
    MESSAGE: 3
};

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
export type CommandOptionType = typeof CommandOptionTypes.SUB_COMMAND | typeof CommandOptionTypes.SUB_COMMAND_GROUP | typeof CommandOptionTypes.STRING | typeof CommandOptionTypes.INTEGER | typeof CommandOptionTypes.BOOLEAN | typeof CommandOptionTypes.USER | typeof CommandOptionTypes.CHANNEL | typeof CommandOptionTypes.ROLE | typeof CommandOptionTypes.MENTIONABLE | typeof CommandOptionTypes.NUMBER;
export const CommandOptionTypes: {

    /**
     * Sub Command
     *
     * A sub-command within another command or a sub-command group
     */
    SUB_COMMAND: 1,

    /**
     * Sub Command Group
     *
     * A group of sub-commands
     */
    SUB_COMMAND_GROUP: 2,

    /**
     * String
     *
     * A string
     */
    STRING: 3,

    /**
     * Integer
     *
     * An integer
     */
    INTEGER: 4,

    /**
     * Boolean
     *
     * A boolean
     */
    BOOLEAN: 5,

    /**
     * User
     *
     * A user
     */
    USER: 6,

    /**
     * Channel
     *
     * A channel
     */
    CHANNEL: 7,

    /**
     * Role
     *
     * A role
     */
    ROLE: 8,

    /**
     * Mentionable
     *
     * Users and roles
     */
    MENTIONABLE: 9,

    /**
     * Number
     *
     * A number
     */
    NUMBER: 10
} = {
    SUB_COMMAND: 1,
    SUB_COMMAND_GROUP: 2,
    STRING: 3,
    INTEGER: 4,
    BOOLEAN: 5,
    USER: 6,
    CHANNEL: 7,
    ROLE: 8,
    MENTIONABLE: 9,
    NUMBER: 10
};


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