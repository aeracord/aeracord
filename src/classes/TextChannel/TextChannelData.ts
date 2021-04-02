import { CHANNEL_TYPE_TEXT, GuildChannelData, TextBasedChannelData } from "../../internal";

/**
 * Text Channel Data
 *
 * Represents a `TextChannel`
 */
export interface TextChannelData extends GuildChannelData, TextBasedChannelData {

    /**
     * Type
     *
     * The channel's type
     */
    type: typeof CHANNEL_TYPE_TEXT;

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