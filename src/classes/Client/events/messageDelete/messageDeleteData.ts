export interface MessageDeleteData {

    /**
     * ID
     *
     * The ID of the message
     */
    id: string;

    /**
     * Channel ID
     *
     * The ID of the channel this message was in
     */
    channelID: string;

    /**
     * Guild ID
     *
     * The ID of the guild this message was in
     */
    guildID: string | null;
}