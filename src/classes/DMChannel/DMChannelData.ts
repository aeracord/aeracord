import { CHANNEL_TYPE_DM, TextBasedChannelData } from "../../internal";

/**
 * DM Channel Data
 *
 * Represents a `DMChannel`
 */
export interface DMChannelData extends TextBasedChannelData {

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
}