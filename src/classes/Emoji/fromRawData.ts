import { EmojiData, RawEmojiData, User } from "../../internal";

export default function fromRawData(rawData: RawEmojiData, guildID: string): EmojiData {

    // Parse emoji data
    return {
        id: rawData.id,
        name: rawData.name,
        guildID,
        animated: rawData.animated,
        managed: rawData.managed,
        available: rawData.available,
        creator: rawData.user && User._fromRawData(rawData.user),
        requiresColons: rawData.require_colons,
        roles: rawData.roles || []
    };
}