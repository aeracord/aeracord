import { Client, GuildChannel, GuildChannelData } from "../../internal";

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
        this.bitrate = voiceChannelData.bitrate;
        this.userLimit = voiceChannelData.userLimit;
    }
}