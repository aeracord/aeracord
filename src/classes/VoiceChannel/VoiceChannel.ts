import { Client, GuildChannelData } from "../../internal";
import GuildChannel from "../GuildChannel/GuildChannel";
import updateObject from "./updateObject";

export interface VoiceChannelData extends GuildChannelData {
    bitrate?: number;
    userLimit?: number;
}

export default class VoiceChannel extends GuildChannel {

    /**
     * Bitrate
     *
     * The channel's bitrate
     */
    bitrate?: number;

    /**
     * User Limit
     *
     * The channel's user limit
     */
    userLimit?: number;

    /**
     * Voice Channel
     *
     * @param client The client
     * @param voiceChannelData Options to initialize this voice channel with
     * @param voiceChannelData.bitrate The channel's bitrate
     * @param voiceChannelData.userLimit The channel's user limit
     */
    constructor(client: Client, voiceChannelData: VoiceChannelData) {

        // Super
        super(client, voiceChannelData);

        // Set data
        VoiceChannel._updateObject(this, voiceChannelData, true);
    }

    /**
     * Update Object
     *
     * Update the `VoiceChannel` object with data from a `VoiceChannelData` object
     *
     * @param voiceChannel The voice channel to update
     * @param voiceChannelData The data to update the voice channel with
     * @param fromConstructor Should only be `true` when called from this class's constructor
     */
    static _updateObject(voiceChannel: VoiceChannel, voiceChannelData: VoiceChannelData, fromConstructor?: boolean) {
        updateObject(voiceChannel, voiceChannelData, fromConstructor);
    }
}