import { ChannelTypes, GuildChannelData } from "../../internal";

/**
 * Stage Channel Data
 *
 * Represents a `StageChannel`
 */
export interface StageChannelData extends GuildChannelData {

    /**
     * Type
     *
     * The channel's type
     */
    type: typeof ChannelTypes.STAGE;
}