import { Guild, GuildChannel, GuildResolvable, Invite, Member, Role } from "../../internal";

export default function resolveID(guildResolvable: GuildResolvable): string {

    // Guild
    if (guildResolvable instanceof Guild) return guildResolvable.id;

    // Guild Channel
    else if (guildResolvable instanceof GuildChannel) return guildResolvable.guildID;

    // Member
    else if (guildResolvable instanceof Member) return guildResolvable.guildID;

    // Role
    else if (guildResolvable instanceof Role) return guildResolvable.guildID;

    // Invite
    else if (guildResolvable instanceof Invite) return guildResolvable.guildID;

    // Guild ID
    else return guildResolvable;
}