import { MemberData, UserData } from "../../internal";

/**
 * Interaction Data
 *
 * Represents an `Interaction`
 */
export interface InteractionData {

    /**
     * ID
     *
     * The interaction's ID
     */
    id: string;

    /**
     * Type
     *
     * The interaction's type
     */
    type: InteractionType;

    /**
     * Token
     *
     * The interaction's token
     */
    token: string;

    /**
     * Application ID
     *
     * The ID of the application that owns this interaction
     */
    applicationID: string;

    /**
     * Data
     *
     * The interaction's data
     */
    data: InteractionCommandData;

    /**
     * Guild ID
     *
     * The ID of the guild this interaction is in
     */
    guildID: string | null;

    /**
     * Channel ID
     *
     * The ID of the channel this interaction is in
     */
    channelID: string;

    /**
     * Member
     *
     * The member that created this interaction
     */
    member: MemberData | null;

    /**
     * Permissions
     *
     * The member's permissions including role permissions and channel overwrites
     */
    permissions: string | null;

    /**
     * User
     *
     * The user that created this interaction
     */
    user: UserData;
}

/**
 * Interaction Type
 * https://discord.com/developers/docs/interactions/slash-commands#interaction-interactiontype
 */
export type InteractionType = typeof INTERACTION_TYPE_PING | typeof INTERACTION_TYPE_COMMAND;
export const INTERACTION_TYPE_PING = 1;
export const INTERACTION_TYPE_COMMAND = 2;

/**
 * Interaction Command Data
 *
 * An interaction command
 */
export interface InteractionCommandData {

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
    options?: InteractionCommandOption[];
}

/**
 * Interaction Command Option
 *
 * An interaction command's parameters
 */
export interface InteractionCommandOption {

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
    options?: InteractionCommandOption[];
}