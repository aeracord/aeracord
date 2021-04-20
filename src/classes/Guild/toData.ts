import { Guild, GuildData } from "../../internal";

export default function toData(guild: Guild): GuildData {

    // Parse guild data
    return {
        id: guild.id,
        name: guild.name,
        icon: guild.icon,
        splashImage: guild.splashImage,
        discoverySplashImage: guild.discoverySplashImage,
        ownerID: guild.ownerID,
        region: guild.region,
        afkChannelID: guild.afkChannelID,
        afkTimeout: guild.afkTimeout,
        widget: guild.widget,
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
        banner: guild.banner,
        premiumTier: guild.premiumTier,
        premiumSubscriptionCount: guild.premiumSubscriptionCount,
        preferredLocale: guild.preferredLocale,
        publicUpdatesChannelID: guild.publicUpdatesChannelID,
        maxVideoChannelUsers: guild.maxVideoChannelUsers,
        approximateMemberCount: guild.approximateMemberCount,
        approximatePresenceCount: guild.approximatePresenceCount,
        welcomeScreen: guild.welcomeScreen,
        fetchedAt: guild._lastUpdatedAt
    };
}