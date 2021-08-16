import { ChannelTypes, GuildChannelData } from "../../internal";

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
    type: typeof ChannelTypes.VOICE;

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
export type VideoQualityMode = typeof VideoQualityModes.AUTO | typeof VideoQualityModes.FULL;
export const VideoQualityModes: {

    /**
     * Auto
     *
     * Automatically determine the video quality
     */
    AUTO: 1,

    /**
     * Full
     *
     * Use the best video quality
     */
    FULL: 2
} = {
    AUTO: 1,
    FULL: 2
};