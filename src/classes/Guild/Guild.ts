import { AnyChannel, AnyChannelData, AnyGuildChannelData, AuditLogData, Ban, BanData, Base, CacheManagerInterface, CategoryChannel, Channel, Client, CreateGuildBanData, CreateGuildChannelData, CreateGuildEmojiData, CreateGuildRoleData, CreateGuildTemplateData, CurrentUserNickname, DefaultMessageNotifications, Emoji, EmojiData, EmojiResolvable, ExplicitContentFilter, Feature, GetGuildAuditLogData, GuildChannel, GuildData, GuildPreview, GuildUserCacheManagerInterface, GuildWidget, GuildWidgetData, Invite, InviteData, ListGuildMembersData, Member, MemberData, ModifyGuildChannelPositionsData, ModifyGuildData, ModifyGuildEmojiData, ModifyGuildMemberData, ModifyGuildRoleData, ModifyGuildRolePositionsData, ModifyGuildTemplateData, ModifyGuildWelcomeScreenData, ModifyGuildWidgetData, MFALevel, NewsChannel, PremiumTier, RawGuildData, Role, RoleData, RoleResolvable, SearchGuildMembersData, StoreChannel, Template, TemplateData, TemplateResolvable, TextChannel, UserResolvable, VanityInvite, VanityInviteData, VerificationLevel, VoiceChannel, VoiceRegion, Webhook, WebhookData, WelcomeScreen, WelcomeScreenData } from "../../internal";
import fromData from "./fromData";
import fromRawData from "./fromRawData";
import resolveID from "./resolveID";
import updateObject from "./updateObject";
import updateObjectFromData from "./updateObjectFromData";

/**
 * Guild Resolvable
 *
 * The types that can be resolved to a guild
 */
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
     * @param guildData.widget The guild's widget
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
            },
            getIDs: () => this.roleData.map((r: RoleData) => r.id)
        });
        this.emojis = new CacheManagerInterface<Emoji>(this.client, {
            cacheManager: this.client._emojis,
            match: (e: Emoji) => e.guildID === this.id,
            fetchObject: async (id: string): Promise<Emoji> => Emoji.fromData(this.client, await this.client.getGuildEmoji(this.id, id)),
            getIDs: () => this.emojiData.map((e: EmojiData) => e.id)
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
            match: (w: Webhook) => w.guildID === this.id
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
    static _fromRawData(client: Client, rawData: RawGuildData): GuildData {
        return fromRawData(client, rawData);
    }

    /**
     * From Data
     *
     * Create a `Guild` from a `GuildData` object
     *
     * @param client The client
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
     * @param guild The guild to update
     * @param guildData The data to update this guild with
     */
    static _updateObject(guild: Guild, guildData: GuildData) {
        updateObject(guild, guildData);
    }

    /**
     * Update Object From Data
     *
     * Update the `Guild` object with data from a `GuildData` object if it's cached
     *
     * @param client The client
     * @param guildData The guild data
     *
     * @returns {Guild | undefined} The guild
     */
    static _updateObjectFromData(client: Client, guildData: GuildData): Guild | undefined {
        return updateObjectFromData(client, guildData);
    }

    /**
     * Add Role to Member
     *
     * Add a role to a member in this guild
     *
     * @param user The user resolvable for the member to add the role to
     * @param role The role to add
     */
    addRoleToMember(user: UserResolvable, role: RoleResolvable): Promise<void> {
        return this.client.addGuildMemberRole(this, user, role);
    }

    /**
     * Ban User
     *
     * Ban a user from this guild
     *
     * @param user The user to ban
     * @param createGuildBanData The data for the ban
     */
    banUser(user: UserResolvable, createGuildBanData?: CreateGuildBanData): Promise<void> {
        return this.client.createGuildBan(this, user, createGuildBanData);
    }

    /**
     * Create Channel
     *
     * Create a channel in this guild
     *
     * @param createGuildChannelData The data for the channel
     *
     * @returns {Promise<AnyGuildChannelData>} The created channel's data
     */
    createChannel(createGuildChannelData: CreateGuildChannelData): Promise<AnyGuildChannelData> {
        return this.client.createGuildChannel(this, createGuildChannelData);
    }

    /**
     * Create Emoji
     *
     * Create an emoji in this guild
     *
     * @param createGuildEmojiData The data for the emoji
     *
     * @returns {Promise<EmojiData>} The created emoji's data
     */
    createEmoji(createGuildEmojiData: CreateGuildEmojiData): Promise<EmojiData> {
        return this.client.createGuildEmoji(this, createGuildEmojiData);
    }

    /**
     * Create Role
     *
     * Create a role in this guild
     *
     * @param createGuildRoleData The data for the role
     *
     * @returns {Promise<RoleData>} The created role's data
     */
    createRole(createGuildRoleData: CreateGuildRoleData): Promise<RoleData> {
        return this.client.createGuildRole(this, createGuildRoleData);
    }

    /**
     * Create Template
     *
     * Create a template in this guild
     *
     * @param createGuildTemplateData The data for the template
     *
     * @returns {Promise<TemplateData>} The created template's data
     */
    createTemplate(createGuildTemplateData: CreateGuildTemplateData): Promise<TemplateData> {
        return this.client.createGuildTemplate(this, createGuildTemplateData);
    }

    /**
     * Delete
     *
     * Delete this guild
     */
    delete(): Promise<void> {
        return this.client.deleteGuild(this);
    }

    /**
     * Delete Emoji
     *
     * Delete an emoji from this guild
     *
     * @param emoji The emoji to delete
     */
    deleteEmoji(emoji: EmojiResolvable): Promise<void> {
        return this.client.deleteGuildEmoji(this, emoji);
    }

    /**
     * Delete Role
     *
     * Delete a role from this guild
     *
     * @param role The role to delete
     */
    deleteRole(role: RoleResolvable): Promise<void> {
        return this.client.deleteGuildRole(this, role);
    }

    /**
     * Delete Template
     *
     * Delete a template from this guild
     *
     * @param template The template to delete
     *
     * @returns {Promise<TemplateData>} The deleted template's data
     */
    deleteTemplate(template: TemplateResolvable): Promise<TemplateData> {
        return this.client.deleteGuildTemplate(this, template);
    }

    /**
     * Get Audit Log
     *
     * Get an audit log from this guild
     *
     * @param getGuildAuditLogData The data for getting the audit log
     *
     * @returns {Promise<AuditLogData>} The audit log data
     */
    getAuditLog(getGuildAuditLogData?: GetGuildAuditLogData): Promise<AuditLogData> {
        return this.client.getGuildAuditLog(this, getGuildAuditLogData);
    }

    /**
     * Get Ban
     *
     * Get a ban from this guild
     *
     * @param user The user to get the ban for
     *
     * @returns {Promise<BanData>} The ban data
     */
    getBan(user: UserResolvable): Promise<BanData> {
        return this.client.getGuildBan(this, user);
    }

    /**
     * Get Bans
     *
     * Get the bans from this guild
     *
     * @returns {Promise<BanData[]>} The guild's bans
     */
    getBans(): Promise<BanData[]> {
        return this.client.getGuildBans(this);
    }

    /**
     * Get Channels
     *
     * Get this guild's channels
     *
     * @returns {Promise<AnyGuildChannelData[]>} The guild's channels
     */
    getChannels(): Promise<AnyGuildChannelData[]> {
        return this.client.getGuildChannels(this);
    }

    /**
     * Get Emoji
     *
     * Get an emoji from this guild
     *
     * @param emoji The emoji to get
     *
     * @returns {Promise<EmojiData>} The emoji data
     */
    getEmoji(emoji: EmojiResolvable): Promise<EmojiData> {
        return this.client.getGuildEmoji(this, emoji);
    }

    /**
     * Get Emojis
     *
     * Get this guild's emojis
     *
     * @returns {Promise<EmojiData[]>} The emojis
     */
    getEmojis(): Promise<EmojiData[]> {
        return this.client.listGuildEmojis(this);
    }

    /**
     * Get Invites
     *
     * Get this guild's invites
     *
     * @returns {Promise<InviteData[]>} The invites
     */
    getInvites(): Promise<InviteData[]> {
        return this.client.getGuildInvites(this);
    }

    /**
     * Get Member
     *
     * Get a member from this guild
     *
     * @param user The user resolvable for the member to get
     *
     * @returns {Promise<MemberData>} The member data
     */
    getMember(user: UserResolvable): Promise<MemberData> {
        return this.client.getGuildMember(this, user);
    }

    /**
     * Get Members
     *
     * Get the members from this guild
     *
     * @param listGuildMembersData The data for getting the members
     *
     * @returns {Promise<MemberData[]>} The members
     */
    getMembers(listGuildMembersData?: ListGuildMembersData): Promise<MemberData[]> {
        return this.client.listGuildMembers(this, listGuildMembersData);
    }

    /**
     * Get Preview
     *
     * Get this guild's preview
     *
     * @returns {Promise<GuildPreview>} The guild preview
     */
    getPreview(): Promise<GuildPreview> {
        return this.client.getGuildPreview(this);
    }

    /**
     * Get Roles
     *
     * Get this guild's roles
     *
     * @returns {Promise<RoleData[]>} The guild's roles
     */
    getRoles(): Promise<RoleData[]> {
        return this.client.getGuildRoles(this);
    }

    /**
     * Get Templates
     *
     * Get this guild's templates
     *
     * @returns {Promise<TemplateData[]>} The guild's templates
     */
    getTemplates(): Promise<TemplateData[]> {
        return this.client.getGuildTemplates(this);
    }

    /**
     * Get Vanity URL
     *
     * Get this guild's vanity URL
     *
     * @returns {Promise<VanityInviteData>} The vanity invite data
     */
    getVanityURL(): Promise<VanityInviteData> {
        return this.client.getGuildVanityURL(this);
    }

    /**
     * Get Voice Regions
     *
     * Get this guild's voice regions
     *
     * @returns {Promise<VoiceRegion[]>} The guild's voice regions
     */
    getVoiceRegions(): Promise<VoiceRegion[]> {
        return this.client.getGuildVoiceRegions(this);
    }

    /**
     * Get Webhooks
     *
     * Get this guild's webhooks
     *
     * @returns {Promise<WebhookData[]>} The guild's webhooks
     */
    getWebhooks(): Promise<WebhookData[]> {
        return this.client.getGuildWebhooks(this);
    }

    /**
     * Get Widget Settings
     *
     * Get this guild's widget settings
     *
     * @returns {Promise<GuildWidgetData>} The guild widget data
     */
    getWidgetSettings(): Promise<GuildWidgetData> {
        return this.client.getGuildWidgetSettings(this);
    }

    /**
     * Leave
     *
     * Leave this guild
     */
    leave(): Promise<void> {
        return this.client.leaveGuild(this);
    }

    /**
     * Set Nickname
     *
     * Set the client's nickname in this guild
     *
     * @param nickname The nickname
     *
     * @returns {Promise<CurrentUserNickname>} The modified nickname data
     */
    setNickname(nickname?: string): Promise<CurrentUserNickname> {
        return this.client.modifyCurrentUserNickname(this, { nickname });
    }

    /**
     * Edit
     *
     * Edit this guild
     *
     * @param modifyGuildData The data to modify the guild
     *
     * @returns {Promise<GuildData>} The modified guild's data
     */
    edit(modifyGuildData: ModifyGuildData): Promise<GuildData> {
        return this.client.modifyGuild(this, modifyGuildData);
    }

    /**
     * Edit Channel Positions
     *
     * Edit the positions of channels in this guild
     *
     * @param modifyGuildChannelPositionsData The data to modify the channel positions
     */
    editChannelPositions(modifyGuildChannelPositionsData: ModifyGuildChannelPositionsData[]): Promise<void> {
        return this.client.modifyGuildChannelPositions(this, modifyGuildChannelPositionsData);
    }

    /**
     * Edit Emoji
     *
     * Edit an emoji in this guild
     *
     * @param emoji The emoji to modify
     * @param modifyGuildEmojiData The data to modify the emoji
     *
     * @returns {Promise<EmojiData>} The modified emoji's data
     */
    editEmoji(emoji: EmojiResolvable, modifyGuildEmojiData: ModifyGuildEmojiData): Promise<EmojiData> {
        return this.client.modifyGuildEmoji(this, emoji, modifyGuildEmojiData);
    }

    /**
     * Edit Member
     *
     * Edit a member in this guild
     *
     * @param user The user resolvable for the member to modify
     * @param modifyGuildMemberData The data to modify the member
     *
     * @returns {Promise<MemberData>} The modified member's data
     */
    editMember(user: UserResolvable, modifyGuildMemberData: ModifyGuildMemberData): Promise<MemberData> {
        return this.client.modifyGuildMember(this, user, modifyGuildMemberData);
    }

    /**
     * Edit Role
     *
     * Edit a role in this guild
     *
     * @param role The role to modify
     * @param modifyGuildRoleData The data to modify the role
     *
     * @returns {Promise<RoleData>} The modified role's data
     */
    editRole(role: RoleResolvable, modifyGuildRoleData: ModifyGuildRoleData): Promise<RoleData> {
        return this.client.modifyGuildRole(this, role, modifyGuildRoleData);
    }

    /**
     * Edit Role Positions
     *
     * Edit the positions of roles in this guild
     *
     * @param modifyGuildRolePositionsData The data to modify the role positions
     *
     * @returns {Promise<RoleData[]>} The guild's roles
     */
    editRolePositions(modifyGuildRolePositionsData: ModifyGuildRolePositionsData[]): Promise<RoleData[]> {
        return this.client.modifyGuildRolePositions(this, modifyGuildRolePositionsData);
    }

    /**
     * Edit Template
     *
     * Edit a template in this guild
     *
     * @param template The template to modify
     * @param modifyGuildTemplateData The data to modify the template
     *
     * @returns {Promise<TemplateData>} The modified template's data
     */
    editTemplate(template: TemplateResolvable, modifyGuildTemplateData: ModifyGuildTemplateData): Promise<TemplateData> {
        return this.client.modifyGuildTemplate(this, template, modifyGuildTemplateData);
    }

    /**
     * Edit Welcome Screen
     *
     * Edit this guild's welcome screen
     *
     * @param modifyGuildWelcomeScreenData The data to modify the welcome screen
     *
     * @returns {Promise<WelcomeScreenData>} The modified welcome screen's data
     */
    editWelcomeScreen(modifyGuildWelcomeScreenData: ModifyGuildWelcomeScreenData): Promise<WelcomeScreenData> {
        return this.client.modifyGuildWelcomeScreen(this, modifyGuildWelcomeScreenData);
    }

    /**
     * Edit Guild Widget
     *
     * Edit this guild's widget
     *
     * @param modifyGuildWidgetData The data to modify the guild's widget
     *
     * @returns {Promise<GuildWidgetData>} The modified guild widget's data
     */
    editGuildWidget(modifyGuildWidgetData: ModifyGuildWidgetData): Promise<GuildWidgetData> {
        return this.client.modifyGuildWidget(this, modifyGuildWidgetData);
    }

    /**
     * Search Members
     *
     * Search the members in this guild by username or nickname
     *
     * @param searchGuildMembersData The data for searching the members
     *
     * @returns {Promise<MemberData[]>} The members
     */
    searchMembers(searchGuildMembersData: SearchGuildMembersData): Promise<MemberData[]> {
        return this.client.searchGuildMembers(this, searchGuildMembersData);
    }

    /**
     * Unban User
     *
     * Unban a user from this guild
     *
     * @param user The user to unban
     */
    unbanUser(user: UserResolvable): Promise<void> {
        return this.client.removeGuildBan(this, user);
    }

    /**
     * Kick Member
     *
     * Kick a user from this guild
     *
     * @param user The user resolvable for the member to kick
     */
    kickMember(user: UserResolvable): Promise<void> {
        return this.client.removeGuildMember(this, user);
    }

    /**
     * Remove Role from Member
     *
     * Remove a role from a member in this guild
     *
     * @param user The user resolvable for the member to remove the role from
     * @param role The role to remove
     */
    removeRoleFromMember(user: UserResolvable, role: RoleResolvable): Promise<void> {
        return this.client.removeGuildMemberRole(this, user, role);
    }

    /**
     * Sync Template
     *
     * Sync a template in this guild
     *
     * @param template The template to sync
     *
     * @returns {Promise<TemplateData>} The synced template's data
     */
    syncTemplate(template: TemplateResolvable): Promise<TemplateData> {
        return this.client.syncGuildTemplate(this, template);
    }
}