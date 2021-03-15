import { AnyChannel, Ban, Base, CacheManagerInterface, CategoryChannel, Client, Emoji, GuildChannel, GuildWidget, Invite, Member, NewsChannel, RawGuildData, Role, StoreChannel, Template, TextChannel, VanityInvite, VoiceChannel, Webhook, WelcomeScreen } from "../../internal";
import fromRawData from "./fromRawData";
import resolveID from "./resolveID";

export interface GuildData {
    id: string;
    name: string;
    icon?: string;
    splashImage?: string;
    discoverySplashImage?: string;
    ownerID: string;
    region: string;
    afkChannelID?: string;
    afkTimeout: number;
    widgetEnabled?: boolean;
    widgetChannelID?: string;
    verificationLevel: VerificationLevel;
    defaultMessageNotifications: DefaultMessageNotifications;
    explicitContentFilter: ExplicitContentFilter;
    roles: Role[];
    emojis: Emoji[];
    features: Feature[];
    mfaLevel: MFALevel;
    applicationID?: string;
    systemChannelID?: string;
    systemChannelFlags: number;
    rulesChannelID?: string;
    maxPresences?: number;
    maxMembers?: number;
    vanityURLCode?: string;
    description?: string;
    banner?: string;
    premiumTier: PremiumTier;
    premiumSubscriptionCount: number;
    preferredLocale: string;
    publicUpdatesChannelID?: string;
    maxVideoChannelUsers?: number;
    approximateMemberCount?: number;
    approximatePresenceCount?: number;
    welcomeScreen?: WelcomeScreen;
}

export type VerificationLevel = typeof VERIFICATION_LEVEL_NONE | typeof VERIFICATION_LEVEL_LOW | typeof VERIFICATION_LEVEL_MEDIUM | typeof VERIFICATION_LEVEL_HIGH | typeof VERIFICATION_LEVEL_VERY_HIGH;
export const VERIFICATION_LEVEL_NONE = 0;
export const VERIFICATION_LEVEL_LOW = 1;
export const VERIFICATION_LEVEL_MEDIUM = 2;
export const VERIFICATION_LEVEL_HIGH = 3;
export const VERIFICATION_LEVEL_VERY_HIGH = 4;

export type DefaultMessageNotifications = typeof DEFAULT_MESSAGE_NOTIFICATIONS_ALL_MESSAGES | typeof DEFAULT_MESSAGE_NOTIFICATIONS_ONLY_MENTIONS;
export const DEFAULT_MESSAGE_NOTIFICATIONS_ALL_MESSAGES = 0;
export const DEFAULT_MESSAGE_NOTIFICATIONS_ONLY_MENTIONS = 1;

export type ExplicitContentFilter = typeof EXPLICIT_CONTENT_FILTER_DISABLED | typeof EXPLICIT_CONTENT_FILTER_MEMBERS_WITHOUT_ROLES | typeof EXPLICIT_CONTENT_FILTER_ALL_MEMBERS;
export const EXPLICIT_CONTENT_FILTER_DISABLED = 0;
export const EXPLICIT_CONTENT_FILTER_MEMBERS_WITHOUT_ROLES = 1;
export const EXPLICIT_CONTENT_FILTER_ALL_MEMBERS = 2;

export type Feature = "INVITE_SPLASH" | "VIP_REGIONS" | "VANITY_URL" | "VERIFIED" | "PARTNERED" | "COMMUNITY" | "COMMERCE" | "NEWS" | "DISCOVERABLE" | "FEATURABLE" | "ANIMATED_ICON" | "BANNER" | "WELCOME_SCREEN_ENABLED" | "MEMBER_VERIFICATION_GATE_ENABLED" | "PREVIEW_ENABLED";

export type MFALevel = typeof MFA_LEVEL_NONE | typeof MFA_LEVEL_ELEVATED;
export const MFA_LEVEL_NONE = 0;
export const MFA_LEVEL_ELEVATED = 1;

export type PremiumTier = typeof PREMIUM_TIER_NONE | typeof PREMIUM_TIER_TIER_1 | typeof PREMIUM_TIER_TIER_2 | typeof PREMIUM_TIER_TIER_3;
export const PREMIUM_TIER_NONE = 0;
export const PREMIUM_TIER_TIER_1 = 1;
export const PREMIUM_TIER_TIER_2 = 2;
export const PREMIUM_TIER_TIER_3 = 3;

export interface VoiceRegion {
    id: string;
    name: string;
    vip: boolean;
    optimal: boolean;
    deprecated: boolean;
    custom: boolean;
}

export type GuildResolvable = Guild | Ban | Emoji | GuildChannel | GuildWidget | Invite | Member | Role | Template | VanityInvite | Webhook | WelcomeScreen | string;

export default class Guild extends Base<Guild> {

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
    icon?: string;

    /**
     * Splash Image
     *
     * The guild's splash image hash
     */
    splashImage?: string;

    /**
     * Discovery Splash Image
     *
     * The guild's discovery splash image hash
     */
    discoverySplashImage?: string;

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
    afkChannelID?: string;

    /**
     * AFK Timeout
     *
     * The guild's AFK timeout
     */
    afkTimeout: number;

    /**
     * Widget Enabled
     *
     * Whether or not this guild's widget is enabled
     */
    widgetEnabled: boolean;

    /**
     * Widget Channel ID
     *
     * The ID of the guild's widget channel
     */
    widgetChannelID?: string;

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
     * Channels
     *
     * The cache manager interface for the channels in this guild
     */
    channels: CacheManagerInterface<AnyChannel>;

    /**
     * Roles
     *
     * The roles in this guild
     */
    roles: Role[];

    /**
     * Emojis
     *
     * The emojis in this guild
     */
    emojis: Emoji[];

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
    applicationID?: string;

    /**
     * System Channel ID
     *
     * The ID of the guild's system channel
     */
    systemChannelID?: string;

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
    rulesChannelID?: string;

    /**
     * Max Presences
     *
     * The maximum number of online members this guild can have
     */
    maxPresences: number;

    /**
     * Max Members
     *
     * The maximum number of members this guild can have
     */
    maxMembers?: number;

    /**
     * Vanity URL Code
     *
     * The guild's vanity URL code
     */
    vanityURLCode?: string;

    /**
     * Description
     *
     * The guild's description
     */
    description?: string;

    /**
     * Banner
     *
     * The guild's banner hash
     */
    banner?: string;

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
    publicUpdatesChannelID?: string;

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
    welcomeScreen?: WelcomeScreen;

    /**
     * Guild
     *
     * @param client The client
     * @param guildData Options to initialize this role with
     * @param guildData.id The guild's ID
     * @param guildData.name The guild's name
     * @param guildData.icon The guild's icon hash
     * @param guildData.splashImage The guild's splash image hash
     * @param guildData.discoverySplashImage The guild's discovery splash image hash
     * @param guildData.ownerID The ID of the guild's owner
     * @param guildData.region The guild's region
     * @param guildData.afkChannelID The ID of the guild's AFK channel
     * @param guildData.afkTimeout The guild's AFK timeout
     * @param guildData.widgetEnabled Whether or not this guild's widget is enabled
     * @param guildData.widgetChannelID The ID of the guild's widget channel
     * @param guildData.verificationLevel The guild's verification level
     * @param guildData.defaultMessageNotifications The guild's default message notifications setting
     * @param guildData.explicitContentFilter The guild's explicit content filter setting
     * @param guildData.roles The roles in this guild
     * @param guildData.emojis The emojis in this guild
     * @param guildData.features The guild's features
     * @param guildData.mfaLevel The guild's MFA level
     * @param guildData.applicationID The ID of the bot that created this guild
     * @param guildData.systemChannelID The ID of the guild's system channel
     * @param guildData.systemChannelFlags The guild's system channel flags
     * @param guildData.rulesChannelID The ID of the guild's rules channel
     * @param guildData.maxPresences The maximum number of online members this guild can have
     * @param guildData.maxMembers The maximum number of members this guild can have
     * @param guildData.vanityURLCode The guild's vanity URL code
     * @param guildData.description The guild's description
     * @param guildData.banner The guild's banner hash
     * @param guildData.premiumTier The guild's server boost level
     * @param guildData.premiumSubscriptionCount The number of people boosting this guild
     * @param guildData.preferredLocale The guild's preferred locale
     * @param guildData.publicUpdatesChannelID The ID of the guild's public updates channel
     * @param guildData.maxVideoChannelUsers The maximum number of members that can be in video channels in this guild
     * @param guildData.approximateMemberCount The approximate number of members in this guild
     * @param guildData.approximatePresenceCount The approximate number of online members in this guild
     * @param guildData.welcomeScreen The guild's welcome screen
     */
    constructor(client: Client, guildData: GuildData) {

        // Super
        super(client, {
            id: guildData.id,
            cacheManager: client._guilds
        });

        // Set data
        this.name = guildData.name;
        this.icon = guildData.icon;
        this.splashImage = guildData.splashImage;
        this.discoverySplashImage = guildData.discoverySplashImage;
        this.ownerID = guildData.ownerID;
        this.region = guildData.region;
        this.afkChannelID = guildData.afkChannelID;
        this.afkTimeout = guildData.afkTimeout;
        this.widgetEnabled = Boolean(guildData.widgetEnabled);
        this.widgetChannelID = guildData.widgetChannelID;
        this.verificationLevel = guildData.verificationLevel;
        this.defaultMessageNotifications = guildData.defaultMessageNotifications;
        this.explicitContentFilter = guildData.explicitContentFilter;
        this.channels = new CacheManagerInterface<AnyChannel>(this.client, {
            cacheManager: this.client._channels,
            match: (c: AnyChannel) => ((c instanceof GuildChannel) || (c instanceof TextChannel) || (c instanceof VoiceChannel) || (c instanceof CategoryChannel) || (c instanceof NewsChannel) || (c instanceof StoreChannel)) && (c.guildID === this.id)
        });
        this.roles = guildData.roles;
        this.emojis = guildData.emojis;
        this.features = guildData.features;
        this.mfaLevel = guildData.mfaLevel;
        this.applicationID = guildData.applicationID;
        this.systemChannelID = guildData.systemChannelID;
        this.systemChannelFlags = guildData.systemChannelFlags;
        this.rulesChannelID = guildData.rulesChannelID;
        this.maxPresences = guildData.maxPresences || 25000;
        this.maxMembers = guildData.maxMembers;
        this.vanityURLCode = guildData.vanityURLCode;
        this.description = guildData.description;
        this.banner = guildData.banner;
        this.premiumTier = guildData.premiumTier;
        this.premiumSubscriptionCount = guildData.premiumSubscriptionCount;
        this.preferredLocale = guildData.preferredLocale;
        this.publicUpdatesChannelID = guildData.publicUpdatesChannelID;
        this.maxVideoChannelUsers = guildData.maxVideoChannelUsers;
        this.approximateMemberCount = guildData.approximateMemberCount;
        this.approximatePresenceCount = guildData.approximatePresenceCount;
        this.welcomeScreen = guildData.welcomeScreen;
    }

    /**
     * From Raw Data
     *
     * Create an `Guild` from a `RawGuildData` object
     *
     * @param rawData The raw data from the API
     *
     * @returns {Guild} The guild
     */
    static _fromRawData(client: Client, rawData: RawGuildData): Guild {
        return fromRawData(client, rawData);
    }

    /**
     * Resolve ID
     *
     * Resolve an object to a guild ID
     *
     * @param guildResolvable The guild resolvable
     *
     * @returns {string | undefined} The resolved guild ID, or `undefined` if the guild resolvable is invalid
     */
    static resolveID(guildResolvable: GuildResolvable): string | undefined {
        return resolveID(guildResolvable);
    }
}