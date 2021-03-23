import { CacheManagerInterface, Channel, ChannelData, Client, Message } from "../../internal";
import updateObject from "./updateObject";

export interface TextBasedChannelData extends ChannelData {
    lastMessageID: string | null;
    lastPinTimestamp: number | null;
}

export default class TextBasedChannel extends Channel {

    /**
     * Messages
     *
     * The cache manager interface for the messages in this channel
     */
    messages: CacheManagerInterface<Message>;

    /**
     * Last Message ID
     *
     * The ID of the last message in this channel
     */
    lastMessageID: string | null;

    /**
     * Last Pin Timestamp
     *
     * The timestamp of when the last pin in this channel was
     */
    lastPinTimestamp: number | null;

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
        TextBasedChannel._updateObject(this, textBasedChannelData, true);
        this.messages = new CacheManagerInterface<Message>(this.client, {
            cacheManager: this.client._messages,
            match: (m: Message) => m.channelID === this.id,
            fetchObject: async (id: string): Promise<Message> => Message.fromData(this.client, await this.client.getChannelMessage(this.id, id))
        });
    }

    /**
     * Update Object
     *
     * Update the `TextBasedChannel` object with data from a `TextBasedChannelData` object
     *
     * @param textBasedChannel The text based channel to update
     * @param textBasedChannelData The data to update the text based channel with
     * @param fromConstructor Should only be `true` when called from this class's constructor
     */
    static _updateObject(textBasedChannel: TextBasedChannel, textBasedChannelData: TextBasedChannelData, fromConstructor?: boolean) {
        updateObject(textBasedChannel, textBasedChannelData, fromConstructor);
    }
}