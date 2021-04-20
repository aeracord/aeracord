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
export type ChannelType = typeof CHANNEL_TYPE_TEXT | typeof CHANNEL_TYPE_DM | typeof CHANNEL_TYPE_VOICE | typeof CHANNEL_TYPE_CATEGORY | typeof CHANNEL_TYPE_NEWS | typeof CHANNEL_TYPE_STORE;
export const CHANNEL_TYPE_TEXT = 0;
export const CHANNEL_TYPE_DM = 1;
export const CHANNEL_TYPE_VOICE = 2;
export const CHANNEL_TYPE_CATEGORY = 4;
export const CHANNEL_TYPE_NEWS = 5;
export const CHANNEL_TYPE_STORE = 6;