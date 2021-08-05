import { Client, Emoji, EmojiData, RawEmojiData, User } from "../../internal";

export default function dataFromRawData(client: Client, rawData: RawEmojiData, guildID: string): EmojiData {

    // Parse emoji data
    const emojiData: EmojiData = {
        id: rawData.id,
        name: rawData.name,
        guildID,
        animated: Boolean(rawData.animated),
        managed: Boolean(rawData.managed),
        available: Boolean(rawData.available),
        creator: rawData.user ? User._dataFromRawData(client, rawData.user) : undefined,
        requiresColons: Boolean(rawData.require_colons),
        roles: rawData.roles || [],
        fetchedAt: Date.now()
    };

    // Update cached emoji
    Emoji._updateObjectFromData(client, emojiData);

    // Return
    return emojiData;
}