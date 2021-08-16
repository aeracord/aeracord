import { ChannelTypes, GuildChannelData, TextBasedChannelData } from "../../internal";

/**
 * News Channel Data
 *
 * Represents a `NewsChannel`
 */
export interface NewsChannelData extends GuildChannelData, TextBasedChannelData {

    /**
     * Type
     *
     * The channel's type
     */
    type: typeof ChannelTypes.NEWS;

    /**
     * Topic
     *
     * The channel's topic
     */
    topic: string | null;

    /**
     * NSFW
     *
     * Whether or not the channel is marked as NSFW
     */
    nsfw: boolean;

    /**
     * Rate Limit Per User
     *
     * The slowmode for this channel in milliseconds
     */
    rateLimitPerUser: number | null;
}