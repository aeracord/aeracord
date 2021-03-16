import { Client, TextBasedChannelData } from "../../internal";
import TextBasedChannel from "../TextBasedChannel/TextBasedChannel";
import updateObject from "./updateObject";

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
        this._updateObject(dmChannelData);
    }

    /**
     * Update Object
     *
     * Update the `DMChannel` object with data from a `DMChannelData` object
     *
     * @param dmChannelData The data to update this DM channel with
     */
    _updateObject(dmChannelData: DMChannelData) {
        updateObject(this, dmChannelData);
    }
}