import { CacheInterface, Client, CHANNEL_TYPE_VOICE, Invite, VoiceChannelData } from "../../internal";
import GuildChannel from "../GuildChannel/GuildChannel";
import updateObject from "./updateObject";

export default class VoiceChannel extends GuildChannel {

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
     * Invites
     *
     * The cache manager interface for the invites in this channel
     */
    invites: CacheInterface<Invite>;

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
        Object.defineProperty(this, "invites", {
            value: new CacheInterface<Invite>(this.client, {
                cacheManager: this.client._invites,
                match: (i: Invite) => i.channelID === this.id,
                fetchObject: async (id: string): Promise<Invite | undefined> => await this.client.getInvite(id)
            })
        });
    }

    /**
     * Update Object
     *
     * Update the `VoiceChannel` object with data from a `VoiceChannelData` object
     *
     * @private
     * @param voiceChannel The voice channel to update
     * @param voiceChannelData The data to update the voice channel with
     * @param fromConstructor Should only be `true` when called from this class's constructor
     */
    static _updateObject(voiceChannel: VoiceChannel, voiceChannelData: VoiceChannelData, fromConstructor?: boolean) {
        updateObject(voiceChannel, voiceChannelData, fromConstructor);
    }

    /**
     * Get Invites
     *
     * Get this channel's invites
     *
     * @returns {Promise<Invite[]>} The invites
     */
    getInvites(): Promise<Invite[]> {
        return this.client.getChannelInvites(this);
    }
}