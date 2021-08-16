import { ChannelTypes, TextBasedChannelData } from "../../internal";

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
    type: typeof ChannelTypes.DM;

    /**
     * Recipient
     *
     * The ID of the user this DM is with
     */
    recipient: string;
}