import { Client, GuildChannel, GuildChannelData } from "../../internal";

export interface CategoryChannelData extends GuildChannelData { }

export default class CategoryChannel extends GuildChannel {

    /**
     * Category Channel
     *
     * @param client The client
     * @param categoryChannelData Options to initialize this category channel with
     */
    constructor(client: Client, categoryChannelData: CategoryChannelData) {

        // Super
        super(client, categoryChannelData);
    }
}