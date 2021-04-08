import { ReactionEmoji } from "../../../../internal";

export interface MessageReactionRemoveEmojiData {

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
     * Emoji
     *
     * The reaction's emoji
     */
    emoji: ReactionEmoji;
}