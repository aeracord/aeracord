import { ThreadChannelType } from "../../../../internal";

export interface ThreadDeleteData {

    /**
     * ID
     *
     * The ID of the thread channel
     */
    id: string;

    /**
     * Type
     *
     * The thread channel's type
     */
    type: ThreadChannelType;

    /**
     * Guild ID
     *
     * The ID of the guild this thread was in
     */
    guildID: string;

    /**
     * Parent ID
     *
     * The ID of the channel this thread was in
     */
    parentID: string;
}