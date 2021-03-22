import { AnyChannel, AnyChannelData, Ban, Base, CacheManagerInterface, CategoryChannel, Channel, Client, Emoji, EmojiData, GuildChannel, GuildUserCacheManagerInterface, GuildWidget, Invite, Member, NewsChannel, RawGuildData, Role, RoleData, StoreChannel, Template, TextChannel, VanityInvite, VoiceChannel, Webhook, WelcomeScreen, WelcomeScreenData } from "../../internal";
import fromData from "./fromData";
import fromRawData from "./fromRawData";
import resolveID from "./resolveID";
import updateObject from "./updateObject";

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
    roleData: RoleData[];
    emojiData: EmojiData[];
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
    welcomeScreen?: WelcomeScreenData;
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
     * The cache manager interface for the roles in this guild
     */
    roles: CacheManagerInterface<Role>;

    /**
     * Emojis
     *
     * The cache manager interface for the emojis in this guild
     */
    emojis: CacheManagerInterface<Emoji>;

    /**
     * Members
     *
     * The guild user cache manager interface for the members in this guild
     */
    members: GuildUserCacheManagerInterface<Member>;

    /**
     * Bans
     *
     * The guild user cache manager interface for the bans in this guild
     */
    bans: GuildUserCacheManagerInterface<Ban>;

    /**
     * Invites
     *
     * The cache manager interface for the invites in this guild
     */
    invites: CacheManagerInterface<Invite>;

    /**
     * Templates
     *
     * The cache manager interface for the templates in this guild
     */
    templates: CacheManagerInterface<Template>;

    /**
     * Webhooks
     *
     * The cache manager interface for the webhooks in this guild
     */
    webhooks: CacheManagerInterface<Webhook>;

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
    welcomeScreen?: WelcomeScreenData;

    /**
     * Guild
     *
     * @param client The client
     * @param guildData Options to initialize this guild with
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
     * @param guildData.roleData The roles in this guild
     * @param guildData.emojiData The emojis in this guild
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
        Guild._updateObject(this, guildData);
        this.channels = new CacheManagerInterface<AnyChannel>(this.client, {
            cacheManager: this.client._channels,
            match: (c: AnyChannel) => ((c instanceof GuildChannel) || (c instanceof TextChannel) || (c instanceof VoiceChannel) || (c instanceof CategoryChannel) || (c instanceof NewsChannel) || (c instanceof StoreChannel)) && (c.guildID === this.id),
            fetchObject: async (id: string): Promise<AnyChannel> => {

                // Get channel data
                const channelData: AnyChannelData = await this.client.getChannel(id);

                // Match
                if ((!("guildID" in channelData)) || (channelData.guildID !== this.id)) throw new Error("Couldn't find a channel with that ID in this guild");

                // Return
                return Channel.fromData(this.client, channelData);
            }
        });
        this.roles = new CacheManagerInterface<Role>(this.client, {
            cacheManager: this.client._roles,
            match: (r: Role) => r.guildID === this.id,
            fetchObject: async (id: string): Promise<Role> => {

                // Get role data
                const roleData: RoleData | undefined = (await this.client.getGuildRoles(this.id)).find((r: RoleData) => r.id === id);
                if (!roleData) throw new Error("Couldn't find a role with that ID in this guild");

                // Return
                return Role.fromData(this.client, roleData);
            }
        });
        this.emojis = new CacheManagerInterface<Emoji>(this.client, {
            cacheManager: this.client._emojis,
            match: (e: Emoji) => e.guildID === this.id,
            fetchObject: async (id: string): Promise<Emoji> => Emoji.fromData(this.client, await this.client.getGuildEmoji(this.id, id))
        });
        this.members = new GuildUserCacheManagerInterface<Member>(this.client, {
            cacheManager: this.client._members._cacheManager,
            match: (m: Member) => m.guildID === this.id,
            fetchObject: async (id: string): Promise<Member> => Member.fromData(this.client, await this.client.getGuildMember(id.split("_")[0], id.split("_")[1]))
        });
        this.bans = new GuildUserCacheManagerInterface<Ban>(this.client, {
            cacheManager: this.client._bans._cacheManager,
            match: (b: Ban) => b.guildID === this.id,
            fetchObject: async (id: string): Promise<Ban> => Ban.fromData(this.client, await this.client.getGuildBan(id.split("_")[0], id.split("_")[1]))
        });
        this.invites = new CacheManagerInterface<Invite>(this.client, {
            cacheManager: this.client._invites,
            match: (i: Invite) => i.guildID === this.id,
            fetchObject: async (id: string): Promise<Invite> => Invite.fromData(this.client, await this.client.getInvite(id))
        });
        this.templates = new CacheManagerInterface<Template>(this.client, {
            cacheManager: this.client._templates,
            match: (t: Template) => t.sourceGuildID === this.id,
            fetchObject: async (id: string): Promise<Template> => Template.fromData(this.client, await this.client.getTemplate(id))
        });
        this.webhooks = new CacheManagerInterface<Webhook>(this.client, {
            cacheManager: this.client._webhooks,
            match: (w: Webhook) => w.guildID === this.id,
            fetchObject: async (id: string): Promise<Webhook> => Webhook.fromData(this.client, await this.client.getWebhook(id))
        });

        // Cache guild
        this.client._guilds.cache(this.id, this);
    }

    /**
     * From Raw Data
     *
     * Create a `GuildData` object from a `RawGuildData` object
     *
     * @param rawData The raw data from the API
     *
     * @returns {GuildData} The guild data
     */
    static _fromRawData(rawData: RawGuildData): GuildData {
        return fromRawData(rawData);
    }

    /**
     * From Data
     *
     * Create a `Guild` from a `GuildData` object
     *
     * @param guildData The guild data
     *
     * @returns {Guild} The guild
     */
    static fromData(client: Client, guildData: GuildData): Guild {
        return fromData(client, guildData);
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

    /**
     * Update Object
     *
     * Update the `Guild` object with data from a `GuildData` object
     *
     * @param guildData The data to update this guild with
     */
    static _updateObject(guild: Guild, guildData: GuildData) {
        updateObject(guild, guildData);
    }
}