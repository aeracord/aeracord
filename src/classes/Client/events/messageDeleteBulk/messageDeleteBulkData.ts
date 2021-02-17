export interface MessageDeleteBulkData {

    /**
     * IDs
     *
     * The IDs of the messages
     */
    ids: string[];

    /**
     * Channel ID
     *
     * The ID of the channel these messages were in
     */
    channelID: string;

    /**
     * Guild ID
     *
     * The ID of the guild these messages were in
     */
    guildID?: string;
}