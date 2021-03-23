import { Client, MemberData, RawVoiceStateData } from "../../internal";
import fromData from "./fromData";
import fromRawData from "./fromRawData";

export interface VoiceStateData {
    guildID: string;
    channelID: string;
    userID: string;
    member: MemberData;
    sessionID: string;
    muted: boolean;
    deafened: boolean;
    selfMuted: boolean;
    selfDeafened: boolean;
    selfStream: boolean;
    selfVideo: boolean;
    suppress: boolean;
}

export default class VoiceState {

    /**
     * Client
     *
     * The client
     */
    client: Client;

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
     */
    member: MemberData;

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
     * Voice State
     *
     * @param client The client
     * @param voiceStateData Options to initialize this voice state with
     * @param voiceStateData.guildID The ID of the guild this voice state is in
     * @param voiceStateData.channelID The ID of the channel this voice state is for
     * @param voiceStateData.userID The ID of the user this voice state is for
     * @param voiceStateData.member The member object of the user this voice state is for
     * @param voiceStateData.sessionID The voice state's session ID
     * @param voiceStateData.muted Whether or not this user is muted
     * @param voiceStateData.deafened Whether or not this user is deafened
     * @param voiceStateData.selfMuted Whether or not this user is self muted
     * @param voiceStateData.selfDeafened Whether or not this user is self deafened
     * @param voiceStateData.selfStream Whether or not this user is streaming
     * @param voiceStateData.selfVideo Whether or not this user has video enabled
     * @param voiceStateData.suppress Whether or not this user is muted by the client
     */
    constructor(client: Client, voiceStateData: VoiceStateData) {

        // Set data
        this.client = client;
        this.guildID = voiceStateData.guildID;
        this.channelID = voiceStateData.channelID;
        this.userID = voiceStateData.userID;
        this.member = voiceStateData.member;
        this.sessionID = voiceStateData.sessionID;
        this.muted = voiceStateData.muted;
        this.deafened = voiceStateData.deafened;
        this.selfMuted = voiceStateData.selfMuted;
        this.selfDeafened = voiceStateData.selfDeafened;
        this.selfStream = voiceStateData.selfStream;
        this.selfVideo = voiceStateData.selfVideo;
        this.suppress = voiceStateData.suppress;
    }

    /**
     * From Raw Data
     *
     * Create a `VoiceStateData` object from a `RawVoiceStateData` object
     *
     * @param rawData The raw data from the API
     *
     * @returns {VoiceStateData} The voice state data
     */
    static _fromRawData(rawData: RawVoiceStateData): VoiceStateData {
        return fromRawData(rawData);
    }

    /**
     * From Data
     *
     * Create a `VoiceState` from a `VoiceStateData` object
     *
     * @param voiceStateData The voice state data
     *
     * @returns {VoiceState} The voice state
     */
    static fromData(client: Client, voiceStateData: VoiceStateData): VoiceState {
        return fromData(client, voiceStateData);
    }
}