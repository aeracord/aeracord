import { Client, MemberData, RawVoiceStateData, VoiceStateData } from "../../internal";
import dataFromRawData from "./dataFromRawData";
import fromData from "./fromData";
import toData from "./toData";

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
     * @private
     * @param client The client
     * @param rawData The raw data from the API
     *
     * @returns {VoiceState} The voice state
     */
    static _fromRawData(client: Client, rawData: RawVoiceStateData): VoiceState {
        return VoiceState.fromData(client, VoiceState._dataFromRawData(rawData));
    }

    /**
     * Data From Raw Data
     *
     * Create a `VoiceStateData` object from a `RawVoiceStateData` object
     *
     * @private
     * @param rawData The raw data from the API
     *
     * @returns {VoiceStateData} The voice state data
     */
    static _dataFromRawData(rawData: RawVoiceStateData): VoiceStateData {
        return dataFromRawData(rawData);
    }

    /**
     * From Data
     *
     * Create a `VoiceState` from a `VoiceStateData` object
     *
     * @param client The client
     * @param voiceStateData The voice state data
     *
     * @returns {VoiceState} The voice state
     */
    static fromData(client: Client, voiceStateData: VoiceStateData): VoiceState {
        return fromData(client, voiceStateData);
    }

    /**
     * To Data
     *
     * Create a `VoiceStateData` object from a `VoiceState`
     *
     * @param voiceState The voice state
     *
     * @returns {VoiceStateData} The voice state data
     */
    static toData(voiceState: VoiceState): VoiceStateData {
        return toData(voiceState);
    }
}