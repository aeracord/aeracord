import { AnyChannel, Ban, Client, Emoji, Guild, GuildDeleteData, GuildWidget, Invite, Member, Message, RawGuildDeleteData, Role, Template, VanityInvite, Webhook, WelcomeScreen } from "../../../../internal";
import ready from "../ready";

export default function guildDelete(client: Client, rawData: RawGuildDeleteData) {

    // Parse data
    const data: GuildDeleteData = {
        id: rawData.id
    };

    // Initial guild delete event
    if (client._uninitializedGuilds.has(data.id)) {

        // Remove from uninitialized guilds
        client._uninitializedGuilds.delete(data.id);

        // Add to ready data
        client._readyData?.data.unavailableGuilds.push(data);

        // Ready
        if (client._uninitializedGuilds.size === 0) ready(client);
    }

    // Guild unavailable
    else if (rawData.unavailable) {

        // Add to unavailable guilds
        client._unavailableGuilds.add(data.id);

        // Emit event
        client.emit("guildUnavailable", data, {
            rawData,
            guild: client.guilds.get(data.id)
        });
    }

    // Removed from guild
    else {

        // Get guild
        const guild: Guild | undefined = client.guilds.get(data.id);

        // Mark as deleted
        if (guild) guild._markAsDeleted();

        // Mark bans as deleted
        const bans: Ban[] = [...client.bans.filter((e: Ban) => e.guildID === data.id).values()];
        bans.forEach((e: Ban) => e._markAsDeleted());

        // Mark channels as deleted
        const channels: AnyChannel[] = [...client.channels.filter((e: AnyChannel) => {
            if ("guildID" in e) return e.guildID === data.id;
            else return false;
        }).values()];
        channels.forEach((e: AnyChannel) => e._markAsDeleted());

        // Mark emojis as deleted
        const emojis: Emoji[] = [...client.emojis.filter((e: Emoji) => e.guildID === data.id).values()];
        emojis.forEach((e: Emoji) => e._markAsDeleted());

        // Mark guild widget as deleted
        const guildWidget: GuildWidget | undefined = client.guildWidgets.get(data.id);
        if (guildWidget) guildWidget._markAsDeleted();

        // Mark invites as deleted
        const invites: Invite[] = [...client.invites.filter((e: Invite) => e.guildID === data.id).values()];
        invites.forEach((e: Invite) => e._markAsDeleted());

        // Mark members as deleted
        const members: Member[] = [...client.members.filter((e: Member) => e.guildID === data.id).values()];
        members.forEach((e: Member) => e._markAsDeleted());

        // Mark messages as deleted
        const messages: Message[] = [...client.messages.filter((e: Message) => e.guildID === data.id).values()];
        messages.forEach((e: Message) => e._markAsDeleted());

        // Mark roles as deleted
        const roles: Role[] = [...client.roles.filter((e: Role) => e.guildID === data.id).values()];
        roles.forEach((e: Role) => e._markAsDeleted());

        // Mark templates as deleted
        const templates: Template[] = [...client.templates.filter((e: Template) => e.sourceGuildID === data.id).values()];
        templates.forEach((e: Template) => e._markAsDeleted());

        // Mark vanity invite as deleted
        const vanityInvite: VanityInvite | undefined = client.vanityInvites.get(data.id);
        if (vanityInvite) vanityInvite._markAsDeleted();

        // Mark webhooks as deleted
        const webhooks: Webhook[] = [...client.webhooks.filter((e: Webhook) => e.guildID === data.id).values()];
        webhooks.forEach((e: Webhook) => e._markAsDeleted());

        // Mark welcome screen as deleted
        const welcomeScreen: WelcomeScreen | undefined = client.welcomeScreens.get(data.id);
        if (welcomeScreen) welcomeScreen._markAsDeleted();

        // Emit event
        client.emit("guildDelete", data, {
            rawData,
            guild
        });
    }
}