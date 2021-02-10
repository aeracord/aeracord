export interface ChannelPinsUpdateData {

    /**
     * Guild ID
     *
     * The ID of the guild where the pins were updated
     */
    guildID?: string;

    /**
     * Channel ID
     *
     * The ID of the channel where the pins were updated
     */
    channelID: string;

    /**
     * Last Pin Timestamp
     *
     * The timestamp of when the last pin in the channel was
     */
    lastPinTimestamp?: number;
}