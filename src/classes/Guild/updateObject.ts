import { Guild, GuildData } from "../../internal";

export default function updateObject(guild: Guild, guildData: GuildData) {

    // Set data
    guild.name = guildData.name;
    guild.icon = guildData.icon;
    guild.splashImage = guildData.splashImage;
    guild.discoverySplashImage = guildData.discoverySplashImage;
    guild.ownerID = guildData.ownerID;
    guild.region = guildData.region;
    guild.afkChannelID = guildData.afkChannelID;
    guild.afkTimeout = guildData.afkTimeout;
    guild.widgetEnabled = guildData.widgetEnabled;
    guild.widgetChannelID = guildData.widgetChannelID;
    guild.verificationLevel = guildData.verificationLevel;
    guild.defaultMessageNotifications = guildData.defaultMessageNotifications;
    guild.explicitContentFilter = guildData.explicitContentFilter;
    guild.roleData = guildData.roleData;
    guild.emojiData = guildData.emojiData;
    guild.features = guildData.features;
    guild.mfaLevel = guildData.mfaLevel;
    guild.applicationID = guildData.applicationID;
    guild.systemChannelID = guildData.systemChannelID;
    guild.systemChannelFlags = guildData.systemChannelFlags;
    guild.rulesChannelID = guildData.rulesChannelID;
    guild.maxPresences = guildData.maxPresences;
    guild.maxMembers = guildData.maxMembers;
    guild.vanityURLCode = guildData.vanityURLCode;
    guild.description = guildData.description;
    guild.banner = guildData.banner;
    guild.premiumTier = guildData.premiumTier;
    guild.premiumSubscriptionCount = guildData.premiumSubscriptionCount;
    guild.preferredLocale = guildData.preferredLocale;
    guild.publicUpdatesChannelID = guildData.publicUpdatesChannelID;
    guild.maxVideoChannelUsers = guildData.maxVideoChannelUsers;
    guild.approximateMemberCount = guildData.approximateMemberCount;
    guild.approximatePresenceCount = guildData.approximatePresenceCount;
    guild.welcomeScreen = guildData.welcomeScreen;
}