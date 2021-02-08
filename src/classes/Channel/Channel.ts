import { CategoryChannel, Client, DMChannel, GuildChannel, NewsChannel, StoreChannel, TextChannel, VoiceChannel } from "../../internal";

export interface ChannelData {
    id: string;
}

export type AnyChannel = Channel | GuildChannel | DMChannel | TextChannel | VoiceChannel | CategoryChannel | NewsChannel | StoreChannel;

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
     * Debug
     *
     * Log debug info
     *
     * @param info Debug info to log
     */
    _debug = (info: string) => this.client._debug(info);
}