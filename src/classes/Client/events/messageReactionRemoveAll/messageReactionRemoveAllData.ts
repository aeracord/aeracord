export interface MessageReactionRemoveAllData {

    /**
     * Message ID
     *
     * The ID of the message these reactions were removed from
     */
    messageID: string;

    /**
     * Channel ID
     *
     * The ID of the channel these reactions were removed in
     */
    channelID: string;

    /**
     * Guild ID
     *
     * The ID of the guild these reactions were removed in
     */
    guildID?: string;
}