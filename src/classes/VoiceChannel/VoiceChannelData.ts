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

    /**
     * Video Quality Mode
     *
     * The channel's video quality mode
     */
    videoQualityMode: VideoQualityMode;
}

/**
 * Video Quality Mode
 * https://discord.com/developers/docs/resources/channel#channel-object-video-quality-modes
 */
export type VideoQualityMode = typeof VIDEO_QUALITY_MODE_AUTO | typeof VIDEO_QUALITY_MODE_FULL;
export const VIDEO_QUALITY_MODE_AUTO = 1;
export const VIDEO_QUALITY_MODE_FULL = 2;