import { ReactionEmoji } from "../../../../internal";

export interface MessageReactionRemoveData {

    /**
     * Message ID
     *
     * The ID of the message this reaction was removed from
     */
    messageID: string;

    /**
     * Channel ID
     *
     * The ID of the channel this reaction was removed in
     */
    channelID: string;

    /**
     * Guild ID
     *
     * The ID of the guild this reaction was removed in
     */
    guildID: string | null;

    /**
     * User ID
     *
     * The ID of the user that removed this reaction
     */
    userID: string;

    /**
     * Emoji
     *
     * The reaction's emoji
     */
    emoji: ReactionEmoji;
}