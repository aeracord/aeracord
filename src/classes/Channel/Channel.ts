import { Base, CategoryChannel, CategoryChannelData, ChannelData, ChannelType, Client, DMChannel, DMChannelData, NewsChannel, NewsChannelData, RawChannelData, READY_STATE_READY, StageChannel, StageChannelData, StoreChannel, StoreChannelData, TextChannel, TextChannelData, ThreadChannel, ThreadChannelData, VoiceChannel, VoiceChannelData } from "../../internal";
import dataFromRawData from "./dataFromRawData";
import fromData from "./fromData";
import resolveID from "./resolveID";
import toData from "./toData";
import updateObject from "./updateObject";
import updateObjectFromData from "./updateObjectFromData";

export type AnyChannel = DMChannel | TextChannel | VoiceChannel | CategoryChannel | NewsChannel | StoreChannel | StageChannel | ThreadChannel;

export type AnyChannelData = DMChannelData | TextChannelData | VoiceChannelData | CategoryChannelData | NewsChannelData | StoreChannelData | StageChannelData | ThreadChannelData;

/**
 * Channel Resolvable
 *
 * The types that can be resolved to a channel
 */
export type ChannelResolvable = AnyChannel | AnyChannelData | string;

export default class Channel extends Base<AnyChannel> {

    /**
     * Type
     *
     * The channel's type
     */
    type: ChannelType;

    /**
     * Channel
     *
     * @param client The client
     * @param channelData Options to initialize this channel with
     * @param channelData.id The channel's ID
     */
    constructor(client: Client, channelData: ChannelData) {

        // Super
        super(client, {
            id: channelData.id,
            cacheManager: client._channels
        });

        // Set data
        Channel._updateObject(this, channelData);

        /**
         * Cache Channel
         *
         * If we need to cache all channels and the clients ready state is `READY`
         * The ready state needs to be `READY` since the client might need to fetch data to cache initial objects
         */
        if ((client._channels.cacheAll) && (client._readyState === READY_STATE_READY) && (!(this instanceof ThreadChannel))) this.cache();
    }

    /**
     * From Raw Data
     *
     * Create a `ChannelData` object from a `RawChannelData` object
     *
     * @private
     * @param client The client
     * @param rawData The raw data from the API
     *
     * @returns {AnyChannel} The channel
     */
    static _fromRawData(client: Client, rawData: RawChannelData): AnyChannel {
        return Channel.fromData(client, Channel._dataFromRawData(client, rawData));
    }

    /**
     * Data From Raw Data
     *
     * Create a `ChannelData` object from a `RawChannelData` object
     *
     * @private
     * @param client The client
     * @param rawData The raw data from the API
     *
     * @returns {AnyChannelData} The channel data
     */
    static _dataFromRawData(client: Client, rawData: RawChannelData): AnyChannelData {
        return dataFromRawData(client, rawData);
    }

    /**
     * From Data
     *
     * Create a `Channel` from a `ChannelData` object
     *
     * @param client The client
     * @param channelData The channel data
     *
     * @returns {AnyChannel} The channel
     */
    static fromData(client: Client, channelData: AnyChannelData): AnyChannel {
        return fromData(client, channelData);
    }

    /**
     * To Data
     *
     * Create a `ChannelData` object from a `Channel`
     *
     * @param channel The channel
     *
     * @returns {AnyChannelData} The channel data
     */
    static toData(channel: AnyChannel): AnyChannelData {
        return toData(channel);
    }

    /**
     * Resolve ID
     *
     * Resolve an object to a channel ID
     *
     * @param channelResolvable The channel resolvable
     *
     * @returns {string | undefined} The resolved channel ID, or `undefined` if the channel resolvable is invalid
     */
    static resolveID(channelResolvable: ChannelResolvable): string | undefined {
        return resolveID(channelResolvable);
    }

    /**
     * Update Object
     *
     * Update the `Channel` object with data from a `ChannelData` object
     *
     * @private
     * @param channel The channel to update
     * @param channelData The data to update the channel with
     */
    static _updateObject(channel: Channel, channelData: ChannelData) {
        updateObject(channel, channelData);
    }

    /**
     * Update Object From Data
     *
     * Update the `Channel` object with data from a `ChannelData` object if it's cached
     *
     * @private
     * @param client The client
     * @param channelData The channel data
     *
     * @returns {AnyChannel | undefined} The channel
     */
    static _updateObjectFromData(client: Client, channelData: AnyChannelData): AnyChannel | undefined {
        return updateObjectFromData(client, channelData);
    }

    /**
     * Cache
     *
     * Cache this `Channel`
     *
     * @param expiresIn The amount of time for when this object can be garbage collected
     * `null` if it should never expire from cache
     * `undefined` to use the cache manager's default
     */
    cache(expiresIn?: number | null) {
        this.client._channels.cache(this.id, this as unknown as AnyChannel, expiresIn);
    }

    /**
     * Delete
     *
     * Delete a guild channel or close a DM channel
     *
     * @param reason The reason for deleting this channel
     *
     * @returns {Promise<AnyChannel>} The deleted or closed channel
     */
    delete(reason?: string): Promise<AnyChannel> {
        return this.client.deleteChannel(this as unknown as AnyChannel, reason);
    }
}