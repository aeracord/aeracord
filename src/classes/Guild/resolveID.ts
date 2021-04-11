import { GuildResolvable } from "../../internal";
import isID from "../../util/isID";

export default function resolveID(guildResolvable: GuildResolvable): string | undefined {

    // Ban, emoji, guild channel, guild widget, invite, member, role, vanity invite, webhook, welcome screen
    if ((typeof guildResolvable === "object") && ("guildID" in guildResolvable)) return guildResolvable.guildID;

    // Template
    else if ((typeof guildResolvable === "object") && ("sourceGuildID" in guildResolvable)) return guildResolvable.sourceGuildID;

    // Guild
    else if ((typeof guildResolvable === "object") && ("id" in guildResolvable)) return guildResolvable.id;

    // Guild ID
    else if (isID(guildResolvable)) return guildResolvable;
}