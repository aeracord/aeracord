import Emoji from "../../../Emoji/Emoji";

export interface GuildEmojisUpdateData {

    /**
     * Guild ID
     *
     * The ID of the guild the emojis are in
     */
    guildID: string;

    /**
     * Emojis
     *
     * The emojis
     */
    emojis: Emoji[];
}