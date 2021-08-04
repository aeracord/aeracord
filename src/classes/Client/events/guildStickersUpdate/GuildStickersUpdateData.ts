import { Sticker } from "../../../../internal";

export interface GuildStickersUpdateData {

    /**
     * Guild ID
     *
     * The ID of the guild the stickers are in
     */
    guildID: string;

    /**
     * Stickers
     *
     * The stickers
     */
    stickers: Sticker[];
}