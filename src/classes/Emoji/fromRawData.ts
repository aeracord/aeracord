import { Client, Emoji, RawEmojiData, User } from "../../internal";

export default function fromRawData(client: Client, rawData: RawEmojiData, guildID: string): Emoji {

    // Parse emoji
    const emoji: Emoji = new Emoji(client, {
        id: rawData.id,
        name: rawData.name,
        guildID,
        animated: rawData.animated,
        managed: rawData.managed,
        available: rawData.available,
        creator: rawData.user && User._fromRawData(client, rawData.user),
        requiresColons: rawData.require_colons,
        roles: rawData.roles || []
    });

    // Return
    return emoji;
}