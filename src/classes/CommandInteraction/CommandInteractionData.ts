import { ContextMenuCommandType, COMMAND_TYPE_CHAT_INPUT, InteractionData, INTERACTION_TYPE_COMMAND } from "../../internal";

/**
 * Command Interaction Data
 *
 * Represents a `CommandInteraction`
 */
export interface CommandInteractionData extends InteractionData {

    /**
     * Type
     *
     * The interaction's type
     */
    type: typeof INTERACTION_TYPE_COMMAND;

    /**
     * Data
     *
     * The command interaction's data
     */
    data: CommandInteractionMetadata;
}

/**
 * Command Interaction Metadata
 *
 * A command interaction's data
 */
export type CommandInteractionMetadata = ChatInputCommandInteractionMetadata | ContextMenuCommandInteractionMetadata;

/**
 * Base Command Interaction Metadata
 *
 * The base data for a command interaction's data
 */
export interface BaseCommandInteractionMetadata {

    /**
     * ID
     *
     * The command's ID
     */
    id: string;

    /**
     * Name
     *
     * The command's name
     */
    name: string;
}

/**
 * Chat Input Command Interaction Metadata
 *
 * The data for a slash command interaction's data
 */
export interface ChatInputCommandInteractionMetadata extends BaseCommandInteractionMetadata {

    /**
     * Type
     *
     * The command's type
     */
    type: typeof COMMAND_TYPE_CHAT_INPUT;

    /**
     * Options
     *
     * The command's parameters
     */
    options?: CommandInteractionOption[];
}

/**
 * Context Menu Command Interaction Metadata
 *
 * The data for a context ment command interaction's data
 */
export interface ContextMenuCommandInteractionMetadata extends BaseCommandInteractionMetadata {

    /**
     * Type
     *
     * The command's type
     */
    type: ContextMenuCommandType;

    /**
     * Target ID
     *
     * The command's target ID
     * A user ID for user commands and a message ID for message commands
     */
    targetID: string;
}

/**
 * Command Interaction Option
 *
 * A command interaction's parameters
 */
export interface CommandInteractionOption {

    /**
     * Name
     *
     * The option's name
     */
    name: string;

    /**
     * Value
     *
     * The option's value
     * `undefined` for subcommands and subcommand groups
     */
    value?: string | number;

    /**
     * Options
     *
     * The command's options if it's a subcommand or subcommand group
     */
    options?: CommandInteractionOption[];
}