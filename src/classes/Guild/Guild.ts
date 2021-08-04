import { AnyChannel, AnyGuildChannel, AnyInteraction, AuditLogData, Ban, BanData, Base, BulkEditGuildCommandPermissionsData, CacheInterface, CategoryChannel, Client, Command, CommandPermissions, CommandResolvable, CreateCommandData, CreateGuildBanData, CreateGuildChannelData, CreateGuildEmojiData, CreateGuildRoleData, CreateGuildStickerData, CreateGuildTemplateData, CurrentUserNickname, DefaultMessageNotifications, EditCommandData, EditGuildCommandPermissionsData, Emoji, EmojiData, EmojiResolvable, ExplicitContentFilter, Feature, GetGuildAuditLogData, GuildChannel, GuildChannelData, GuildData, GuildPreview, GuildWidget, GuildWidgetData, Invite, InviteData, ListGuildMembersData, Member, MemberCacheInterface, MemberData, ModifyGuildChannelPositionsData, ModifyGuildData, ModifyGuildEmojiData, ModifyGuildMemberData, ModifyGuildRoleData, ModifyGuildRolePositionsData, ModifyGuildStickerData, ModifyGuildTemplateData, ModifyGuildWelcomeScreenData, ModifyGuildWidgetData, MFALevel, NewsChannel, NSFWLevel, PremiumTier, RawGuildData, Role, RoleData, RoleResolvable, READY_STATE_READY, SearchGuildMembersData, Sticker, StickerData, StickerResolvable, StoreChannel, Template, TemplateData, TemplateResolvable, TextChannel, UserResolvable, VanityInvite, VanityInviteData, VerificationLevel, VoiceChannel, VoiceRegion, Webhook, WebhookData, WelcomeScreen, WelcomeScreenData } from "../../internal";
import dataFromRawData from "./dataFromRawData";
import fromData from "./fromData";
import resolveID from "./resolveID";
import toData from "./toData";
import updateObject from "./updateObject";
import updateObjectFromData from "./updateObjectFromData";

/**
 * Guild Resolvable
 *
 * The types that can be resolved to a guild
 */
export type GuildResolvable = Guild | GuildData | Ban | BanData | Emoji | EmojiData | GuildChannel | GuildChannelData | GuildWidget | GuildWidgetData | Invite | InviteData | Member | MemberData | Role | RoleData | Template | TemplateData | VanityInvite | VanityInviteData | Webhook | WebhookData | WelcomeScreen | WelcomeScreenData | string;

export default class Guild extends Base<Guild> {

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
    widget: GuildWidget;

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
     * Bans
     *
     * The member cache interface for the bans in this guild
     */
    bans: MemberCacheInterface<Ban>;

    /**
     * Channels
     *
     * The cache interface for the channels in this guild
     */
    channels: CacheInterface<AnyChannel>;

    /**
     * Commands
     *
     * The cache interface for the commands in this guild
     */
    commands: CacheInterface<Command>;

    /**
     * Emojis
     *
     * The cache interface for the emojis in this guild
     */
    emojis: CacheInterface<Emoji>;

    /**
     * Interactions
     *
     * The cache interface for the interactions in this guild
     */
    interactions: CacheInterface<AnyInteraction, false>;

    /**
     * Invites
     *
     * The cache interface for the invites in this guild
     */
    invites: CacheInterface<Invite>;

    /**
     * Members
     *
     * The member cache interface for the members in this guild
     */
    members: MemberCacheInterface<Member>;

    /**
     * Roles
     *
     * The cache interface for the roles in this guild
     */
    roles: CacheInterface<Role>;

    /**
     * Templates
     *
     * The cache interface for the templates in this guild
     */
    templates: CacheInterface<Template>;

    /**
     * Webhooks
     *
     * The cache interface for the webhooks in this guild
     */
    webhooks: CacheInterface<Webhook>;

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
    welcomeScreen: WelcomeScreen | null;

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
     * @param guildData.nsfwLevel The guild's NSFW level
     * @param guildData.stickerData The stickers in this guild
     */
    constructor(client: Client, guildData: GuildData) {

        // Super
        super(client, {
            id: guildData.id,
            cacheManager: client._guilds
        });

        // Set data
        Guild._updateObject(this, guildData);
        Object.defineProperty(this, "bans", {
            value: new MemberCacheInterface<Ban>(this.client, {
                cacheManager: this.client._bans._cacheManager,
                match: (b: Ban) => b.guildID === this.id,
                fetchObject: async (id: string): Promise<Ban | undefined> => await this.client.getGuildBan(id.split("_")[0], id.split("_")[1])
            })
        });
        Object.defineProperty(this, "channels", {
            value: new CacheInterface<AnyChannel>(this.client, {
                cacheManager: this.client._channels,
                match: (c: AnyChannel) => ((c instanceof GuildChannel) || (c instanceof TextChannel) || (c instanceof VoiceChannel) || (c instanceof CategoryChannel) || (c instanceof NewsChannel) || (c instanceof StoreChannel)) && (c.guildID === this.id),
                fetchObject: async (id: string): Promise<AnyChannel | undefined> => {

                    // Get channel
                    const channel: AnyChannel | undefined = await this.client.getChannel(id);

                    // Match
                    if ((!channel) || (!("guildID" in channel)) || (channel.guildID !== this.id)) return;

                    // Return
                    return channel;
                }
            })
        });
        Object.defineProperty(this, "commands", {
            value: new CacheInterface<Command>(this.client, {
                cacheManager: this.client._commands,
                match: (c: Command) => c.guildID === this.id,
                fetchObject: async (id: string): Promise<Command | undefined> => await this.client.getGuildCommand(this.id, id)
            })
        });
        Object.defineProperty(this, "emojis", {
            value: new CacheInterface<Emoji>(this.client, {
                cacheManager: this.client._emojis,
                match: (e: Emoji) => e.guildID === this.id,
                fetchObject: async (id: string): Promise<Emoji | undefined> => await this.client.getGuildEmoji(this.id, id),
                getIDs: () => this.emojiData.map((e: EmojiData) => e.id)
            })
        });
        Object.defineProperty(this, "interactions", {
            value: new CacheInterface<AnyInteraction, false>(this.client, {
                cacheManager: this.client._interactions,
                match: (i: AnyInteraction) => i.guildID === this.id
            })
        });
        Object.defineProperty(this, "invites", {
            value: new CacheInterface<Invite>(this.client, {
                cacheManager: this.client._invites,
                match: (i: Invite) => i.guildID === this.id,
                fetchObject: async (id: string): Promise<Invite | undefined> => await this.client.getInvite(id)
            })
        });
        Object.defineProperty(this, "members", {
            value: new MemberCacheInterface<Member>(this.client, {
                cacheManager: this.client._members._cacheManager,
                match: (m: Member) => m.guildID === this.id,
                fetchObject: async (id: string): Promise<Member | undefined> => await this.client.getGuildMember(id.split("_")[0], id.split("_")[1])
            })
        });
        Object.defineProperty(this, "roles", {
            value: new CacheInterface<Role>(this.client, {
                cacheManager: this.client._roles,
                match: (r: Role) => r.guildID === this.id,
                fetchObject: async (id: string): Promise<Role> => {

                    // Get role
                    const role: Role | undefined = (await this.client.getGuildRoles(this.id)).find((r: Role) => r.id === id);
                    if (!role) throw new Error("Couldn't find a role with that ID in this guild");

                    // Return
                    return role;
                },
                getIDs: () => this.roleData.map((r: RoleData) => r.id)
            })
        });
        Object.defineProperty(this, "templates", {
            value: new CacheInterface<Template>(this.client, {
                cacheManager: this.client._templates,
                match: (t: Template) => t.sourceGuildID === this.id,
                fetchObject: async (id: string): Promise<Template | undefined> => await this.client.getTemplate(id)
            })
        });
        Object.defineProperty(this, "webhooks", {
            value: new CacheInterface<Webhook>(this.client, {
                cacheManager: this.client._webhooks,
                match: (w: Webhook) => w.guildID === this.id
            })
        });

        /**
         * Cache Guild
         *
         * If we need to cache all guilds and the clients ready state is `READY`
         * The ready state needs to be `READY` since the client might need to fetch data to cache initial objects
         */
        if ((client._guilds.cacheAll) && (client._readyState === READY_STATE_READY)) this.cache();
    }

    /**
     * From Raw Data
     *
     * Create a `GuildData` object from a `RawGuildData` object
     *
     * @private
     * @param client The client
     * @param rawData The raw data from the API
     *
     * @returns {Guild} The guild
     */
    static _fromRawData(client: Client, rawData: RawGuildData): Guild {
        return Guild.fromData(client, Guild._dataFromRawData(client, rawData));
    }

    /**
     * Data From Raw Data
     *
     * Create a `GuildData` object from a `RawGuildData` object
     *
     * @private
     * @param client The client
     * @param rawData The raw data from the API
     *
     * @returns {GuildData} The guild data
     */
    static _dataFromRawData(client: Client, rawData: RawGuildData): GuildData {
        return dataFromRawData(client, rawData);
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
     * To Data
     *
     * Create a `GuildData` object from a `Guild`
     *
     * @param guild The guild
     *
     * @returns {GuildData} The guild data
     */
    static toData(guild: Guild): GuildData {
        return toData(guild);
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
     * @private
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
     * @private
     * @param client The client
     * @param guildData The guild data
     *
     * @returns {Guild | undefined} The guild
     */
    static _updateObjectFromData(client: Client, guildData: GuildData): Guild | undefined {
        return updateObjectFromData(client, guildData);
    }

    /**
     * Cache
     *
     * Cache this `Guild`
     *
     * @param expiresIn The amount of time for when this object can be garbage collected
     * `null` if it should never expire from cache
     * `undefined` to use the cache manager's default
     */
    cache(expiresIn?: number | null) {
        this.client._guilds.cache(this.id, this, expiresIn);
    }

    /**
     * Icon URL
     *
     * Get the icon's URL
     *
     * @param allowGIF Return the GIF version of the icon if available
     *
     * @returns {string | undefined} The icon's URL or `undefined` if there isn't one set
     */
    iconURL(allowGIF = true): string | undefined {
        return this.iconHash ? `https://cdn.discordapp.com/icons/${this.id}/${this.iconHash}.${((allowGIF) && (this.iconHash.startsWith("a_"))) ? "gif" : "png"}` : undefined;
    }

    /**
     * Splash Image URL
     *
     * Get the splash image's URL
     *
     * @returns {string | undefined} The splash image's URL or `undefined` if there isn't one set
     */
    splashImageURL(): string | undefined {
        return this.splashImageHash ? `https://cdn.discordapp.com/splashes/${this.id}/${this.splashImageHash}.png` : undefined;
    }

    /**
     * Discovery Splash Image URL
     *
     * Get the discovery splash image's URL
     *
     * @returns {string | undefined} The discovery splash image's URL or `undefined` if there isn't one set
     */
    discoverySplashImageURL(): string | undefined {
        return this.discoverySplashImageHash ? `https://cdn.discordapp.com/discovery-splashes/${this.id}/${this.discoverySplashImageHash}.png` : undefined;
    }

    /**
     * Banner URL
     *
     * Get the banner's URL
     *
     * @returns {string | undefined} The banner's URL or `undefined` if there isn't one set
     */
    bannerURL(): string | undefined {
        return this.bannerHash ? `https://cdn.discordapp.com/banners/${this.id}/${this.bannerHash}.png` : undefined;
    }

    /**
     * Add Role to Member
     *
     * Add a role to a member in this guild
     *
     * @param user The user resolvable for the member to add the role to
     * @param role The role to add
     * @param reason The reason for adding the role
     */
    addRoleToMember(user: UserResolvable, role: RoleResolvable, reason?: string): Promise<void> {
        return this.client.addGuildMemberRole(this, user, role, reason);
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
     * Bulk Edit Command Permissions
     *
     * Bulk edit the permissions of this guild's commands
     *
     * @param bulkEditGuildCommandPermissionsData The data for editing the command permissions
     *
     * @returns {Promise<CommandPermissions[]>} The command permissions
     */
    bulkEditCommandPermissions(bulkEditGuildCommandPermissionsData: BulkEditGuildCommandPermissionsData[]): Promise<CommandPermissions[]> {
        return this.client.bulkEditGuildCommandPermissions(this, bulkEditGuildCommandPermissionsData);
    }

    /**
     * Bulk Edit Commands
     *
     * Bulk edit this guild's commands
     *
     * @param editCommandData The data for the commands
     *
     * @returns {Promise<Command[]>} The commands
     */
    bulkEditCommands(editCommandData: EditCommandData[]): Promise<Command[]> {
        return this.client.bulkOverwriteGuildCommands(this, editCommandData);
    }

    /**
     * Create Channel
     *
     * Create a channel in this guild
     *
     * @param createGuildChannelData The data for the channel
     * @param reason The reason for creating the channel
     *
     * @returns {Promise<AnyGuildChannel>} The created channel
     */
    createChannel(createGuildChannelData: CreateGuildChannelData, reason?: string): Promise<AnyGuildChannel> {
        return this.client.createGuildChannel(this, createGuildChannelData, reason);
    }

    /**
     * Create Command
     *
     * Create a command in this guild
     *
     * @param createCommandData The data for the command
     *
     * @returns {Promise<Command>} The command
     */
    createCommand(createCommandData: CreateCommandData): Promise<Command> {
        return this.client.createGuildCommand(this, createCommandData);
    }

    /**
     * Create Emoji
     *
     * Create an emoji in this guild
     *
     * @param createGuildEmojiData The data for the emoji
     * @param reason The reason for creating the emoji
     *
     * @returns {Promise<Emoji>} The created emoji
     */
    createEmoji(createGuildEmojiData: CreateGuildEmojiData, reason?: string): Promise<Emoji> {
        return this.client.createGuildEmoji(this, createGuildEmojiData, reason);
    }

    /**
     * Create Role
     *
     * Create a role in this guild
     *
     * @param createGuildRoleData The data for the role
     * @param reason The reason for creating the role
     *
     * @returns {Promise<Role>} The created role
     */
    createRole(createGuildRoleData: CreateGuildRoleData, reason?: string): Promise<Role> {
        return this.client.createGuildRole(this, createGuildRoleData, reason);
    }

    /**
     * Create Sticker
     *
     * Create a sticker in this guild
     *
     * @param createGuildStickerData The data for the sticker
     * @param reason The reason for creating the sticker
     *
     * @returns {Promise<Sticker>} The created sticker
     */
    createSticker(createGuildStickerData: CreateGuildStickerData, reason?: string): Promise<Sticker> {
        return this.client.createGuildSticker(this, createGuildStickerData, reason);
    }

    /**
     * Create Template
     *
     * Create a template in this guild
     *
     * @param createGuildTemplateData The data for the template
     *
     * @returns {Promise<Template>} The created template
     */
    createTemplate(createGuildTemplateData: CreateGuildTemplateData): Promise<Template> {
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
     * Delete Command
     *
     * Delete a command from this guild
     *
     * @param command The command to delete
     */
    deleteCommand(command: CommandResolvable): Promise<void> {
        return this.client.deleteGuildCommand(this, command);
    }

    /**
     * Delete Emoji
     *
     * Delete an emoji from this guild
     *
     * @param emoji The emoji to delete
     * @param reason The reason for deleting the emoji
     */
    deleteEmoji(emoji: EmojiResolvable, reason?: string): Promise<void> {
        return this.client.deleteGuildEmoji(this, emoji, reason);
    }

    /**
     * Delete Role
     *
     * Delete a role from this guild
     *
     * @param role The role to delete
     * @param reason The reason for deleting the role
     */
    deleteRole(role: RoleResolvable, reason?: string): Promise<void> {
        return this.client.deleteGuildRole(this, role, reason);
    }

    /**
     * Delete Template
     *
     * Delete a template from this guild
     *
     * @param template The template to delete
     *
     * @returns {Promise<Template>} The deleted template
     */
    deleteTemplate(template: TemplateResolvable): Promise<Template> {
        return this.client.deleteGuildTemplate(this, template);
    }

    /**
     * Edit Command
     *
     * Edit a command in this guild
     *
     * @param command The command to edit
     * @param editCommandData The data for the command
     *
     * @returns {Promise<Command>} The command
     */
    editCommand(command: CommandResolvable, editCommandData: EditCommandData): Promise<Command> {
        return this.client.editGuildCommand(this, command, editCommandData);
    }

    /**
     * Edit Command Permissions
     *
     * Edit the permissions of a command in this guild
     *
     * @param command The command to edit the permissions for
     * @param editGuildCommandPermissionsData The data for editing the command permissions
     *
     * @returns {Promise<CommandPermissions>} The command permissions
     */
    editCommandPermissions(command: CommandResolvable, editGuildCommandPermissionsData: EditGuildCommandPermissionsData): Promise<CommandPermissions> {
        return this.client.editGuildCommandPermissions(this, command, editGuildCommandPermissionsData);
    }

    /**
     * Get All Command Permissions
     *
     * Get the permissions of this guild's commands
     *
     * @returns {Promise<CommandPermissions[]>} The command permissions
     */
    getAllCommandPermissions(): Promise<CommandPermissions[]> {
        return this.client.getAllGuildCommandPermissions(this);
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
     * @returns {Promise<Ban>} The ban
     */
    getBan(user: UserResolvable): Promise<Ban | undefined> {
        return this.client.getGuildBan(this, user);
    }

    /**
     * Get Bans
     *
     * Get the bans from this guild
     *
     * @returns {Promise<Ban[]>} The guild's bans
     */
    getBans(): Promise<Ban[]> {
        return this.client.getGuildBans(this);
    }

    /**
     * Get Channels
     *
     * Get this guild's channels
     *
     * @returns {Promise<AnyGuildChannel[]>} The guild's channels
     */
    getChannels(): Promise<AnyGuildChannel[]> {
        return this.client.getGuildChannels(this);
    }

    /**
     * Get Command
     *
     * Get a command from this guild
     *
     * @param command The command to get
     *
     * @returns {Promise<Command>} The command
     */
    getCommand(command: CommandResolvable): Promise<Command | undefined> {
        return this.client.getGuildCommand(this, command);
    }

    /**
     * Get Command Permissions
     *
     * Get the permissions of a command in this guild
     *
     * @param command The command to get the permissions for
     *
     * @returns {Promise<CommandPermissions>} The command permissions
     */
    getCommandPermissions(command: CommandResolvable): Promise<CommandPermissions | undefined> {
        return this.client.getGuildCommandPermissions(this, command);
    }

    /**
     * Get Commands
     *
     * Get the commands in this guild
     *
     * @returns {Promise<Command[]>} The commands
     */
    getCommands(): Promise<Command[]> {
        return this.client.getGuildCommands(this);
    }

    /**
     * Get Emoji
     *
     * Get an emoji from this guild
     *
     * @param emoji The emoji to get
     *
     * @returns {Promise<Emoji>} The emoji
     */
    getEmoji(emoji: EmojiResolvable): Promise<Emoji | undefined> {
        return this.client.getGuildEmoji(this, emoji);
    }

    /**
     * Get Emojis
     *
     * Get this guild's emojis
     *
     * @returns {Promise<Emoji[]>} The emojis
     */
    getEmojis(): Promise<Emoji[]> {
        return this.client.listGuildEmojis(this);
    }

    /**
     * Get Invites
     *
     * Get this guild's invites
     *
     * @returns {Promise<Invite[]>} The invites
     */
    getInvites(): Promise<Invite[]> {
        return this.client.getGuildInvites(this);
    }

    /**
     * Get Member
     *
     * Get a member from this guild
     *
     * @param user The user resolvable for the member to get
     *
     * @returns {Promise<Member>} The member
     */
    getMember(user: UserResolvable): Promise<Member | undefined> {
        return this.client.getGuildMember(this, user);
    }

    /**
     * Get Members
     *
     * Get the members from this guild
     *
     * @param listGuildMembersData The data for getting the members
     *
     * @returns {Promise<Member[]>} The members
     */
    getMembers(listGuildMembersData?: ListGuildMembersData): Promise<Member[]> {
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
     * @returns {Promise<Role[]>} The guild's roles
     */
    getRoles(): Promise<Role[]> {
        return this.client.getGuildRoles(this);
    }

    /**
     * Get Templates
     *
     * Get this guild's templates
     *
     * @returns {Promise<Template[]>} The guild's templates
     */
    getTemplates(): Promise<Template[]> {
        return this.client.getGuildTemplates(this);
    }

    /**
     * Get Sticker
     *
     * Get a sticker from this guild
     *
     * @param sticker The sticker to get
     *
     * @returns {Promise<Sticker>} The sticker
     */
    getSticker(sticker: StickerResolvable): Promise<Sticker | undefined> {
        return this.client.getGuildSticker(this, sticker);
    }

    /**
     * Get Vanity URL
     *
     * Get this guild's vanity URL
     *
     * @returns {Promise<VanityInvite>} The vanity invite
     */
    getVanityURL(): Promise<VanityInvite | undefined> {
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
     * @returns {Promise<Webhook[]>} The guild's webhooks
     */
    getWebhooks(): Promise<Webhook[]> {
        return this.client.getGuildWebhooks(this);
    }

    /**
     * Get Widget Settings
     *
     * Get this guild's widget settings
     *
     * @returns {Promise<GuildWidget>} The guild widget
     */
    getWidgetSettings(): Promise<GuildWidget> {
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
     * @param reason The reason for modifing this guild
     *
     * @returns {Promise<Guild>} The modified guild
     */
    edit(modifyGuildData: ModifyGuildData, reason?: string): Promise<Guild> {
        return this.client.modifyGuild(this, modifyGuildData, reason);
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
     * @param reason The reason for modifying the emoji
     *
     * @returns {Promise<Emoji>} The modified emoji
     */
    editEmoji(emoji: EmojiResolvable, modifyGuildEmojiData: ModifyGuildEmojiData, reason?: string): Promise<Emoji> {
        return this.client.modifyGuildEmoji(this, emoji, modifyGuildEmojiData, reason);
    }

    /**
     * Edit Member
     *
     * Edit a member in this guild
     *
     * @param user The user resolvable for the member to modify
     * @param modifyGuildMemberData The data to modify the member
     * @param reason The reason for modifying the member
     *
     * @returns {Promise<Member>} The modified member
     */
    editMember(user: UserResolvable, modifyGuildMemberData: ModifyGuildMemberData, reason?: string): Promise<Member> {
        return this.client.modifyGuildMember(this, user, modifyGuildMemberData, reason);
    }

    /**
     * Edit Role
     *
     * Edit a role in this guild
     *
     * @param role The role to modify
     * @param modifyGuildRoleData The data to modify the role
     * @param reason The reason for modifying the role
     *
     * @returns {Promise<Role>} The modified role
     */
    editRole(role: RoleResolvable, modifyGuildRoleData: ModifyGuildRoleData, reason?: string): Promise<Role> {
        return this.client.modifyGuildRole(this, role, modifyGuildRoleData, reason);
    }

    /**
     * Edit Role Positions
     *
     * Edit the positions of roles in this guild
     *
     * @param modifyGuildRolePositionsData The data to modify the role positions
     *
     * @returns {Promise<Role[]>} The guild's roles
     */
    editRolePositions(modifyGuildRolePositionsData: ModifyGuildRolePositionsData[]): Promise<Role[]> {
        return this.client.modifyGuildRolePositions(this, modifyGuildRolePositionsData);
    }

    /**
     * Edit Sticker
     *
     * Edit a sticker in this guild
     *
     * @param sticker The sticker to modify
     * @param modifyGuildStickerData The data to modify the sticker
     * @param reason The reason for modifying the sticker
     *
     * @returns {Promise<Sticker>} The modified sticker
     */
    editSticker(sticker: StickerResolvable, modifyGuildStickerData: ModifyGuildStickerData, reason?: string): Promise<Sticker> {
        return this.client.modifyGuildSticker(this, sticker, modifyGuildStickerData, reason);
    }

    /**
     * Edit Template
     *
     * Edit a template in this guild
     *
     * @param template The template to modify
     * @param modifyGuildTemplateData The data to modify the template
     *
     * @returns {Promise<Template>} The modified template
     */
    editTemplate(template: TemplateResolvable, modifyGuildTemplateData: ModifyGuildTemplateData): Promise<Template> {
        return this.client.modifyGuildTemplate(this, template, modifyGuildTemplateData);
    }

    /**
     * Edit Welcome Screen
     *
     * Edit this guild's welcome screen
     *
     * @param modifyGuildWelcomeScreenData The data to modify the welcome screen
     *
     * @returns {Promise<WelcomeScreen>} The modified welcome screen
     */
    editWelcomeScreen(modifyGuildWelcomeScreenData: ModifyGuildWelcomeScreenData): Promise<WelcomeScreen> {
        return this.client.modifyGuildWelcomeScreen(this, modifyGuildWelcomeScreenData);
    }

    /**
     * Edit Guild Widget
     *
     * Edit this guild's widget
     *
     * @param modifyGuildWidgetData The data to modify the guild's widget
     *
     * @returns {Promise<GuildWidget>} The modified guild widget
     */
    editGuildWidget(modifyGuildWidgetData: ModifyGuildWidgetData): Promise<GuildWidget> {
        return this.client.modifyGuildWidget(this, modifyGuildWidgetData);
    }

    /**
     * Search Members
     *
     * Search the members in this guild by username or nickname
     *
     * @param searchGuildMembersData The data for searching the members
     *
     * @returns {Promise<Member[]>} The members
     */
    searchMembers(searchGuildMembersData: SearchGuildMembersData): Promise<Member[]> {
        return this.client.searchGuildMembers(this, searchGuildMembersData);
    }

    /**
     * Unban User
     *
     * Unban a user from this guild
     *
     * @param user The user to unban
     * @param reason The reason for unbanning the user
     */
    unbanUser(user: UserResolvable, reason?: string): Promise<void> {
        return this.client.removeGuildBan(this, user, reason);
    }

    /**
     * Kick Member
     *
     * Kick a user from this guild
     *
     * @param user The user resolvable for the member to kick
     * @param reason The reason for kicking the member
     */
    kickMember(user: UserResolvable, reason?: string): Promise<void> {
        return this.client.removeGuildMember(this, user, reason);
    }

    /**
     * Remove Role from Member
     *
     * Remove a role from a member in this guild
     *
     * @param user The user resolvable for the member to remove the role from
     * @param role The role to remove
     * @param reason The reason for removing the role
     */
    removeRoleFromMember(user: UserResolvable, role: RoleResolvable, reason?: string): Promise<void> {
        return this.client.removeGuildMemberRole(this, user, role, reason);
    }

    /**
     * Sync Template
     *
     * Sync a template in this guild
     *
     * @param template The template to sync
     *
     * @returns {Promise<Template>} The synced template
     */
    syncTemplate(template: TemplateResolvable): Promise<Template> {
        return this.client.syncGuildTemplate(this, template);
    }
}