import { RawEmojiData } from "../../../../internal";

export interface RawGuildEmojisUpdateData {
    guild_id: string;
    emojis: RawEmojiData[];
}