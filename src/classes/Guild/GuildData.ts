import { EmojiData, GuildWidgetData, RoleData, WelcomeScreenData } from "../../internal";

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
     * Icon
     *
     * The guild's icon hash
     */
    icon: string | null;

    /**
     * Splash Image
     *
     * The guild's splash image hash
     */
    splashImage: string | null;

    /**
     * Discovery Splash Image
     *
     * The guild's discovery splash image hash
     */
    discoverySplashImage: string | null;

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
    defaultMessageNotifications: DefaultMessageNotifications;

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
     * Banner
     *
     * The guild's banner hash
     */
    banner: string | null;

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
export type VerificationLevel = typeof VERIFICATION_LEVEL_NONE | typeof VERIFICATION_LEVEL_LOW | typeof VERIFICATION_LEVEL_MEDIUM | typeof VERIFICATION_LEVEL_HIGH | typeof VERIFICATION_LEVEL_VERY_HIGH;
export const VERIFICATION_LEVEL_NONE = 0;
export const VERIFICATION_LEVEL_LOW = 1;
export const VERIFICATION_LEVEL_MEDIUM = 2;
export const VERIFICATION_LEVEL_HIGH = 3;
export const VERIFICATION_LEVEL_VERY_HIGH = 4;

/**
 * Default Message Notifications
 * https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level
 */
export type DefaultMessageNotifications = typeof DEFAULT_MESSAGE_NOTIFICATIONS_ALL_MESSAGES | typeof DEFAULT_MESSAGE_NOTIFICATIONS_ONLY_MENTIONS;
export const DEFAULT_MESSAGE_NOTIFICATIONS_ALL_MESSAGES = 0;
export const DEFAULT_MESSAGE_NOTIFICATIONS_ONLY_MENTIONS = 1;

/**
 * Explicit Content Filter
 * https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level
 */
export type ExplicitContentFilter = typeof EXPLICIT_CONTENT_FILTER_DISABLED | typeof EXPLICIT_CONTENT_FILTER_MEMBERS_WITHOUT_ROLES | typeof EXPLICIT_CONTENT_FILTER_ALL_MEMBERS;
export const EXPLICIT_CONTENT_FILTER_DISABLED = 0;
export const EXPLICIT_CONTENT_FILTER_MEMBERS_WITHOUT_ROLES = 1;
export const EXPLICIT_CONTENT_FILTER_ALL_MEMBERS = 2;

/**
 * Feature
 * https://discord.com/developers/docs/resources/guild#guild-object-guild-features
 */
export type Feature = "INVITE_SPLASH" | "VIP_REGIONS" | "VANITY_URL" | "VERIFIED" | "PARTNERED" | "COMMUNITY" | "COMMERCE" | "NEWS" | "DISCOVERABLE" | "FEATURABLE" | "ANIMATED_ICON" | "BANNER" | "WELCOME_SCREEN_ENABLED" | "MEMBER_VERIFICATION_GATE_ENABLED" | "PREVIEW_ENABLED";

/**
 * MFA Level
 * https://discord.com/developers/docs/resources/guild#guild-object-mfa-level
 */
export type MFALevel = typeof MFA_LEVEL_NONE | typeof MFA_LEVEL_ELEVATED;
export const MFA_LEVEL_NONE = 0;
export const MFA_LEVEL_ELEVATED = 1;

/**
 * Premium Tier
 * https://discord.com/developers/docs/resources/guild#guild-object-premium-tier
 */
export type PremiumTier = typeof PREMIUM_TIER_NONE | typeof PREMIUM_TIER_TIER_1 | typeof PREMIUM_TIER_TIER_2 | typeof PREMIUM_TIER_TIER_3;
export const PREMIUM_TIER_NONE = 0;
export const PREMIUM_TIER_TIER_1 = 1;
export const PREMIUM_TIER_TIER_2 = 2;
export const PREMIUM_TIER_TIER_3 = 3;

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