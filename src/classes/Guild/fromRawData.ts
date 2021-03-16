import { Client, Emoji, Guild, GuildData, RawEmojiData, RawGuildData, RawRoleData, Role, WelcomeScreen } from "../../internal";

export default function fromRawData(client: Client, rawData: RawGuildData): Guild {

    // Get guild from cache
    let guild: Guild | undefined = client.guilds.get(rawData.id);

    // Parse guild data
    const guildData: GuildData = {
        id: rawData.id,
        name: rawData.name,
        icon: rawData.icon || undefined,
        splashImage: rawData.splash || undefined,
        discoverySplashImage: rawData.discovery_splash || undefined,
        ownerID: rawData.owner_id,
        region: rawData.region,
        afkChannelID: rawData.afk_channel_id || undefined,
        afkTimeout: rawData.afk_timeout,
        widgetEnabled: rawData.widget_enabled,
        widgetChannelID: rawData.widget_channel_id || undefined,
        verificationLevel: rawData.verification_level,
        defaultMessageNotifications: rawData.default_message_notifications,
        explicitContentFilter: rawData.explicit_content_filter,
        roles: rawData.roles.map((r: RawRoleData) => Role._fromRawData(client, r, rawData.id)),
        emojis: rawData.emojis.map((e: RawEmojiData) => Emoji._fromRawData(client, e, rawData.id)),
        features: rawData.features,
        mfaLevel: rawData.mfa_level,
        applicationID: rawData.application_id || undefined,
        systemChannelID: rawData.system_channel_id || undefined,
        systemChannelFlags: rawData.system_channel_flags,
        rulesChannelID: rawData.rules_channel_id || undefined,
        maxPresences: rawData.max_presences || undefined,
        maxMembers: rawData.max_members,
        vanityURLCode: rawData.vanity_url_code || undefined,
        description: rawData.description || undefined,
        banner: rawData.banner || undefined,
        premiumTier: rawData.premium_tier,
        premiumSubscriptionCount: rawData.premium_subscription_count || 0,
        preferredLocale: rawData.preferred_locale,
        publicUpdatesChannelID: rawData.public_updates_channel_id || undefined,
        maxVideoChannelUsers: rawData.max_video_channel_users,
        approximateMemberCount: rawData.approximate_member_count,
        approximatePresenceCount: rawData.approximate_presence_count,
        welcomeScreen: rawData.welcome_screen && WelcomeScreen._fromRawData(client, rawData.welcome_screen, rawData.id)
    };

    // Update guild object
    if (guild) Guild._updateObject(guild, guildData);

    // Create guild
    else guild = new Guild(client, guildData);

    // Return
    return guild;
}