import { ChannelTypes, GuildChannelData } from "../../internal";

/**
 * Store Channel Data
 *
 * Represents a `StoreChannel`
 */
export interface StoreChannelData extends GuildChannelData {

    /**
     * Type
     *
     * The channel's type
     */
    type: typeof ChannelTypes.STORE;
}