import { GuildResolvable } from "../../internal";

export default function resolveID(guildResolvable: GuildResolvable): string | undefined {

    // Ban, emoji, guild channel, guild widget, invite, member, role, vanity invite, webhook, welcome screen
    if ((typeof guildResolvable === "object") && ("guildID" in guildResolvable)) return guildResolvable.guildID;

    // Template
    else if ((typeof guildResolvable === "object") && ("sourceGuildID" in guildResolvable)) return guildResolvable.sourceGuildID;

    // Guild
    else if ((typeof guildResolvable === "object") && ("id" in guildResolvable)) return guildResolvable.id;

    // Guild ID
    else if (typeof guildResolvable === "string") return guildResolvable;
}