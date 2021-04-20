/**
 * Welcome Screen Data
 *
 * Represents a `WelcomeScreen`
 */
export interface WelcomeScreenData {

    /**
     * Guild ID
     *
     * The ID of the guild this welcome screen is for
     */
    guildID: string;

    /**
     * Description
     *
     * The welcome screen's description
     */
    description: string | null;

    /**
     * Channels
     *
     * The welcome screen's channels
     */
    channels: WelcomeScreenChannel[];

    /**
     * Fetched At
     *
     * The timestamp for when this welcome screen was fetched
     */
    fetchedAt: number;
}

/**
 * Welcome Screen Channel
 *
 * A welcome screen's channel
 */
export interface WelcomeScreenChannel {

    /**
     * Channel ID
     *
     * The channel's ID
     */
    channelID: string;

    /**
     * Description
     *
     * The channel's description
     */
    description: string;

    /**
     * Emoji ID
     *
     * The ID of the channel's emoji
     */
    emojiID: string | null;

    /**
     * Emoji Name
     *
     * The name of the channel's emoji
     */
    emojiName: string | null;
}