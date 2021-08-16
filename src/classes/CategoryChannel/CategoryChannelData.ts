import { ChannelTypes, GuildChannelData } from "../../internal";

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
    type: typeof ChannelTypes.CATEGORY;
}