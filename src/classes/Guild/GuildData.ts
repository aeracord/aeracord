import { EmojiData, GuildWidgetData, RoleData, StickerData, WelcomeScreenData } from "../../internal";

/**
 * Guild Data
 *
 * Represents a `Guild`
 */
export interface GuildData {

    /**
     * ID
     *
     * The guild's ID
     */
    id: string;

    /**
     * Name
     *
     * The guild's name
     */
    name: string;

    /**
     * Icon Hash
     *
     * The guild's icon hash
     */
    iconHash: string | null;

    /**
     * Splash Image Hash
     *
     * The guild's splash image hash
     */
    splashImageHash: string | null;

    /**
     * Discovery Splash Image Hash
     *
     * The guild's discovery splash image hash
     */
    discoverySplashImageHash: string | null;

    /**
     * Owner ID
     *
     * The ID of the guild's owner
     */
    ownerID: string;

    /**
     * Region
     *
     * The guild's region
     */
    region: string;

    /**
     * AFK Channel ID
     *
     * The ID of the guild's AFK channel
     */
    afkChannelID: string | null;

    /**
     * AFK Timeout
     *
     * The guild's AFK timeout
     */
    afkTimeout: number;

    /**
     * Widget
     *
     * The guild's widget
     */
    widget: GuildWidgetData;

    /**
     * Verification Level
     *
     * The guild's verification level
     */
    verificationLevel: VerificationLevel;

    /**
     * Default Message Notifications
     *
     * The guild's default message notifications setting
     */
    defaultMessageNotifications: DefaultMessageNotification;

    /**
     * Explicit Content Filter
     *
     * The guild's explicit content filter setting
     */
    explicitContentFilter: ExplicitContentFilter;

    /**
     * Roles
     *
     * The roles in this guild
     */
    roleData: RoleData[];

    /**
     * Emojis
     *
     * The emojis in this guild
     */
    emojiData: EmojiData[];

    /**
     * Features
     *
     * The guild's features
     */
    features: Feature[];

    /**
     * MFA Level
     *
     * The guild's MFA level
     */
    mfaLevel: MFALevel;

    /**
     * Application ID
     *
     * The ID of the bot that created this guild
     */
    applicationID: string | null;

    /**
     * System Channel ID
     *
     * The ID of the guild's system channel
     */
    systemChannelID: string | null;

    /**
     * System Channel Flags
     *
     * The guild's system channel flags
     */
    systemChannelFlags: number;

    /**
     * Rules Channel ID
     *
     * The ID of the guild's rules channel
     */
    rulesChannelID: string | null;

    /**
     * Max Presences
     *
     * The maximum number of online members this guild can have
     */
    maxPresences?: number | null;

    /**
     * Max Members
     *
     * The maximum number of members this guild can have
     */
    maxMembers?: number | null;

    /**
     * Vanity URL Code
     *
     * The guild's vanity URL code
     */
    vanityURLCode: string | null;

    /**
     * Description
     *
     * The guild's description
     */
    description: string | null;

    /**
     * Banner Hash
     *
     * The guild's banner hash
     */
    bannerHash: string | null;

    /**
     * Premium Tier
     *
     * The guild's server boost level
     */
    premiumTier: PremiumTier;

    /**
     * Premium Subscription Count
     *
     * The number of people boosting this guild
     */
    premiumSubscriptionCount: number;

    /**
     * Preferred Locale
     *
     * The guild's preferred locale
     */
    preferredLocale: string;

    /**
     * Public Updates Channel ID
     *
     * The ID of the guild's public updates channel
     */
    publicUpdatesChannelID: string | null;

    /**
     * Max Video Channel Users
     *
     * The maximum number of members that can be in video channels in this guild
     */
    maxVideoChannelUsers?: number;

    /**
     * Approximate Member Count
     *
     * The approximate number of members in this guild
     */
    approximateMemberCount?: number;

    /**
     * Approximate Presence Count
     *
     * The approximate number of online members in this guild
     */
    approximatePresenceCount?: number;

    /**
     * Welcome Screen
     *
     * The guild's welcome screen
     */
    welcomeScreen: WelcomeScreenData | null;

    /**
     * NSFW Level
     *
     * The guild's NSFW level
     */
    nsfwLevel: NSFWLevel;

    /**
     * Stickers
     *
     * The stickers in this guild
     */
    stickerData?: StickerData[];

    /**
     * Fetched At
     *
     * The timestamp for when this guild was fetched
     */
    fetchedAt: number;
}

/**
 * Verification Level
 * https://discord.com/developers/docs/resources/guild#guild-object-verification-level
 */
export type VerificationLevel = typeof VerificationLevels.NONE | typeof VerificationLevels.LOW | typeof VerificationLevels.MEDIUM | typeof VerificationLevels.HIGH | typeof VerificationLevels.VERY_HIGH;
export const VerificationLevels: {

    /**
     * None
     *
     * No verification level
     */
    NONE: 0,

    /**
     * Low
     *
     * Low verification level
     */
    LOW: 1,

    /**
     * Medium
     *
     * Medium verification level
     */
    MEDIUM: 2,

    /**
     * High
     *
     * High verification level
     */
    HIGH: 3,

    /**
     * Very High
     *
     * Very high verification level
     */
    VERY_HIGH: 4
} = {
    NONE: 0,
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3,
    VERY_HIGH: 4
};

/**
 * Default Message Notifications
 * https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level
 */
export type DefaultMessageNotification = typeof DefaultMessageNotifications.ALL_MESSAGES | typeof DefaultMessageNotifications.ONLY_MENTIONS;
export const DefaultMessageNotifications: {

    /**
     * All Messages
     *
     * Send notifications for all messages
     */
    ALL_MESSAGES: 0,

    /**
     * Only Mentions
     *
     * Only send notifications for mentions
     */
    ONLY_MENTIONS: 1
} = {
    ALL_MESSAGES: 0,
    ONLY_MENTIONS: 1
};

/**
 * Explicit Content Filter
 * https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level
 */
export type ExplicitContentFilter = typeof ExplicitContentFilters.DISABLED | typeof ExplicitContentFilters.MEMBERS_WITHOUT_ROLES | typeof ExplicitContentFilters.ALL_MEMBERS;
export const ExplicitContentFilters: {

    /**
     * Disabled
     *
     * Don't scan any content
     */
    DISABLED: 0,

    /**
     * Members Without Roles
     *
     * Only scan content from members without any roles
     */
    MEMBERS_WITHOUT_ROLES: 1,

    /**
     * All Members
     *
     * Scan content from all members
     */
    ALL_MEMBERS: 2
} = {
    DISABLED: 0,
    MEMBERS_WITHOUT_ROLES: 1,
    ALL_MEMBERS: 2
};

/**
 * Feature
 * https://discord.com/developers/docs/resources/guild#guild-object-guild-features
 */
export type Feature = "INVITE_SPLASH" | "VIP_REGIONS" | "VANITY_URL" | "VERIFIED" | "PARTNERED" | "COMMUNITY" | "COMMERCE" | "NEWS" | "DISCOVERABLE" | "FEATURABLE" | "ANIMATED_ICON" | "BANNER" | "WELCOME_SCREEN_ENABLED" | "MEMBER_VERIFICATION_GATE_ENABLED" | "PREVIEW_ENABLED" | "TICKETED_EVENTS_ENABLED" | "MONETIZATION_ENABLED" | "MORE_STICKERS";

/**
 * MFA Level
 * https://discord.com/developers/docs/resources/guild#guild-object-mfa-level
 */
export type MFALevel = typeof MFALevels.NONE | typeof MFALevels.ELEVATED;
export const MFALevels: {

    /**
     * None
     *
     * No MFA requirement
     */
    NONE: 0,

    /**
     * Elevated
     *
     * MFA requirement is enabled
     */
    ELEVATED: 1
} = {
    NONE: 0,
    ELEVATED: 1
};

/**
 * Premium Tier
 * https://discord.com/developers/docs/resources/guild#guild-object-premium-tier
 */
export type PremiumTier = typeof PremiumTiers.NONE | typeof PremiumTiers.TIER_1 | typeof PremiumTiers.TIER_2 | typeof PremiumTiers.TIER_3;
export const PremiumTiers: {

    /**
     * None
     *
     * No boost level
     */
    NONE: 0,

    /**
     * Tier 1
     *
     * Boost level 1
     */
    TIER_1: 1,

    /**
     * Tier 2
     *
     * Boost level 2
     */
    TIER_2: 2,

    /**
     * Tier 3
     *
     * Boost level 3
     */
    TIER_3: 3
} = {
    NONE: 0,
    TIER_1: 1,
    TIER_2: 2,
    TIER_3: 3
};

/**
 * NSFW Level
 * https://discord.com/developers/docs/resources/guild#guild-object-guild-nsfw-level
 */
export type NSFWLevel = typeof NSFWLevels.DEFAULT | typeof NSFWLevels.EXPLICIT | typeof NSFWLevels.SAFE | typeof NSFWLevels.AGE_RESTRICTED;
export const NSFWLevels: {

    /**
     * Default
     *
     * The guild is not marked as NSFW
     */
    DEFAULT: 0,

    /**
     * Explicit
     *
     * Explicit content
     */
    EXPLICIT: 1,

    /**
     * Safe
     *
     * Safe content
     */
    SAFE: 2,

    /**
     * Age Restricted
     *
     * Age restricted content
     */
    AGE_RESTRICTED: 3
} = {
    DEFAULT: 0,
    EXPLICIT: 1,
    SAFE: 2,
    AGE_RESTRICTED: 3
};

/**
 * Voice Region
 *
 * A voice region
 */
export interface VoiceRegion {

    /**
     * ID
     *
     * The voice region's ID
     */
    id: string;

    /**
     * Name
     *
     * The voice region's name
     */
    name: string;

    /**
     * ID
     *
     * Whether or not the voice region is VIP-only
     */
    vip: boolean;

    /**
     * Optimal
     *
     * Whether or not the voice region is closest to the client
     */
    optimal: boolean;

    /**
     * Deprecated
     *
     * Whether or not the voice region is deprecated
     */
    deprecated: boolean;

    /**
     * Custom
     *
     * Whether or not the voice region is custom
     */
    custom: boolean;
}