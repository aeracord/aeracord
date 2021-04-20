import { Client, Emoji, GuildData, GuildWidget, RawEmojiData, RawGuildData, RawRoleData, Role, WelcomeScreen } from "../../internal";

export default function dataFromRawData(client: Client, rawData: RawGuildData): GuildData {

    // Parse guild data
    return {
        id: rawData.id,
        name: rawData.name,
        icon: rawData.icon,
        splashImage: rawData.splash,
        discoverySplashImage: rawData.discovery_splash,
        ownerID: rawData.owner_id,
        region: rawData.region,
        afkChannelID: rawData.afk_channel_id,
        afkTimeout: rawData.afk_timeout,
        widget: GuildWidget._dataFromRawData({
            channel_id: rawData.widget_channel_id || null,
            enabled: Boolean(rawData.widget_enabled)
        }, rawData.id),
        verificationLevel: rawData.verification_level,
        defaultMessageNotifications: rawData.default_message_notifications,
        explicitContentFilter: rawData.explicit_content_filter,
        roleData: rawData.roles.map((r: RawRoleData) => Role._dataFromRawData(client, r, rawData.id)),
        emojiData: rawData.emojis.map((e: RawEmojiData) => Emoji._dataFromRawData(e, rawData.id)),
        features: rawData.features,
        mfaLevel: rawData.mfa_level,
        applicationID: rawData.application_id,
        systemChannelID: rawData.system_channel_id,
        systemChannelFlags: rawData.system_channel_flags,
        rulesChannelID: rawData.rules_channel_id,
        maxPresences: rawData.max_presences,
        maxMembers: rawData.max_members,
        vanityURLCode: rawData.vanity_url_code,
        description: rawData.description,
        banner: rawData.banner,
        premiumTier: rawData.premium_tier,
        premiumSubscriptionCount: rawData.premium_subscription_count || 0,
        preferredLocale: rawData.preferred_locale,
        publicUpdatesChannelID: rawData.public_updates_channel_id,
        maxVideoChannelUsers: rawData.max_video_channel_users,
        approximateMemberCount: rawData.approximate_member_count,
        approximatePresenceCount: rawData.approximate_presence_count,
        welcomeScreen: rawData.welcome_screen ? WelcomeScreen._dataFromRawData(rawData.welcome_screen, rawData.id) : null,
        fetchedAt: Date.now()
    };
}