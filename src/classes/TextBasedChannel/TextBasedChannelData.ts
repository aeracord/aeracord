import { ChannelData, TextBasedChannelType } from "../../internal";

/**
 * Text Based Channel Data
 *
 * Represents a `TextBasedChannel`
 */
export interface TextBasedChannelData extends ChannelData {

    /**
     * Type
     *
     * The channel's type
     */
    type: TextBasedChannelType;

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
}