import { Guild, GuildData, GuildWidget, WelcomeScreen } from "../../internal";

export default function toData(guild: Guild): GuildData {

    // Parse guild data
    return {
        id: guild.id,
        name: guild.name,
        iconHash: guild.iconHash,
        splashImageHash: guild.splashImageHash,
        discoverySplashImageHash: guild.discoverySplashImageHash,
        ownerID: guild.ownerID,
        region: guild.region,
        afkChannelID: guild.afkChannelID,
        afkTimeout: guild.afkTimeout,
        widget: GuildWidget.toData(guild.widget),
        verificationLevel: guild.verificationLevel,
        defaultMessageNotifications: guild.defaultMessageNotifications,
        explicitContentFilter: guild.explicitContentFilter,
        roleData: guild.roleData,
        emojiData: guild.emojiData,
        features: guild.features,
        mfaLevel: guild.mfaLevel,
        applicationID: guild.applicationID,
        systemChannelID: guild.systemChannelID,
        systemChannelFlags: guild.systemChannelFlags,
        rulesChannelID: guild.rulesChannelID,
        maxPresences: guild.maxPresences,
        maxMembers: guild.maxMembers,
        vanityURLCode: guild.vanityURLCode,
        description: guild.description,
        bannerHash: guild.bannerHash,
        premiumTier: guild.premiumTier,
        premiumSubscriptionCount: guild.premiumSubscriptionCount,
        preferredLocale: guild.preferredLocale,
        publicUpdatesChannelID: guild.publicUpdatesChannelID,
        maxVideoChannelUsers: guild.maxVideoChannelUsers,
        approximateMemberCount: guild.approximateMemberCount,
        approximatePresenceCount: guild.approximatePresenceCount,
        welcomeScreen: guild.welcomeScreen && WelcomeScreen.toData(guild.welcomeScreen),
        nsfwLevel: guild.nsfwLevel,
        fetchedAt: guild._lastUpdatedAt
    };
}