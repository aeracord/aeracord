import { AnyChannelData, Ban, Channel, Client, Emoji, EmojiData, GuildCreateData, InitialCacheTypeChannels, InitialCacheTypeGuilds, InitialCacheTypeMessages, Invite, Member, MemberData, Message, Presence, PresenceData, Role, RoleData, Sticker, StickerData, Template, ThreadChannelData, User, VanityInvite, Webhook } from "../../../../internal";

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
    if (client._cacheStrategies.bans?.initialCache) {

        // Get bans
        const bans: Ban[] | void = await client.getGuildBans(guildCreateData.guild.id).catch(() => { });

        // Cache all bans from this guild
        if (

            // If the initial cache is `true`, all bans should be cached
            client._cacheStrategies.bans.initialCache === true ||

            // Or the guild ID is in the array
            client._cacheStrategies.bans.initialCache.guilds?.includes(guildCreateData.guild.id)
        ) {

            // Loop through bans
            if (bans) bans.forEach((b: Ban) => b.cache());
        }

        // Cache specific bans
        else if (

            // If the initial cache has ban IDs
            client._cacheStrategies.bans.initialCache.ids
        ) {

            // Loop through bans
            if (bans) bans.filter((b: Ban) => (client._cacheStrategies.bans?.initialCache as InitialCacheTypeGuilds).ids?.includes(`${guildCreateData.guild.id}_${b.user.id}`)).forEach((b: Ban) => b.cache());
        }
    }

    // Create channel objects
    if (client._cacheStrategies.channels?.initialCache) {

        // Cache all channels from this guild
        if (

            // If the initial cache is `true`, all channels should be cached
            client._cacheStrategies.channels.initialCache === true ||

            // Or the guild ID is in the array
            client._cacheStrategies.channels.initialCache.guilds?.includes(guildCreateData.guild.id)
        ) {

            // Loop through channels
            guildCreateData.channels.forEach((c: AnyChannelData) => Channel.fromData(client, c).cache());
        }

        // Cache specific channels
        else if (

            // If the initial cache has channel IDs
            client._cacheStrategies.channels.initialCache.ids
        ) {

            // Loop through channels
            guildCreateData.channels.filter((c: AnyChannelData) => (client._cacheStrategies.channels?.initialCache as InitialCacheTypeGuilds).ids?.includes(c.id)).forEach((c: AnyChannelData) => Channel.fromData(client, c).cache());
        }
    }

    // Create emoji objects
    if (client._cacheStrategies.emojis?.initialCache) {

        // Cache all emojis from this guild
        if (

            // If the initial cache is `true`, all emojis should be cached
            client._cacheStrategies.emojis.initialCache === true ||

            // Or the guild ID is in the array
            client._cacheStrategies.emojis.initialCache.guilds?.includes(guildCreateData.guild.id)
        ) {

            // Loop through emojis
            guildCreateData.guild.emojiData.forEach((e: EmojiData) => Emoji.fromData(client, e).cache());
        }

        // Cache specific emojis
        else if (

            // If the initial cache has emoji IDs
            client._cacheStrategies.emojis.initialCache.ids
        ) {

            // Loop through emojis
            guildCreateData.guild.emojiData.filter((e: EmojiData) => (client._cacheStrategies.emojis?.initialCache as InitialCacheTypeGuilds).ids?.includes(e.id)).forEach((e: EmojiData) => Emoji.fromData(client, e).cache());
        }
    }

    // Create guild object
    if (

        // If the initial cache is `true`, all guilds should be cached
        client._cacheStrategies.guilds?.initialCache === true ||
        (

            // Otherwise, if its an array of IDs
            client._cacheStrategies.guilds?.initialCache instanceof Array &&

            // And the guild ID is in the array
            client._cacheStrategies.guilds.initialCache.includes(guildCreateData.guild.id)
        )
    ) guildCreateData.guild.cache();

    // Create guild widget object
    if (

        // If the initial cache is `true`, all guild widgets should be cached
        client._cacheStrategies.guildWidgets?.initialCache === true ||
        (

            // Otherwise, if its an array of IDs
            client._cacheStrategies.guildWidgets?.initialCache instanceof Array &&

            // And the guild ID is in the array
            client._cacheStrategies.guildWidgets.initialCache.includes(guildCreateData.guild.id)
        )
    ) guildCreateData.guild.widget.cache();

    // Create invite objects
    if (client._cacheStrategies.invites?.initialCache) {

        // Get invites
        const invites: Invite[] | void = await client.getGuildInvites(guildCreateData.guild.id).catch(() => { });

        // Cache all invites from this guild
        if (

            // If the initial cache is `true`, all invites should be cached
            client._cacheStrategies.invites.initialCache === true ||

            // Or the guild ID is in the array
            client._cacheStrategies.invites.initialCache.guilds?.includes(guildCreateData.guild.id)
        ) {

            // Loop through invites
            if (invites) invites.forEach((i: Invite) => i.cache());
        }

        // Cache invites from specific channels
        else if (

            // If the initial cache has channel IDs
            client._cacheStrategies.invites.initialCache.channels
        ) {

            // Loop through invites
            if (invites) invites.filter((i: Invite) => (client._cacheStrategies.invites?.initialCache as InitialCacheTypeChannels).channels?.includes(i.channelID)).forEach((i: Invite) => i.cache());
        }

        // Cache specific invites
        if (

            // If the initial cache isnt a boolean
            typeof client._cacheStrategies.invites.initialCache !== "boolean" &&

            // If the initial cache has invite IDs
            client._cacheStrategies.invites.initialCache.ids
        ) {

            // Loop through invites
            if (invites) invites.filter((i: Invite) => (client._cacheStrategies.invites?.initialCache as InitialCacheTypeChannels).ids?.includes(i.code)).forEach((i: Invite) => i.cache());
        }
    }

    // Create member objects
    if (client._cacheStrategies.members?.initialCache) {

        // Cache all members from this guild
        if (

            // If the initial cache is `true`, all members should be cached
            client._cacheStrategies.members.initialCache === true ||

            // Or the guild ID is in the array
            client._cacheStrategies.members.initialCache.guilds?.includes(guildCreateData.guild.id)
        ) {

            // Loop through members
            guildCreateData.members.forEach((m: MemberData) => Member.fromData(client, m).cache());
        }

        // Cache specific members
        else if (

            // If the initial cache has member IDs
            client._cacheStrategies.members.initialCache.ids
        ) {

            // Loop through members
            guildCreateData.members.filter((m: MemberData) => (client._cacheStrategies.members?.initialCache as InitialCacheTypeGuilds).ids?.includes(`${guildCreateData.guild.id}_${m.user.id}`)).forEach((m: MemberData) => Member.fromData(client, m).cache());
        }
    }

    // Create message objects
    if (client._cacheStrategies.messages?.initialCache) {

        // Define message data
        let messageData: Message[] = [];

        // Define fetch limit
        const fetchLimit: number | undefined = typeof client._cacheStrategies.messages.initialCache === "boolean" ?
            undefined :
            client._cacheStrategies.messages.initialCache.count;

        // Cache all messages from this guild
        if (

            // If the initial cache is `true`, all messages should be cached
            client._cacheStrategies.messages.initialCache === true ||

            // Or the guild ID is in the array
            client._cacheStrategies.messages.initialCache.guilds?.includes(guildCreateData.guild.id)
        ) {

            // Get messages
            const messages: Message[][] = (await Promise.all(guildCreateData.channels.map((c: AnyChannelData) => client.getChannelMessages(c.id, {
                limit: fetchLimit
            }).catch(() => { })))).filter((m: Message[] | void) => m) as Message[][];

            // Set message data
            messageData = messages.flat();
        }

        // Cache messages from specific channels
        else if (

            // If the initial cache has channel IDs
            client._cacheStrategies.messages.initialCache.channels
        ) {

            // Get channels
            const channels: string[] = guildCreateData.channels.map((c: AnyChannelData) => c.id).filter((id: string) => (client._cacheStrategies.messages?.initialCache as InitialCacheTypeMessages).channels?.includes(id));

            // Get messages
            const messages: Message[][] = (await Promise.all(channels.map((c: string) => client.getChannelMessages(c, {
                limit: fetchLimit
            }).catch(() => { })))).filter((m: Message[] | void) => m) as Message[][];

            // Set message data
            messageData = messages.flat();
        }

        // Cache specific messages
        if (

            // If the initial cache isnt a boolean
            typeof client._cacheStrategies.messages.initialCache !== "boolean" &&

            // If the initial cache has message IDs
            client._cacheStrategies.messages.initialCache.ids
        ) {

            // Get fetched message IDs
            const fetchedMessages: string[] = messageData.map((m: Message) => m.id);

            // Get channel IDs
            const channels: string[] = guildCreateData.channels.map((c: AnyChannelData) => c.id);

            // Get message IDs that are in the guild and not already fetched
            const messageIDs: string[] = client._cacheStrategies.messages.initialCache.ids.filter((id: string) => channels.includes(id.split("_")[0]) && !fetchedMessages.includes(id.split("_")[1]));

            // Get messages
            const messages: Message[] = (await Promise.all(messageIDs.map((id: string) => client.getChannelMessage(id.split("_")[0], id.split("_")[1]).catch(() => { })))).filter((m: Message | void) => m) as Message[];

            // Add to message data
            messageData.push(...messages);
        }

        // Loop through message data
        messageData.forEach((m: Message) => m.cache());
    }

    // Create presence objects
    guildCreateData.presences.forEach((p: PresenceData) => {

        // Check IDs
        if (

            // If the initial cache is `true`, all presences should be cached
            client._cacheStrategies.presences?.initialCache === true ||
            (

                // Otherwise, if its an array of IDs
                client._cacheStrategies.presences?.initialCache instanceof Array &&

                // And the user ID is in the array
                client._cacheStrategies.presences.initialCache.includes(p.user.id)
            )
        ) Presence.fromData(client, p).cache();
    });

    // Create role objects
    if (client._cacheStrategies.roles?.initialCache) {

        // Cache all roles from this guild
        if (

            // If the initial cache is `true`, all roles should be cached
            client._cacheStrategies.roles.initialCache === true ||

            // Or the guild ID is in the array
            client._cacheStrategies.roles.initialCache.guilds?.includes(guildCreateData.guild.id)
        ) {

            // Loop through roles
            guildCreateData.guild.roleData.forEach((r: RoleData) => Role.fromData(client, r).cache());
        }

        // Cache specific roles
        else if (

            // If the initial cache has role IDs
            client._cacheStrategies.roles.initialCache.ids
        ) {

            // Loop through roles
            guildCreateData.guild.roleData.filter((r: RoleData) => (client._cacheStrategies.roles?.initialCache as InitialCacheTypeGuilds).ids?.includes(r.id)).forEach((r: RoleData) => Role.fromData(client, r).cache());
        }
    }

    // Create sticker objects
    if (client._cacheStrategies.stickers?.initialCache) {

        // Cache all stickers from this guild
        if (

            // If the initial cache is `true`, all stickers should be cached
            client._cacheStrategies.stickers.initialCache === true ||

            // Or the guild ID is in the array
            client._cacheStrategies.stickers.initialCache.guilds?.includes(guildCreateData.guild.id)
        ) {

            // Loop through stickers
            guildCreateData.guild.stickerData?.forEach((s: StickerData) => Sticker.fromData(client, s).cache());
        }

        // Cache specific stickers
        else if (

            // If the initial cache has sticker IDs
            client._cacheStrategies.stickers.initialCache.ids
        ) {

            // Loop through stickers
            guildCreateData.guild.stickerData?.filter((e: StickerData) => (client._cacheStrategies.stickers?.initialCache as InitialCacheTypeGuilds).ids?.includes(e.id)).forEach((s: StickerData) => Sticker.fromData(client, s).cache());
        }
    }

    // Create template objects
    if (client._cacheStrategies.templates?.initialCache) {

        // Get templates
        const templates: Template[] | void = await client.getGuildTemplates(guildCreateData.guild.id).catch(() => { });

        // Cache all templates from this guild
        if (

            // If the initial cache is `true`, all templates should be cached
            client._cacheStrategies.templates.initialCache === true ||

            // Or the guild ID is in the array
            client._cacheStrategies.templates.initialCache.guilds?.includes(guildCreateData.guild.id)
        ) {

            // Loop through templates
            if (templates) templates.forEach((t: Template) => t.cache());
        }

        // Cache specific templates
        else if (

            // If the initial cache has template IDs
            client._cacheStrategies.templates.initialCache.ids
        ) {

            // Loop through templates
            if (templates) templates.filter((t: Template) => (client._cacheStrategies.templates?.initialCache as InitialCacheTypeGuilds).ids?.includes(t.code)).forEach((t: Template) => t.cache());
        }
    }

    // Create thread channel objects
    if (client._cacheStrategies.threads?.initialCache) {

        // Cache all threads from this guild
        if (

            // If the initial cache is `true`, all threads should be cached
            client._cacheStrategies.threads.initialCache === true ||

            // Or the guild ID is in the array
            client._cacheStrategies.threads.initialCache.guilds?.includes(guildCreateData.guild.id)
        ) {

            // Loop through threads
            guildCreateData.threads.forEach((t: ThreadChannelData) => Channel.fromData(client, t).cache());
        }

        // Cache threads from specific channels
        else if (

            // If the initial cache has channel IDs
            client._cacheStrategies.threads.initialCache.channels
        ) {

            // Loop through threads
            guildCreateData.threads.filter((t: ThreadChannelData) => (client._cacheStrategies.threads?.initialCache as InitialCacheTypeChannels).channels?.includes(t.parentID)).forEach((t: ThreadChannelData) => Channel.fromData(client, t).cache());
        }

        // Cache specific threads
        if (

            // If the initial cache isnt a boolean
            typeof client._cacheStrategies.threads.initialCache !== "boolean" &&

            // If the initial cache has thread channel IDs
            client._cacheStrategies.threads.initialCache.ids
        ) {

            // Loop through threads
            guildCreateData.threads.filter((t: ThreadChannelData) => (client._cacheStrategies.threads?.initialCache as InitialCacheTypeChannels).ids?.includes(t.id)).forEach((t: ThreadChannelData) => Channel.fromData(client, t).cache());
        }
    }

    // Create vanity invite object
    if (

        // If the initial cache is `true`, all vanity invites should be cached
        client._cacheStrategies.vanityInvites?.initialCache === true ||
        (

            // Otherwise, if its an array of IDs
            client._cacheStrategies.vanityInvites?.initialCache instanceof Array &&

            // And the guild ID is in the array
            client._cacheStrategies.vanityInvites.initialCache.includes(guildCreateData.guild.id)
        )
    ) {

        // Get vanity invite
        const vanityInvite: VanityInvite | void = await client.getGuildVanityURL(guildCreateData.guild.id).catch(() => { });

        // Cache object
        if (vanityInvite) vanityInvite.cache();
    }

    // Create webhook objects
    if (client._cacheStrategies.webhooks?.initialCache) {

        // Get webhooks
        const webhooks: Webhook[] | void = await client.getGuildWebhooks(guildCreateData.guild.id).catch(() => { });

        // Cache all webhooks from this guild
        if (

            // If the initial cache is `true`, all webhooks should be cached
            client._cacheStrategies.webhooks.initialCache === true ||

            // Or the guild ID is in the array
            client._cacheStrategies.webhooks.initialCache.guilds?.includes(guildCreateData.guild.id)
        ) {

            // Loop through webhooks
            if (webhooks) webhooks.forEach((w: Webhook) => w.cache());
        }

        // Cache webhooks from specific channels
        else if (

            // If the initial cache has channel IDs
            client._cacheStrategies.webhooks.initialCache.channels
        ) {

            // Loop through webhooks
            if (webhooks) webhooks.filter((w: Webhook) => (client._cacheStrategies.webhooks?.initialCache as InitialCacheTypeChannels).channels?.includes(w.channelID)).forEach((w: Webhook) => w.cache());
        }

        // Cache specific webhooks
        if (

            // If the initial cache isnt a boolean
            typeof client._cacheStrategies.webhooks.initialCache !== "boolean" &&

            // If the initial cache has webhook IDs
            client._cacheStrategies.webhooks.initialCache.ids
        ) {

            // Loop through webhooks
            if (webhooks) webhooks.filter((w: Webhook) => (client._cacheStrategies.webhooks?.initialCache as InitialCacheTypeChannels).ids?.includes(w.id)).forEach((w: Webhook) => w.cache());
        }
    }

    // Create welcome screen object
    if (

        // If there isnt a welcome screen, dont cache anything
        guildCreateData.guild.welcomeScreen &&

        // Check IDs
        (

            // If the initial cache is `true`, all welcome screens should be cached
            client._cacheStrategies.welcomeScreens?.initialCache === true ||
            (

                // Otherwise, if its an array of IDs
                client._cacheStrategies.welcomeScreens?.initialCache instanceof Array &&

                // And the guild ID is in the array
                client._cacheStrategies.welcomeScreens.initialCache.includes(guildCreateData.guild.id)
            )
        )
    ) guildCreateData.guild.welcomeScreen.cache();

    // Create user objects
    guildCreateData.members.forEach((m: MemberData) => {

        // Check IDs
        if (

            // If the initial cache is `true`, all users should be cached
            client._cacheStrategies.users?.initialCache === true ||
            (

                // Otherwise, if its an array of IDs
                client._cacheStrategies.users?.initialCache instanceof Array &&

                // And the user ID is in the array
                client._cacheStrategies.users.initialCache.includes(m.user.id)
            )
        ) User.fromData(client, m.user).cache();
    });
}