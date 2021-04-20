import { Member, ReactionEmoji } from "../../../../internal";

export interface MessageReactionAddData {

    /**
     * Message ID
     *
     * The ID of the message this reaction was added on
     */
    messageID: string;

    /**
     * Channel ID
     *
     * The ID of the channel this reaction was added in
     */
    channelID: string;

    /**
     * Guild ID
     *
     * The ID of the guild this reaction was added in
     */
    guildID: string | null;

    /**
     * User ID
     *
     * The ID of the user that added this reaction
     */
    userID: string;

    /**
     * Member
     *
     * The member object of the user that added this reaction
     */
    member: Member | null;

    /**
     * Emoji
     *
     * The reaction's emoji
     */
    emoji: ReactionEmoji;
}