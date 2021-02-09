import { RawEmojiData } from "../rawEmojiData";

export interface RawGuildEmojisUpdateData {
    guild_id: string;
    emojis: RawEmojiData[];
}