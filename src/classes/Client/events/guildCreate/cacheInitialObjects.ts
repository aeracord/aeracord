import { AnyChannelData, Ban, BanData, Channel, Client, Command, CommandData, Emoji, EmojiData, Guild, GuildCreateData, GuildWidget, InitialCacheTypeChannels, InitialCacheTypeGuilds, InitialCacheTypeMessages, Invite, InviteData, Member, MemberData, Message, MessageData, Presence, PresenceData, Role, RoleData, Template, TemplateData, User, VanityInvite, VanityInviteData, Webhook, WebhookData, WelcomeScreen } from "../../../../internal";

/**
 * Cache Initial Objects
 *
 * Creates objects based on the `initialCache` properties set in the client's `CacheStrategy`s for a guild
 * Used when the client receives an initial guild create event
 *
 * @param client The client
 * @param guildCreateData The guild create data
 */
export default async function cacheInitialObjects(client: Client, guildCreateData: GuildCreateData) {

    // Create ban objects
    if (client._cacheStrategies.objects.bans?.initialCache) {

        // Get bans
        const bans: BanData[] | void = await client.getGuildBans(guildCreateData.guild.id).catch(() => { });

        // Cache all bans from this guild
        if (

            // If the initial cache is `true`, all bans should be cached
            client._cacheStrategies.objects.bans.initialCache === true ||

            // Or the guild ID is in the array
            client._cacheStrategies.objects.bans.initialCache.guilds?.includes(guildCreateData.guild.id)
        ) {

            // Loop through bans
            if (bans) bans.forEach((b: BanData) => Ban.fromData(client, b));
        }

        // Cache specific bans
        else if (

            // If the initial cache has ban IDs
            client._cacheStrategies.objects.bans.initialCache.ids
        ) {

            // Loop through bans
            if (bans) bans.filter((b: BanData) => (client._cacheStrategies.objects.bans?.initialCache as InitialCacheTypeGuilds).ids?.includes(`${guildCreateData.guild.id}_${b.user.id}`)).forEach((b: BanData) => Ban.fromData(client, b));
        }
    }

    // Create channel objects
    if (

        // If the client is caching all channel objects, itll be cached when creating the `GuildCreateData` object
        !client._cacheStrategies.objects.channels?.cacheAll &&

        // If the initial cache is defined
        client._cacheStrategies.objects.channels?.initialCache
    ) {

        // Cache all channels from this guild
        if (

            // If the initial cache is `true`, all channels should be cached
            client._cacheStrategies.objects.channels.initialCache === true ||

            // Or the guild ID is in the array
            client._cacheStrategies.objects.channels.initialCache.guilds?.includes(guildCreateData.guild.id)
        ) {

            // Loop through channels
            guildCreateData.channels.forEach((c: AnyChannelData) => Channel.fromData(client, c));
        }

        // Cache specific channels
        else if (

            // If the initial cache has channel IDs
            client._cacheStrategies.objects.channels.initialCache.ids
        ) {

            // Loop through channels
            guildCreateData.channels.filter((c: AnyChannelData) => (client._cacheStrategies.objects.channels?.initialCache as InitialCacheTypeGuilds).ids?.includes(c.id)).forEach((c: AnyChannelData) => Channel.fromData(client, c));
        }
    }

    // Create command objects
    if (

        // If the initial cache is `true`, all commands should be cached
        client._cacheStrategies.objects.commands?.initialCache === true ||

        (

            // If the initial cache is defined
            client._cacheStrategies.objects.commands?.initialCache &&

            // And the guild ID is in the array
            client._cacheStrategies.objects.commands.initialCache.guilds?.includes(guildCreateData.guild.id)
        )
    ) {

        // Get commands
        const commands: CommandData[] | void = await client.getGuildCommands(guildCreateData.guild.id).catch(() => { });

        // Loop through commands
        if (commands) commands.forEach((c: CommandData) => Command.fromData(client, c));
    }

    // Create emoji objects
    if (

        // If the client is caching all emoji objects, itll be cached when creating the `GuildCreateData` object
        !client._cacheStrategies.objects.emojis?.cacheAll &&

        // If the initial cache is defined
        client._cacheStrategies.objects.emojis?.initialCache
    ) {

        // Cache all emojis from this guild
        if (

            // If the initial cache is `true`, all emojis should be cached
            client._cacheStrategies.objects.emojis.initialCache === true ||

            // Or the guild ID is in the array
            client._cacheStrategies.objects.emojis.initialCache.guilds?.includes(guildCreateData.guild.id)
        ) {

            // Loop through emojis
            guildCreateData.guild.emojiData.forEach((e: EmojiData) => Emoji.fromData(client, e));
        }

        // Cache specific emojis
        else if (

            // If the initial cache has emoji IDs
            client._cacheStrategies.objects.emojis.initialCache.ids
        ) {

            // Loop through emojis
            guildCreateData.guild.emojiData.filter((e: EmojiData) => (client._cacheStrategies.objects.emojis?.initialCache as InitialCacheTypeGuilds).ids?.includes(e.id)).forEach((e: EmojiData) => Emoji.fromData(client, e));
        }
    }

    // Create guild object
    if (

        // If the client is caching all guild objects, itll be cached when creating the `GuildCreateData` object
        !client._cacheStrategies.objects.guilds?.cacheAll &&

        // Check IDs
        (

            // If the initial cache is `true`, all guilds should be cached
            client._cacheStrategies.objects.guilds?.initialCache === true ||
            (

                // Otherwise, if its an array of IDs
                client._cacheStrategies.objects.guilds?.initialCache instanceof Array &&

                // And the guild ID is in the array
                client._cacheStrategies.objects.guilds.initialCache.includes(guildCreateData.guild.id)
            )
        )
    ) Guild.fromData(client, guildCreateData.guild);

    // Create guild widget object
    if (

        // If the client is caching all guild widget objects, itll be cached when creating the `GuildCreateData` object
        !client._cacheStrategies.objects.guildWidgets?.cacheAll &&

        // Check IDs
        (

            // If the initial cache is `true`, all guild widgets should be cached
            client._cacheStrategies.objects.guildWidgets?.initialCache === true ||
            (

                // Otherwise, if its an array of IDs
                client._cacheStrategies.objects.guildWidgets?.initialCache instanceof Array &&

                // And the guild ID is in the array
                client._cacheStrategies.objects.guildWidgets.initialCache.includes(guildCreateData.guild.id)
            )
        )
    ) GuildWidget.fromData(client, guildCreateData.guild.widget);

    // Create invite objects
    if (client._cacheStrategies.objects.invites?.initialCache) {

        // Get invites
        const invites: InviteData[] | void = await client.getGuildInvites(guildCreateData.guild.id).catch(() => { });

        // Cache all invites from this guild
        if (

            // If the initial cache is `true`, all invites should be cached
            client._cacheStrategies.objects.invites.initialCache === true ||

            // Or the guild ID is in the array
            client._cacheStrategies.objects.invites.initialCache.guilds?.includes(guildCreateData.guild.id)
        ) {

            // Loop through invites
            if (invites) invites.forEach((i: InviteData) => Invite.fromData(client, i));
        }

        // Cache invites from specific channels
        else if (

            // If the initial cache has channel IDs
            client._cacheStrategies.objects.invites.initialCache.channels
        ) {

            // Loop through invites
            if (invites) invites.filter((i: InviteData) => (client._cacheStrategies.objects.invites?.initialCache as InitialCacheTypeChannels).channels?.includes(i.channelID)).forEach((i: InviteData) => Invite.fromData(client, i));
        }

        // Cache specific invites
        if (

            // If the initial cache isnt a boolean
            typeof client._cacheStrategies.objects.invites.initialCache !== "boolean" &&

            // If the initial cache has invite IDs
            client._cacheStrategies.objects.invites.initialCache.ids
        ) {

            // Loop through invites
            if (invites) invites.filter((i: InviteData) => (client._cacheStrategies.objects.invites?.initialCache as InitialCacheTypeChannels).ids?.includes(i.code)).forEach((i: InviteData) => Invite.fromData(client, i));
        }
    }

    // Create member objects
    if (

        // If the client is caching all member objects, itll be cached when creating the `GuildCreateData` object
        !client._cacheStrategies.objects.members?.cacheAll &&

        // If the initial cache is defined
        client._cacheStrategies.objects.members?.initialCache
    ) {

        // Cache all members from this guild
        if (

            // If the initial cache is `true`, all members should be cached
            client._cacheStrategies.objects.members.initialCache === true ||

            // Or the guild ID is in the array
            client._cacheStrategies.objects.members.initialCache.guilds?.includes(guildCreateData.guild.id)
        ) {

            // Loop through members
            guildCreateData.members.forEach((m: MemberData) => Member.fromData(client, m));
        }

        // Cache specific members
        else if (

            // If the initial cache has member IDs
            client._cacheStrategies.objects.members.initialCache.ids
        ) {

            // Loop through members
            guildCreateData.members.filter((m: MemberData) => (client._cacheStrategies.objects.members?.initialCache as InitialCacheTypeGuilds).ids?.includes(`${guildCreateData.guild.id}_${m.user.id}`)).forEach((m: MemberData) => Member.fromData(client, m));
        }
    }

    // Create message objects
    if (client._cacheStrategies.objects.messages?.initialCache) {

        // Define message data
        let messageData: MessageData[] = [];

        // Define fetch limit
        const fetchLimit: number | undefined = typeof client._cacheStrategies.objects.messages.initialCache === "boolean" ?
            undefined :
            client._cacheStrategies.objects.messages.initialCache.count;

        // Cache all messages from this guild
        if (

            // If the initial cache is `true`, all messages should be cached
            client._cacheStrategies.objects.messages.initialCache === true ||

            // Or the guild ID is in the array
            client._cacheStrategies.objects.messages.initialCache.guilds?.includes(guildCreateData.guild.id)
        ) {

            // Get messages
            const messages: MessageData[][] = (await Promise.all(guildCreateData.channels.map((c: AnyChannelData) => client.getChannelMessages(c.id, {
                limit: fetchLimit
            }).catch(() => { })))).filter((m: MessageData[] | void) => m) as MessageData[][];

            // Set message data
            messageData = messages.flat();
        }

        // Cache messages from specific channels
        else if (

            // If the initial cache has channel IDs
            client._cacheStrategies.objects.messages.initialCache.channels
        ) {

            // Get channels
            const channels: string[] = guildCreateData.channels.map((c: AnyChannelData) => c.id).filter((id: string) => (client._cacheStrategies.objects.messages?.initialCache as InitialCacheTypeMessages).channels?.includes(id));

            // Get messages
            const messages: MessageData[][] = (await Promise.all(channels.map((c: string) => client.getChannelMessages(c, {
                limit: fetchLimit
            }).catch(() => { })))).filter((m: MessageData[] | void) => m) as MessageData[][];

            // Set message data
            messageData = messages.flat();
        }

        // Cache specific messages
        if (

            // If the initial cache isnt a boolean
            typeof client._cacheStrategies.objects.messages.initialCache !== "boolean" &&

            // If the initial cache has message IDs
            client._cacheStrategies.objects.messages.initialCache.ids
        ) {

            // Get fetched message IDs
            const fetchedMessages: string[] = messageData.map((m: MessageData) => m.id);

            // Get channel IDs
            const channels: string[] = guildCreateData.channels.map((c: AnyChannelData) => c.id);

            // Get message IDs that are in the guild and not already fetched
            const messageIDs: string[] = client._cacheStrategies.objects.messages.initialCache.ids.filter((id: string) => channels.includes(id.split("_")[0]) && !fetchedMessages.includes(id.split("_")[1]));

            // Get messages
            const messages: MessageData[] = (await Promise.all(messageIDs.map((id: string) => client.getChannelMessage(id.split("_")[0], id.split("_")[1]).catch(() => { })))).filter((m: MessageData | void) => m) as MessageData[];

            // Add to message data
            messageData.push(...messages);
        }

        // Loop through message data
        messageData.forEach((m: MessageData) => Message.fromData(client, m));
    }

    // Create presence objects
    // If the client is caching all presence objects, itll be cached when creating the `GuildCreateData` object
    if (!client._cacheStrategies.objects.presences?.cacheAll) {

        // Loop through presences
        guildCreateData.presences.forEach((p: PresenceData) => {

            // Check IDs
            if (

                // If the initial cache is `true`, all presences should be cached
                client._cacheStrategies.objects.presences?.initialCache === true ||
                (

                    // Otherwise, if its an array of IDs
                    client._cacheStrategies.objects.presences?.initialCache instanceof Array &&

                    // And the user ID is in the array
                    client._cacheStrategies.objects.presences.initialCache.includes(p.user.id)
                )
            ) Presence.fromData(client, p);
        });
    }

    // Create role objects
    if (

        // If the client is caching all role objects, itll be cached when creating the `GuildCreateData` object
        !client._cacheStrategies.objects.roles?.cacheAll &&

        // If the initial cache is defined
        client._cacheStrategies.objects.roles?.initialCache
    ) {

        // Cache all roles from this guild
        if (

            // If the initial cache is `true`, all roles should be cached
            client._cacheStrategies.objects.roles.initialCache === true ||

            // Or the guild ID is in the array
            client._cacheStrategies.objects.roles.initialCache.guilds?.includes(guildCreateData.guild.id)
        ) {

            // Loop through roles
            guildCreateData.guild.roleData.forEach((r: RoleData) => Role.fromData(client, r));
        }

        // Cache specific roles
        else if (

            // If the initial cache has role IDs
            client._cacheStrategies.objects.roles.initialCache.ids
        ) {

            // Loop through roles
            guildCreateData.guild.roleData.filter((r: RoleData) => (client._cacheStrategies.objects.roles?.initialCache as InitialCacheTypeGuilds).ids?.includes(r.id)).forEach((r: RoleData) => Role.fromData(client, r));
        }
    }

    // Create template objects
    if (client._cacheStrategies.objects.templates?.initialCache) {

        // Get templates
        const templates: TemplateData[] | void = await client.getGuildTemplates(guildCreateData.guild.id).catch(() => { });

        // Cache all templates from this guild
        if (

            // If the initial cache is `true`, all templates should be cached
            client._cacheStrategies.objects.templates.initialCache === true ||

            // Or the guild ID is in the array
            client._cacheStrategies.objects.templates.initialCache.guilds?.includes(guildCreateData.guild.id)
        ) {

            // Loop through templates
            if (templates) templates.forEach((t: TemplateData) => Template.fromData(client, t));
        }

        // Cache specific templates
        else if (

            // If the initial cache has template IDs
            client._cacheStrategies.objects.templates.initialCache.ids
        ) {

            // Loop through templates
            if (templates) templates.filter((t: TemplateData) => (client._cacheStrategies.objects.templates?.initialCache as InitialCacheTypeGuilds).ids?.includes(t.code)).forEach((t: TemplateData) => Template.fromData(client, t));
        }
    }

    // Create vanity invite object
    if (

        // If the initial cache is `true`, all vanity invites should be cached
        client._cacheStrategies.objects.vanityInvites?.initialCache === true ||
        (

            // Otherwise, if its an array of IDs
            client._cacheStrategies.objects.vanityInvites?.initialCache instanceof Array &&

            // And the guild ID is in the array
            client._cacheStrategies.objects.vanityInvites.initialCache.includes(guildCreateData.guild.id)
        )
    ) {

        // Get vanity invite
        const vanityInvite: VanityInviteData | void = await client.getGuildVanityURL(guildCreateData.guild.id).catch(() => { });

        // Create object
        if (vanityInvite) VanityInvite.fromData(client, vanityInvite);
    }

    // Create webhook objects
    if (client._cacheStrategies.objects.webhooks?.initialCache) {

        // Get webhooks
        const webhooks: WebhookData[] | void = await client.getGuildWebhooks(guildCreateData.guild.id).catch(() => { });

        // Cache all webhooks from this guild
        if (

            // If the initial cache is `true`, all webhooks should be cached
            client._cacheStrategies.objects.webhooks.initialCache === true ||

            // Or the guild ID is in the array
            client._cacheStrategies.objects.webhooks.initialCache.guilds?.includes(guildCreateData.guild.id)
        ) {

            // Loop through webhooks
            if (webhooks) webhooks.forEach((w: WebhookData) => Webhook.fromData(client, w));
        }

        // Cache webhooks from specific channels
        else if (

            // If the initial cache has channel IDs
            client._cacheStrategies.objects.webhooks.initialCache.channels
        ) {

            // Loop through webhooks
            if (webhooks) webhooks.filter((w: WebhookData) => (client._cacheStrategies.objects.webhooks?.initialCache as InitialCacheTypeChannels).channels?.includes(w.channelID)).forEach((w: WebhookData) => Webhook.fromData(client, w));
        }

        // Cache specific webhooks
        if (

            // If the initial cache isnt a boolean
            typeof client._cacheStrategies.objects.webhooks.initialCache !== "boolean" &&

            // If the initial cache has webhook IDs
            client._cacheStrategies.objects.webhooks.initialCache.ids
        ) {

            // Loop through webhooks
            if (webhooks) webhooks.filter((w: WebhookData) => (client._cacheStrategies.objects.webhooks?.initialCache as InitialCacheTypeChannels).ids?.includes(w.id)).forEach((w: WebhookData) => Webhook.fromData(client, w));
        }
    }

    // Create welcome screen object
    if (

        // If there isnt a welcome screen, dont cache anything
        guildCreateData.guild.welcomeScreen &&

        // If the client is caching all welcome screen objects, itll be cached when creating the `GuildCreateData` object
        !client._cacheStrategies.objects.welcomeScreens?.cacheAll &&

        // Check IDs
        (

            // If the initial cache is `true`, all welcome screens should be cached
            client._cacheStrategies.objects.welcomeScreens?.initialCache === true ||
            (

                // Otherwise, if its an array of IDs
                client._cacheStrategies.objects.welcomeScreens?.initialCache instanceof Array &&

                // And the guild ID is in the array
                client._cacheStrategies.objects.welcomeScreens.initialCache.includes(guildCreateData.guild.id)
            )
        )
    ) WelcomeScreen.fromData(client, guildCreateData.guild.welcomeScreen);

    // Create user objects
    // If the client is caching all user objects, itll be cached when creating the `GuildCreateData` object
    if (!client._cacheStrategies.objects.users?.cacheAll) {

        // Loop through members
        guildCreateData.members.forEach((m: MemberData) => {

            // Check IDs
            if (

                // If the initial cache is `true`, all users should be cached
                client._cacheStrategies.objects.users?.initialCache === true ||
                (

                    // Otherwise, if its an array of IDs
                    client._cacheStrategies.objects.users?.initialCache instanceof Array &&

                    // And the user ID is in the array
                    client._cacheStrategies.objects.users.initialCache.includes(m.user.id)
                )
            ) User.fromData(client, m.user);
        });
    }
}