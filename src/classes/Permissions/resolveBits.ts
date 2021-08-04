import { Permissions, PermissionsResolvable } from "../../internal";

export default function resolveBits(permissionsResolvable: PermissionsResolvable): bigint {

    // Permissions
    if (permissionsResolvable instanceof Permissions) return permissionsResolvable.bits;

    /**
     * Permission name
     * https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags
     */
    else if (permissionsResolvable === "CREATE_INSTANT_INVITE") return BigInt("0x1");
    else if (permissionsResolvable === "KICK_MEMBERS") return BigInt("0x2");
    else if (permissionsResolvable === "BAN_MEMBERS") return BigInt("0x4");
    else if (permissionsResolvable === "ADMINISTRATOR") return BigInt("0x8");
    else if (permissionsResolvable === "MANAGE_CHANNELS") return BigInt("0x10");
    else if (permissionsResolvable === "MANAGE_GUILD") return BigInt("0x20");
    else if (permissionsResolvable === "ADD_REACTIONS") return BigInt("0x40");
    else if (permissionsResolvable === "VIEW_AUDIT_LOG") return BigInt("0x80");
    else if (permissionsResolvable === "PRIORITY_SPEAKER") return BigInt("0x100");
    else if (permissionsResolvable === "STREAM") return BigInt("0x200");
    else if (permissionsResolvable === "VIEW_CHANNEL") return BigInt("0x400");
    else if (permissionsResolvable === "SEND_MESSAGES") return BigInt("0x800");
    else if (permissionsResolvable === "SEND_TTS_MESSAGES") return BigInt("0x1000");
    else if (permissionsResolvable === "MANAGE_MESSAGES") return BigInt("0x2000");
    else if (permissionsResolvable === "EMBED_LINKS") return BigInt("0x4000");
    else if (permissionsResolvable === "ATTACH_FILES") return BigInt("0x8000");
    else if (permissionsResolvable === "READ_MESSAGE_HISTORY") return BigInt("0x10000");
    else if (permissionsResolvable === "MENTION_EVERYONE") return BigInt("0x20000");
    else if (permissionsResolvable === "USE_EXTERNAL_EMOJIS") return BigInt("0x40000");
    else if (permissionsResolvable === "VIEW_GUILD_INSIGHTS") return BigInt("0x80000");
    else if (permissionsResolvable === "CONNECT") return BigInt("0x100000");
    else if (permissionsResolvable === "SPEAK") return BigInt("0x200000");
    else if (permissionsResolvable === "MUTE_MEMBERS") return BigInt("0x400000");
    else if (permissionsResolvable === "DEAFEN_MEMBERS") return BigInt("0x800000");
    else if (permissionsResolvable === "MOVE_MEMBERS") return BigInt("0x1000000");
    else if (permissionsResolvable === "USE_VAD") return BigInt("0x2000000");
    else if (permissionsResolvable === "CHANGE_NICKNAME") return BigInt("0x4000000");
    else if (permissionsResolvable === "MANAGE_NICKNAMES") return BigInt("0x8000000");
    else if (permissionsResolvable === "MANAGE_ROLES") return BigInt("0x10000000");
    else if (permissionsResolvable === "MANAGE_WEBHOOKS") return BigInt("0x20000000");
    else if (permissionsResolvable === "MANAGE_EMOJIS_AND_STICKERS") return BigInt("0x40000000");
    else if (permissionsResolvable === "USE_SLASH_COMMANDS") return BigInt("0x80000000");
    else if (permissionsResolvable === "REQUEST_TO_SPEAK") return BigInt("0x100000000");
    else if (permissionsResolvable === "MANAGE_THREADS") return BigInt("0x400000000");
    else if (permissionsResolvable === "USE_PUBLIC_THREADS") return BigInt("0x800000000");
    else if (permissionsResolvable === "USE_PRIVATE_THREADS") return BigInt("0x1000000000");

    // String, number, or bigint
    else if ((typeof permissionsResolvable === "string") || (typeof permissionsResolvable === "number") || (typeof permissionsResolvable === "bigint")) return BigInt(permissionsResolvable);

    // Array of permissions resolvables
    else if (permissionsResolvable instanceof Array) {

        // Resolve bits
        const bits: Array<bigint> = permissionsResolvable.map((p: PermissionsResolvable) => resolveBits(p));

        // Add bits
        return bits.reduce((total: bigint, bit: bigint) => total | bit, 0n);
    }

    // Invalid bits
    else return 0n;
}