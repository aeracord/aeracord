import { Base, CategoryChannel, CategoryChannelData, ChannelData, ChannelType, Client, DMChannel, DMChannelData, GuildChannel, GuildChannelData, NewsChannel, NewsChannelData, RawChannelData, StoreChannel, StoreChannelData, TextChannel, TextChannelData, VoiceChannel, VoiceChannelData } from "../../internal";
import fromData from "./fromData";
import fromRawData from "./fromRawData";
import resolveID from "./resolveID";
import updateObject from "./updateObject";
import updateObjectFromData from "./updateObjectFromData";

export type AnyChannel = Channel | GuildChannel | DMChannel | TextChannel | VoiceChannel | CategoryChannel | NewsChannel | StoreChannel;

export type AnyChannelData = ChannelData | GuildChannelData | DMChannelData | TextChannelData | VoiceChannelData | CategoryChannelData | NewsChannelData | StoreChannelData;

/**
 * Channel Resolvable
 *
 * The types that can be resolved to a channel
 */
export type ChannelResolvable = AnyChannel | string;

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

        // Cache channel
        this.client._channels.cache(this.id, this);
    }

    /**
     * From Raw Data
     *
     * Create a `ChannelData` object from a `RawChannelData` object
     *
     * @param rawData The raw data from the API
     *
     * @returns {AnyChannelData} The channel data
     */
    static _fromRawData(client: Client, rawData: RawChannelData): AnyChannelData {
        return fromRawData(client, rawData);
    }

    /**
     * From Data
     *
     * Create a `Channel` from a `ChannelData` object
     *
     * @param client The client
     * @param channelData The channel data
     *
     * @returns {Channel} The channel
     */
    static fromData(client: Client, channelData: AnyChannelData): Channel {
        return fromData(client, channelData);
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
     * @param client The client
     * @param channelData The channel data
     *
     * @returns {Channel | undefined} The channel
     */
    static _updateObjectFromData(client: Client, channelData: ChannelData): Channel | undefined {
        return updateObjectFromData(client, channelData);
    }

    /**
     * Delete
     *
     * Delete a guild channel or close a DM channel
     *
     * @returns {Promise<AnyChannelData>} The deleted or closed channel's data
     */
    delete(): Promise<AnyChannelData> {
        return this.client.deleteChannel(this);
    }
}