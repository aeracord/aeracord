import { Base, CategoryChannel, CategoryChannelData, Client, DMChannel, DMChannelData, GuildChannel, GuildChannelData, NewsChannel, NewsChannelData, RawChannelData, RoleResolvable, StoreChannel, StoreChannelData, TextChannel, TextChannelData, UserResolvable, VoiceChannel, VoiceChannelData } from "../../internal";
import fromData from "./fromData";
import fromRawData from "./fromRawData";
import resolveID from "./resolveID";
import updateObject from "./updateObject";

export interface ChannelData {
    id: string;
    type: ChannelType;
}

export type AnyChannel = Channel | GuildChannel | DMChannel | TextChannel | VoiceChannel | CategoryChannel | NewsChannel | StoreChannel;

export type AnyChannelData = ChannelData | GuildChannelData | DMChannelData | TextChannelData | VoiceChannelData | CategoryChannelData | NewsChannelData | StoreChannelData;

export type ChannelType = typeof CHANNEL_TYPE_TEXT | typeof CHANNEL_TYPE_DM | typeof CHANNEL_TYPE_VOICE | typeof CHANNEL_TYPE_CATEGORY | typeof CHANNEL_TYPE_NEWS | typeof CHANNEL_TYPE_STORE;
export const CHANNEL_TYPE_TEXT = 0;
export const CHANNEL_TYPE_DM = 1;
export const CHANNEL_TYPE_VOICE = 2;
export const CHANNEL_TYPE_CATEGORY = 4;
export const CHANNEL_TYPE_NEWS = 5;
export const CHANNEL_TYPE_STORE = 6;

export type ChannelResolvable = AnyChannel | string;

export default class Channel extends Base<AnyChannel> {

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
     * @returns {ChannelData} The channel data
     */
    static _fromRawData(rawData: RawChannelData): ChannelData {
        return fromRawData(rawData);
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
    static fromData(client: Client, channelData: ChannelData): Channel {
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