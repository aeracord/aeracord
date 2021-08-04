import { Permissions } from "../../internal";

export default function getAll(permissions: Permissions): Array<bigint> {

    // Define permission bits
    const permissionBits: Array<bigint> = [];

    // Get permission bits
    if (permissions.has("CREATE_INSTANT_INVITE")) permissionBits.push(Permissions.resolveBits("CREATE_INSTANT_INVITE"));
    if (permissions.has("KICK_MEMBERS")) permissionBits.push(Permissions.resolveBits("KICK_MEMBERS"));
    if (permissions.has("BAN_MEMBERS")) permissionBits.push(Permissions.resolveBits("BAN_MEMBERS"));
    if (permissions.has("ADMINISTRATOR")) permissionBits.push(Permissions.resolveBits("ADMINISTRATOR"));
    if (permissions.has("MANAGE_CHANNELS")) permissionBits.push(Permissions.resolveBits("MANAGE_CHANNELS"));
    if (permissions.has("MANAGE_GUILD")) permissionBits.push(Permissions.resolveBits("MANAGE_GUILD"));
    if (permissions.has("ADD_REACTIONS")) permissionBits.push(Permissions.resolveBits("ADD_REACTIONS"));
    if (permissions.has("VIEW_AUDIT_LOG")) permissionBits.push(Permissions.resolveBits("VIEW_AUDIT_LOG"));
    if (permissions.has("PRIORITY_SPEAKER")) permissionBits.push(Permissions.resolveBits("PRIORITY_SPEAKER"));
    if (permissions.has("STREAM")) permissionBits.push(Permissions.resolveBits("STREAM"));
    if (permissions.has("VIEW_CHANNEL")) permissionBits.push(Permissions.resolveBits("VIEW_CHANNEL"));
    if (permissions.has("SEND_MESSAGES")) permissionBits.push(Permissions.resolveBits("SEND_MESSAGES"));
    if (permissions.has("SEND_TTS_MESSAGES")) permissionBits.push(Permissions.resolveBits("SEND_TTS_MESSAGES"));
    if (permissions.has("MANAGE_MESSAGES")) permissionBits.push(Permissions.resolveBits("MANAGE_MESSAGES"));
    if (permissions.has("EMBED_LINKS")) permissionBits.push(Permissions.resolveBits("EMBED_LINKS"));
    if (permissions.has("ATTACH_FILES")) permissionBits.push(Permissions.resolveBits("ATTACH_FILES"));
    if (permissions.has("READ_MESSAGE_HISTORY")) permissionBits.push(Permissions.resolveBits("READ_MESSAGE_HISTORY"));
    if (permissions.has("MENTION_EVERYONE")) permissionBits.push(Permissions.resolveBits("MENTION_EVERYONE"));
    if (permissions.has("USE_EXTERNAL_EMOJIS")) permissionBits.push(Permissions.resolveBits("USE_EXTERNAL_EMOJIS"));
    if (permissions.has("VIEW_GUILD_INSIGHTS")) permissionBits.push(Permissions.resolveBits("VIEW_GUILD_INSIGHTS"));
    if (permissions.has("CONNECT")) permissionBits.push(Permissions.resolveBits("CONNECT"));
    if (permissions.has("SPEAK")) permissionBits.push(Permissions.resolveBits("SPEAK"));
    if (permissions.has("MUTE_MEMBERS")) permissionBits.push(Permissions.resolveBits("MUTE_MEMBERS"));
    if (permissions.has("DEAFEN_MEMBERS")) permissionBits.push(Permissions.resolveBits("DEAFEN_MEMBERS"));
    if (permissions.has("MOVE_MEMBERS")) permissionBits.push(Permissions.resolveBits("MOVE_MEMBERS"));
    if (permissions.has("USE_VAD")) permissionBits.push(Permissions.resolveBits("USE_VAD"));
    if (permissions.has("CHANGE_NICKNAME")) permissionBits.push(Permissions.resolveBits("CHANGE_NICKNAME"));
    if (permissions.has("MANAGE_NICKNAMES")) permissionBits.push(Permissions.resolveBits("MANAGE_NICKNAMES"));
    if (permissions.has("MANAGE_ROLES")) permissionBits.push(Permissions.resolveBits("MANAGE_ROLES"));
    if (permissions.has("MANAGE_WEBHOOKS")) permissionBits.push(Permissions.resolveBits("MANAGE_WEBHOOKS"));
    if (permissions.has("MANAGE_EMOJIS_AND_STICKERS")) permissionBits.push(Permissions.resolveBits("MANAGE_EMOJIS_AND_STICKERS"));
    if (permissions.has("USE_SLASH_COMMANDS")) permissionBits.push(Permissions.resolveBits("USE_SLASH_COMMANDS"));
    if (permissions.has("REQUEST_TO_SPEAK")) permissionBits.push(Permissions.resolveBits("REQUEST_TO_SPEAK"));
    if (permissions.has("MANAGE_THREADS")) permissionBits.push(Permissions.resolveBits("MANAGE_THREADS"));
    if (permissions.has("USE_PUBLIC_THREADS")) permissionBits.push(Permissions.resolveBits("USE_PUBLIC_THREADS"));
    if (permissions.has("USE_PRIVATE_THREADS")) permissionBits.push(Permissions.resolveBits("USE_PRIVATE_THREADS"));
    if (permissions.has("USE_EXTERNAL_STICKERS")) permissionBits.push(Permissions.resolveBits("USE_EXTERNAL_STICKERS"));

    // Return
    return permissionBits;
}