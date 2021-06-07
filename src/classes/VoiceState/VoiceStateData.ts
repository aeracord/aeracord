import { MemberData } from "../../internal";

/**
 * Voice State Data
 *
 * Represents a `VoiceState`
 */
export interface VoiceStateData {

    /**
     * Guild ID
     *
     * The ID of the guild this voice state is in
     */
    guildID: string;

    /**
     * Channel ID
     *
     * The ID of the channel this voice state is for
     */
    channelID: string;

    /**
     * User ID
     *
     * The ID of the user this voice state is for
     */
    userID: string;

    /**
     * Member
     *
     * The member object of the user this voice state is for
     * Can be `undefined` for voice states in guild create events when the bot doesn't have the guild members intent
     */
    member?: MemberData;

    /**
     * Session ID
     *
     * The voice state's session ID
     */
    sessionID: string;

    /**
     * Muted
     *
     * Whether or not this user is muted
     */
    muted: boolean;

    /**
     * Deafened
     *
     * Whether or not this user is deafened
     */
    deafened: boolean;

    /**
     * Self Muted
     *
     * Whether or not this user is self muted
     */
    selfMuted: boolean;

    /**
     * Self Deafened
     *
     * Whether or not this user is self deafened
     */
    selfDeafened: boolean;

    /**
     * Self Stream
     *
     * Whether or not this user is streaming
     */
    selfStream: boolean;

    /**
     * Self Video
     *
     * Whether or not this user has video enabled
     */
    selfVideo: boolean;

    /**
     * Suppress
     *
     * Whether or not this user is muted by the client
     */
    suppress: boolean;

    /**
     * Request to Speak Timestamp
     *
     * The timestamp for when the user requested to speak
     */
    requestToSpeakTimestamp: number | null;
}