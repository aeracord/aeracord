import { Ban, Emoji, Guild, GuildChannel, GuildResolvable, GuildWidget, Invite, Member, Role, Template, VanityInvite, Webhook, WelcomeScreen } from "../../internal";
import isID from "../../util/isID";

export default function resolveID(guildResolvable: GuildResolvable): string | undefined {

    // Guild
    if (guildResolvable instanceof Guild) return guildResolvable.id;

    // Ban
    else if (guildResolvable instanceof Ban) return guildResolvable.guildID;

    // Emoji
    else if (guildResolvable instanceof Emoji) return guildResolvable.guildID;

    // Guild Channel
    else if (guildResolvable instanceof GuildChannel) return guildResolvable.guildID;

    // Guild Widget
    else if (guildResolvable instanceof GuildWidget) return guildResolvable.guildID;

    // Invite
    else if (guildResolvable instanceof Invite) return guildResolvable.guildID;

    // Member
    else if (guildResolvable instanceof Member) return guildResolvable.guildID;

    // Role
    else if (guildResolvable instanceof Role) return guildResolvable.guildID;

    // Template
    else if (guildResolvable instanceof Template) return guildResolvable.sourceGuildID;

    // Vanity Invite
    else if (guildResolvable instanceof VanityInvite) return guildResolvable.guildID;

    // Webhook
    else if (guildResolvable instanceof Webhook) return guildResolvable.guildID;

    // Welcome Screen
    else if (guildResolvable instanceof WelcomeScreen) return guildResolvable.guildID;

    // Guild ID
    else if (isID(guildResolvable)) return guildResolvable;
}