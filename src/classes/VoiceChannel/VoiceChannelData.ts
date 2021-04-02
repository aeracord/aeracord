import { CHANNEL_TYPE_VOICE, GuildChannelData } from "../../internal";

/**
 * Voice Channel Data
 *
 * Represents a `VoiceChannel`
 */
export interface VoiceChannelData extends GuildChannelData {

    /**
     * Type
     *
     * The channel's type
     */
    type: typeof CHANNEL_TYPE_VOICE;

    /**
     * Bitrate
     *
     * The channel's bitrate
     */
    bitrate: number | null;

    /**
     * User Limit
     *
     * The channel's user limit
     */
    userLimit: number | null;
}