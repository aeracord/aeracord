import { CategoryChannel, Client, DMChannel, GuildChannel, NewsChannel, RawChannelData, StoreChannel, TextChannel, VoiceChannel } from "../../internal";
import fromRawData from "./fromRawData";
import resolveID from "./resolveID";

export interface ChannelData {
    id: string;
}

export type AnyChannel = Channel | GuildChannel | DMChannel | TextChannel | VoiceChannel | CategoryChannel | NewsChannel | StoreChannel;

export type ChannelType = typeof CHANNEL_TYPE_TEXT | typeof CHANNEL_TYPE_DM | typeof CHANNEL_TYPE_VOICE | typeof CHANNEL_TYPE_CATEGORY | typeof CHANNEL_TYPE_NEWS | typeof CHANNEL_TYPE_STORE;
export const CHANNEL_TYPE_TEXT = 0;
export const CHANNEL_TYPE_DM = 1;
export const CHANNEL_TYPE_VOICE = 2;
export const CHANNEL_TYPE_CATEGORY = 4;
export const CHANNEL_TYPE_NEWS = 5;
export const CHANNEL_TYPE_STORE = 6;

export type ChannelResolvable = AnyChannel | string;

export default class Channel {

    /**
     * Client
     *
     * The client
     */
    client: Client;

    /**
     * ID
     *
     * The channel's ID
     */
    id: string;

    /**
     * Channel
     *
     * @param client The client
     * @param channelData Options to initialize this channel with
     * @param channelData.id The channel's ID
     */
    constructor(client: Client, channelData: ChannelData) {

        // Set data
        this.client = client;
        this.id = channelData.id;
    }

    /**
     * From Raw Data
     *
     * Create an `Channel` from a `RawChannelData` object
     *
     * @param rawData The raw data from the API
     *
     * @returns {Channel} The channel
     */
    static _fromRawData = (client: Client, rawData: RawChannelData): Channel => fromRawData(client, rawData);

    /**
     * Resolve ID
     *
     * Resolve an object to a channel ID
     *
     * @param channelResolvable The channel resolvable
     *
     * @returns {string | undefined} The resolved channel ID, or `undefined` if the channel resolvable is invalid
     */
    static resolveID = (channelResolvable: ChannelResolvable): string | undefined => resolveID(channelResolvable);
}