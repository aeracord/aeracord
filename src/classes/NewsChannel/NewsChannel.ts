import { Client, TextChannelData } from "../../internal";
import TextChannel from "../TextChannel/TextChannel";

export interface NewsChannelData extends TextChannelData { }

export default class NewsChannel extends TextChannel {

    /**
     * News Channel
     *
     * @param client The client
     * @param newsChannelData Options to initialize this category channel with
     */
    constructor(client: Client, newsChannelData: NewsChannelData) {

        // Super
        super(client, newsChannelData);
    }
}