import { CHANNEL_TYPE_CATEGORY, GuildChannelData } from "../../internal";

/**
 * Category Channel Data
 *
 * Represents a `CategoryChannel`
 */
export interface CategoryChannelData extends GuildChannelData {

    /**
     * Type
     *
     * The channel's type
     */
    type: typeof CHANNEL_TYPE_CATEGORY;
}