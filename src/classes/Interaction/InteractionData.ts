import { CommandInteractionMetadata, ComponentInteractionMetadata, MemberData, UserData } from "../../internal";

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
    data: InteractionMetadata;

    /**
     * Guild ID
     *
     * The ID of the guild this interaction is in
     * `null` if the interaction is sent in a DM channel
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
     * `null` if the interaction is sent in a DM channel
     */
    member: MemberData | null;

    /**
     * Permissions
     *
     * The member's permissions including role permissions and channel overwrites
     * `null` if the interaction is sent in a DM channel
     */
    permissions: string | null;

    /**
     * User
     *
     * The user that created this interaction
     */
    user: UserData;

    /**
     * Fetched At
     *
     * The timestamp for when this interaction was fetched
     */
    fetchedAt: number;
}

/**
 * Interaction Type
 * https://discord.com/developers/docs/interactions/slash-commands#interaction-interactiontype
 */
export type InteractionType = typeof InteractionTypes.COMMAND | typeof InteractionTypes.COMPONENT;
export const InteractionTypes: {

    /**
     * Command
     *
     * A slash command or context menu command interaction
     */
    COMMAND: 2,

    /**
     * Component
     *
     * A component interaction
     */
    COMPONENT: 3
} = {
    COMMAND: 2,
    COMPONENT: 3
};

/**
 * Interaction Metadata
 *
 * An interaction metadata object
 */
export type InteractionMetadata = CommandInteractionMetadata | ComponentInteractionMetadata;