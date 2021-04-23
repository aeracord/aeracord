import { EmojiData, RawEmojiData, User } from "../../internal";

export default function dataFromRawData(rawData: RawEmojiData, guildID: string): EmojiData {

    // Parse emoji data
    return {
        id: rawData.id,
        name: rawData.name,
        guildID,
        animated: Boolean(rawData.animated),
        managed: Boolean(rawData.managed),
        available: Boolean(rawData.available),
        creator: rawData.user ? User._dataFromRawData(rawData.user) : undefined,
        requiresColons: Boolean(rawData.require_colons),
        roles: rawData.roles || [],
        fetchedAt: Date.now()
    };
}