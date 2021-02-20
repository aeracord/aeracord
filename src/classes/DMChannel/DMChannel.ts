import { Client, TextBasedChannelData } from "../../internal";
import TextBasedChannel from "../TextBasedChannel/TextBasedChannel";

export interface DMChannelData extends TextBasedChannelData {
    recipient: string;
}

export default class DMChannel extends TextBasedChannel {

    /**
     * Recipient
     *
     * The ID of the user this DM is with
     */
    recipient: string;

    /**
     * DM Channel
     *
     * @param client The client
     * @param dmChannelData Options to initialize this DM channel with
     * @param dmChannelData.recipient The ID of the user this DM is with
     */
    constructor(client: Client, dmChannelData: DMChannelData) {

        // Super
        super(client, dmChannelData);

        // Set data
        this.recipient = dmChannelData.recipient;
    }
}