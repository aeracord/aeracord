import { Channel, ChannelData, Client } from "../../internal";

export interface TextBasedChannelData extends ChannelData {
    lastMessageID?: string;
    lastPinTimestamp?: number;
}

export default class TextBasedChannel extends Channel {

    /**
     * Last Message ID
     *
     * The ID of the last message in this channel
     */
    lastMessageID?: string;

    /**
     * Last Pin Timestamp
     *
     * The timestamp of when the last pin in this channel was
     */
    lastPinTimestamp?: number;

    /**
     * Text Based Channel
     *
     * @param client The client
     * @param textBasedChannelData Options to initialize this text based channel with
     * @param textBasedChannelData.lastMessageID The ID of the last message in this channel
     * @param textBasedChannelData.lastPinTimestamp The timestamp of when the last pin in this channel was
     */
    constructor(client: Client, textBasedChannelData: TextBasedChannelData) {

        // Super
        super(client, textBasedChannelData);

        // Set data
        this.lastMessageID = textBasedChannelData.lastMessageID;
        this.lastPinTimestamp = textBasedChannelData.lastPinTimestamp;
    }
}