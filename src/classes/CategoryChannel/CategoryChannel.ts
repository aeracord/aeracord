import { CategoryChannelData, Client, CHANNEL_TYPE_CATEGORY } from "../../internal";
import GuildChannel from "../GuildChannel/GuildChannel";
import updateObject from "./updateObject";

export default class CategoryChannel extends GuildChannel {

    /**
     * Type
     *
     * The channel's type
     */
    type: typeof CHANNEL_TYPE_CATEGORY;

    /**
     * Category Channel
     *
     * @param client The client
     * @param categoryChannelData Options to initialize this category channel with
     */
    constructor(client: Client, categoryChannelData: CategoryChannelData) {

        // Super
        super(client, categoryChannelData);

        // Set data
        CategoryChannel._updateObject(this, categoryChannelData, true);
    }

    /**
     * Update Object
     *
     * Update the `CategoryChannel` object with data from a `CategoryChannelData` object
     *
     * @private
     * @param categoryChannel The category channel to update
     * @param categoryChannelData The data to update the category channel with
     * @param fromConstructor Should only be `true` when called from this class's constructor
     */
    static _updateObject(categoryChannel: CategoryChannel, categoryChannelData: CategoryChannelData, fromConstructor?: boolean) {
        updateObject(categoryChannel, categoryChannelData, fromConstructor);
    }
}