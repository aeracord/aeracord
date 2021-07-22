import { Guild, GuildData, GuildWidget, WelcomeScreen } from "../../internal";

export default function updateObject(guild: Guild, guildData: GuildData) {

    // If the `GuildData` was fetched before the `Guild` object was last updated, dont update anything
    if (guildData.fetchedAt < guild._lastUpdatedAt) return;

    // Unmark as deleted
    if (guild.deleted) guild._unmarkAsDeleted();

    // Set data
    guild.name = guildData.name;
    guild.iconHash = guildData.iconHash;
    guild.splashImageHash = guildData.splashImageHash;
    guild.discoverySplashImageHash = guildData.discoverySplashImageHash;
    guild.ownerID = guildData.ownerID;
    guild.region = guildData.region;
    guild.afkChannelID = guildData.afkChannelID;
    guild.afkTimeout = guildData.afkTimeout;
    guild.widget = GuildWidget.fromData(guild.client, guildData.widget);
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
    guild.bannerHash = guildData.bannerHash;
    guild.premiumTier = guildData.premiumTier;
    guild.premiumSubscriptionCount = guildData.premiumSubscriptionCount;
    guild.preferredLocale = guildData.preferredLocale;
    guild.publicUpdatesChannelID = guildData.publicUpdatesChannelID;
    guild.maxVideoChannelUsers = guildData.maxVideoChannelUsers;
    guild.approximateMemberCount = guildData.approximateMemberCount;
    guild.approximatePresenceCount = guildData.approximatePresenceCount;
    guild.welcomeScreen = guildData.welcomeScreen && WelcomeScreen.fromData(guild.client, guildData.welcomeScreen);
    guild.nsfwLevel = guildData.nsfwLevel;
    guild._lastUpdatedAt = Date.now();

    // Set guild owner
    guild.client._guildOwners.set(guildData.id, guildData.ownerID);
}