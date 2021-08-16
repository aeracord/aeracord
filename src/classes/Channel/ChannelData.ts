/**
 * Channel Data
 *
 * Represents a `Channel`
 */
export interface ChannelData {

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
     * Fetched At
     *
     * The timestamp for when this channel was fetched
     */
    fetchedAt: number;
}

/**
 * Channel Type
 * https://discord.com/developers/docs/resources/channel#channel-object-channel-types
 */
export type ChannelType = typeof ChannelTypes.TEXT | typeof ChannelTypes.DM | typeof ChannelTypes.VOICE | typeof ChannelTypes.CATEGORY | typeof ChannelTypes.NEWS | typeof ChannelTypes.STORE | typeof ChannelTypes.NEWS_THREAD | typeof ChannelTypes.PUBLIC_THREAD | typeof ChannelTypes.PRIVATE_THREAD | typeof ChannelTypes.STAGE;
export const ChannelTypes: {

    /**
     * Text
     *
     * A text channel
     */
    TEXT: 0,

    /**
     * DM
     *
     * A DM channel
     */
    DM: 1,

    /**
     * Voice
     *
     * A voice channel
     */
    VOICE: 2,

    /**
     * Category
     *
     * A category channel
     */
    CATEGORY: 4,

    /**
     * News
     *
     * An announcement channel
     */
    NEWS: 5,

    /**
     * Store
     *
     * A store channel
     */
    STORE: 6,

    /**
     * News Thread
     *
     * A thread channel within an announcement channel
     */
    NEWS_THREAD: 10,

    /**
     * Public Thread
     *
     * A public thread channel
     */
    PUBLIC_THREAD: 11,

    /**
     * Private Thread
     *
     * A private thread channel
     */
    PRIVATE_THREAD: 12,

    /**
     * Stage
     *
     * A stage channel
     */
    STAGE: 13
} = {
    TEXT: 0,
    DM: 1,
    VOICE: 2,
    CATEGORY: 4,
    NEWS: 5,
    STORE: 6,
    NEWS_THREAD: 10,
    PUBLIC_THREAD: 11,
    PRIVATE_THREAD: 12,
    STAGE: 13
};