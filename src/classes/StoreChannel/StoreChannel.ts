import { Client, GuildChannel, GuildChannelData } from "../../internal";

export interface StoreChannelData extends GuildChannelData { }

export default class StoreChannel extends GuildChannel {

    /**
     * Store Channel
     *
     * @param client The client
     * @param storeChannelData Options to initialize this category channel with
     */
    constructor(client: Client, storeChannelData: StoreChannelData) {

        // Super
        super(client, storeChannelData);
    }
}