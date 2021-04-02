import { Client, CHANNEL_TYPE_DM, DMChannelData } from "../../internal";
import TextBasedChannel from "../TextBasedChannel/TextBasedChannel";
import updateObject from "./updateObject";

export default class DMChannel extends TextBasedChannel {

    /**
     * Type
     *
     * The channel's type
     */
    type: typeof CHANNEL_TYPE_DM;

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
        DMChannel._updateObject(this, dmChannelData, true);
    }

    /**
     * Update Object
     *
     * Update the `DMChannel` object with data from a `DMChannelData` object
     *
     * @param dmChannel The DM channel to update
     * @param dmChannelData The data to update the DM channel with
     * @param fromConstructor Should only be `true` when called from this class's constructor
     */
    static _updateObject(dmChannel: DMChannel, dmChannelData: DMChannelData, fromConstructor?: boolean) {
        updateObject(dmChannel, dmChannelData, fromConstructor);
    }
}