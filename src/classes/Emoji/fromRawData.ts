import { Client, Emoji, EmojiData, RawEmojiData, User } from "../../internal";

export default function fromRawData(client: Client, rawData: RawEmojiData, guildID: string): EmojiData {

    // Parse emoji data
    const emojiData: EmojiData = {
        id: rawData.id,
        name: rawData.name,
        guildID,
        animated: Boolean(rawData.animated),
        managed: Boolean(rawData.managed),
        available: Boolean(rawData.available),
        creator: rawData.user ? User._fromRawData(client, rawData.user) : null,
        requiresColons: Boolean(rawData.require_colons),
        roles: rawData.roles || []
    };

    // Create emoji or update object
    if (client._emojis.cacheAll) Emoji.fromData(client, emojiData);
    else Emoji._updateObjectFromData(client, emojiData);

    // Return
    return emojiData;
}