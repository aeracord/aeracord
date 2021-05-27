import { InteractionData, INTERACTION_TYPE_COMMAND } from "../../internal";

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
export interface CommandInteractionMetadata {

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

    /**
     * Options
     *
     * The command's parameters
     */
    options?: CommandInteractionOption[];
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