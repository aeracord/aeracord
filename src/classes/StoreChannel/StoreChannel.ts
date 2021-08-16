import { ChannelTypes, Client, StoreChannelData } from "../../internal";
import GuildChannel from "../GuildChannel/GuildChannel";
import updateObject from "./updateObject";

export default class StoreChannel extends GuildChannel {

    /**
     * Type
     *
     * The channel's type
     */
    type: typeof ChannelTypes.STORE;

    /**
     * Store Channel
     *
     * @param client The client
     * @param storeChannelData Options to initialize this category channel with
     */
    constructor(client: Client, storeChannelData: StoreChannelData) {

        // Super
        super(client, storeChannelData);

        // Set data
        StoreChannel._updateObject(this, storeChannelData, true);
    }

    /**
     * Update Object
     *
     * Update the `StoreChannel` object with data from a `StoreChannelData` object
     *
     * @private
     * @param storeChannel The store channel to update
     * @param storeChannelData The data to update the store channel with
     * @param fromConstructor Should only be `true` when called from this class's constructor
     */
    static _updateObject(storeChannel: StoreChannel, storeChannelData: StoreChannelData, fromConstructor?: boolean) {
        updateObject(storeChannel, storeChannelData, fromConstructor);
    }
}