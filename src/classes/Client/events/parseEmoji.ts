import { Client, Emoji } from "../../../internal";
import parseUser from "./parseUser";
import { RawEmojiData } from "./rawEmojiData";

export default function parseEmoji(client: Client, rawData: RawEmojiData): Emoji {

    // Parse emoji
    const emoji: Emoji = new Emoji(client, {
        id: rawData.id,
        name: rawData.name,
        animated: rawData.animated,
        managed: rawData.managed,
        available: rawData.available,
        creator: rawData.user && parseUser(client, rawData.user),
        requiresColons: rawData.require_colons,
        roles: rawData.roles || []
    });

    // Return
    return emoji;
}