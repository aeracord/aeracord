/**
 * Reaction Data
 *
 * Represents a `Reaction`
 */
export interface ReactionData {

    /**
     * Message ID
     *
     * The ID of the message this reaction is in
     */
    messageID: string;

    /**
     * Channel ID
     *
     * The ID of the channel this reaction is in
     */
    channelID: string;

    /**
     * Guild ID
     *
     * The ID of the guild this reaction is in
     */
    guildID?: string | null;

    /**
     * Count
     *
     * The amount of times this reaction has been used
     */
    count: number;

    /**
     * Me
     *
     * Whether or not the client has added this reaction
     */
    me: boolean;

    /**
     * Emoji
     *
     * The reaction's emoji
     */
    emoji: ReactionEmoji;
}

/**
 * Reaction Emoji
 *
 * A reaction emoji
 */
export interface ReactionEmoji {

    /**
     * ID
     *
     * The reaction emoji's ID
     */
    id: string | null;

    /**
     * Name
     *
     * The reaction emoji's name
     */
    name: string | null;

    /**
     * Animated
     *
     * Whether or not the reaction emoji is animated
     */
    animated: boolean;
}