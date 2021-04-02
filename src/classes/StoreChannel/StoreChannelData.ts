import { CHANNEL_TYPE_STORE, GuildChannelData } from "../../internal";

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
    type: typeof CHANNEL_TYPE_STORE;
}