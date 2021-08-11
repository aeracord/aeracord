import { ChannelType, ContextMenuCommandType, COMMAND_TYPE_CHAT_INPUT, InteractionData, INTERACTION_TYPE_COMMAND, MemberData, MessageData, RoleData, UserData } from "../../internal";

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

    /**
     * Resolved
     *
     * The resolved objects from this command
     */
    resolved: CommandInteractionResolvedData;
}

/**
 * Command Interaction Resolved Data
 *
 * Objects that were referenced in a command
 */
export interface CommandInteractionResolvedData {

    /**
     * Users
     *
     * The resolved users
     */
    users: Map<string, UserData>;

    /**
     * Members
     *
     * The resolved members
     */
    members: Map<string, MemberData>;

    /**
     * Roles
     *
     * The resolved roles
     */
    roles: Map<string, RoleData>;

    /**
     * Channels
     *
     * The resolved channels
     */
    channels: Map<string, ResolvedChannel>;

    /**
     * Messages
     *
     * The resolved messages
     */
    messages: Map<string, MessageData>;
}

/**
 * Resolved Channel
 *
 * A channel that was referenced in a command
 */
export interface ResolvedChannel {

    /**
     * ID
     *
     * The channel's ID
     */
    id: string;

    /**
     * Type
     *
     * The channel's type
     */
    type: ChannelType;

    /**
     * Name
     *
     * The channel's name
     */
    name: string;

    /**
     * Permissions
     *
     * The invoking member's permissions including role permissions and channel overwrites
     */
    permissions: string;

    /**
     * Parent ID
     *
     * The ID of this channel's parent channel
     */
    parentID: string | null;

    /**
     * Archived
     *
     * Whether or not this thread is archived
     */
    archived?: boolean;

    /**
     * Auto Archived Duration
     *
     * The amount of time in minutes after inactivity that this thread will automatically be archived
     */
    autoArchivedDuration?: number;

    /**
     * Archived At
     *
     * The timestamp for when this thread's archived status was last updated
     */
    archivedAt?: number;

    /**
     * Locked
     *
     * Whether or not this thread is locked
     */
    locked?: boolean;
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