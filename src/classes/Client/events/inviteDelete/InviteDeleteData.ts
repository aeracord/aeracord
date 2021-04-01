export interface InviteDeleteData {

    /**
     * Code
     *
     * The invite's code
     */
    code: string;

    /**
     * Channel ID
     *
     * The ID of the channel this invite was for
     */
    channelID: string;

    /**
     * Guild ID
     *
     * The ID of the guild this invite was in
     */
    guildID: string;
}