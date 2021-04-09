import EventEmitter from "events";
import WebSocket from "ws";
import {
    AnyChannel,
    AnyChannelData,
    AnyGuildChannelData,
    AuditLogData,
    ACTIVITY_TYPE_COMPETING,
    ACTIVITY_TYPE_LISTENING,
    ACTIVITY_TYPE_PLAYING,
    ACTIVITY_TYPE_STREAMING,
    Ban,
    BanData,
    BanEventOptions,
    BulkDeleteMessagesData,
    CacheManager,
    CacheManagerInterface,
    CacheStrategies,
    Channel,
    ChannelEventOptions,
    ChannelPermissionData,
    ChannelPinsUpdateData,
    ChannelResolvable,
    ChannelUpdateEventOptions,
    ClientCacheStrategyData,
    Command,
    CommandData,
    CommandResolvable,
    CreateChannelInviteData,
    CreateCommandData,
    CreateDMData,
    CreateGuildBanData,
    CreateGuildChannelData,
    CreateGuildData,
    CreateGuildEmojiData,
    CreateGuildFromTemplateData,
    CreateGuildRoleData,
    CreateGuildTemplateData,
    CreateMessageData,
    CreateWebhookData,
    CurrentUserNickname,
    DMChannelData,
    EditChannelPermissionsData,
    EditCommandData,
    EditMessageData,
    Emoji,
    EmojiData,
    EmojiResolvable,
    EventOptions,
    FetchedData,
    FetchQueue,
    FollowedChannel,
    FollowNewsChannelData,
    GetChannelMessagesData,
    GetCurrentUserGuildsData,
    GetGuildAuditLogData,
    GetGuildData,
    GetInviteData,
    GetReactionsData,
    Guild,
    GuildBanAddData,
    GuildBanRemoveData,
    GuildCreateData,
    GuildData,
    GuildDeleteData,
    GuildEmojisUpdateData,
    GuildEmojisUpdateEventOptions,
    GuildEventOptions,
    GuildIntegrationsUpdateData,
    GuildMemberRemoveData,
    GuildMemberUpdateData,
    GuildPreview,
    GuildResolvable,
    GuildRoleDeleteData,
    GuildUpdateEventOptions,
    GuildUserCacheManager,
    GuildUserCacheManagerInterface,
    GuildWidget,
    GuildWidgetData,
    Invite,
    InviteData,
    InviteDeleteData,
    InviteEventOptions,
    InviteResolvable,
    ListGuildMembersData,
    Member,
    MemberData,
    MemberEventOptions,
    MemberUpdateEventOptions,
    Message,
    MessageData,
    MessageDeleteBulkData,
    MessageDeleteBulkEventOptions,
    MessageDeleteData,
    MessageEventOptions,
    MessageReactionAddData,
    MessageReactionRemoveAllData,
    MessageReactionRemoveData,
    MessageReactionRemoveEmojiData,
    MessageResolvable,
    MessageUpdateData,
    MessageUpdateEventOptions,
    ModifyChannelData,
    ModifyCurrentUserData,
    ModifyCurrentUserNicknameData,
    ModifyGuildChannelPositionsData,
    ModifyGuildData,
    ModifyGuildEmojiData,
    ModifyGuildMemberData,
    ModifyGuildRoleData,
    ModifyGuildRolePositionsData,
    ModifyGuildTemplateData,
    ModifyGuildWelcomeScreenData,
    ModifyGuildWidgetData,
    ModifyWebhookData,
    PartialGuild,
    PermissionsResolvable,
    Presence,
    PresenceData,
    PresenceUpdateEventOptions,
    ReactionEmojiResolvable,
    ReactionEventOptions,
    ReadyData,
    ReadyState,
    RequestOptions,
    Role,
    RoleData,
    RoleEventOptions,
    RolePermissionData,
    RoleResolvable,
    RoleUpdateEventOptions,
    READY_STATE_NONE,
    SearchGuildMembersData,
    Status,
    Template,
    TemplateData,
    TemplateResolvable,
    TypingStartData,
    TypingStartEventOptions,
    User,
    UserData,
    UserResolvable,
    UserUpdateEventOptions,
    VanityInvite,
    VanityInviteData,
    VoiceRegion,
    VoiceStateData,
    VoiceStateEventOptions,
    Webhook,
    WebhooksUpdateData,
    WebhooksUpdateEventOptions,
    WebhookData,
    WebhookResolvable,
    WelcomeScreen,
    WelcomeScreenData
} from "../../internal";
import addGuildMemberRole from "./apiMethods/addGuildMemberRole";
import addPinnedChannelMessage from "./apiMethods/addPinnedChannelMessage";
import bulkDeleteMessages from "./apiMethods/bulkDeleteMessages";
import bulkOverwriteGlobalCommands from "./apiMethods/bulkOverwriteGlobalCommands";
import bulkOverwriteGuildCommands from "./apiMethods/bulkOverwriteGuildCommands";
import createChannelInvite from "./apiMethods/createChannelInvite";
import createDM from "./apiMethods/createDM";
import createGlobalCommand from "./apiMethods/createGlobalCommand";
import createGuild from "./apiMethods/createGuild";
import createGuildBan from "./apiMethods/createGuildBan";
import createGuildChannel from "./apiMethods/createGuildChannel";
import createGuildCommand from "./apiMethods/createGuildCommand";
import createGuildEmoji from "./apiMethods/createGuildEmoji";
import createGuildFromTemplate from "./apiMethods/createGuildFromTemplate";
import createGuildRole from "./apiMethods/createGuildRole";
import createGuildTemplate from "./apiMethods/createGuildTemplate";
import createMessage from "./apiMethods/createMessage";
import createReaction from "./apiMethods/createReaction";
import createWebhook from "./apiMethods/createWebhook";
import crosspostMessage from "./apiMethods/crosspostMessage";
import deleteAllReactions from "./apiMethods/deleteAllReactions";
import deleteAllReactionsForEmoji from "./apiMethods/deleteAllReactionsForEmoji";
import deleteChannel from "./apiMethods/deleteChannel";
import deleteChannelPermission from "./apiMethods/deleteChannelPermission";
import deleteGlobalCommands from "./apiMethods/deleteGlobalCommand";
import deleteGuild from "./apiMethods/deleteGuild";
import deleteGuildCommand from "./apiMethods/deleteGuildCommand";
import deleteGuildEmoji from "./apiMethods/deleteGuildEmoji";
import deleteGuildRole from "./apiMethods/deleteGuildRole";
import deleteGuildTemplate from "./apiMethods/deleteGuildTemplate";
import deleteInvite from "./apiMethods/deleteInvite";
import deleteMessage from "./apiMethods/deleteMessage";
import deleteOwnReaction from "./apiMethods/deleteOwnReaction";
import deletePinnedChannelMessage from "./apiMethods/deletePinnedChannelMessage";
import deleteUserReaction from "./apiMethods/deleteUserReaction";
import deleteWebhook from "./apiMethods/deleteWebhook";
import editChannelPermissions from "./apiMethods/editChannelPermissions";
import editGlobalCommand from "./apiMethods/editGlobalCommand";
import editGuildCommand from "./apiMethods/editGuildCommand";
import editMessage from "./apiMethods/editMessage";
import followNewsChannel from "./apiMethods/followNewsChannel";
import getChannel from "./apiMethods/getChannel";
import getChannelInvites from "./apiMethods/getChannelInvites";
import getChannelMessage from "./apiMethods/getChannelMessage";
import getChannelMessages from "./apiMethods/getChannelMessages";
import getChannelWebhooks from "./apiMethods/getChannelWebhooks";
import getCurrentUser from "./apiMethods/getCurrentUser";
import getCurrentUserGuilds from "./apiMethods/getCurrentUserGuilds";
import getGlobalCommand from "./apiMethods/getGlobalCommand";
import getGlobalCommands from "./apiMethods/getGlobalCommands";
import getGuild from "./apiMethods/getGuild";
import getGuildAuditLog from "./apiMethods/getGuildAuditLog";
import getGuildBan from "./apiMethods/getGuildBan";
import getGuildBans from "./apiMethods/getGuildBans";
import getGuildChannels from "./apiMethods/getGuildChannels";
import getGuildCommand from "./apiMethods/getGuildCommand";
import getGuildCommands from "./apiMethods/getGuildCommands";
import getGuildEmoji from "./apiMethods/getGuildEmoji";
import getGuildInvites from "./apiMethods/getGuildInvites";
import getGuildMember from "./apiMethods/getGuildMember";
import getGuildPreview from "./apiMethods/getGuildPreview";
import getGuildRoles from "./apiMethods/getGuildRoles";
import getGuildTemplates from "./apiMethods/getGuildTemplates";
import getGuildVanityURL from "./apiMethods/getGuildVanityURL";
import getGuildVoiceRegions from "./apiMethods/getGuildVoiceRegions";
import getGuildWebhooks from "./apiMethods/getGuildWebhooks";
import getGuildWelcomeScreen from "./apiMethods/getGuildWelcomeScreen";
import getGuildWidgetSettings from "./apiMethods/getGuildWidgetSettings";
import getInvite from "./apiMethods/getInvite";
import getPinnedMessages from "./apiMethods/getPinnedMessages";
import getReactions from "./apiMethods/getReactions";
import getTemplate from "./apiMethods/getTemplate";
import getUser from "./apiMethods/getUser";
import getWebhook from "./apiMethods/getWebhook";
import leaveGuild from "./apiMethods/leaveGuild";
import listGuildEmojis from "./apiMethods/listGuildEmojis";
import listGuildMembers from "./apiMethods/listGuildMembers";
import listVoiceRegions from "./apiMethods/listVoiceRegions";
import modifyChannel from "./apiMethods/modifyChannel";
import modifyCurrentUser from "./apiMethods/modifyCurrentUser";
import modifyCurrentUserNickname from "./apiMethods/modifyCurrentUserNickname";
import modifyGuild from "./apiMethods/modifyGuild";
import modifyGuildChannelPositions from "./apiMethods/modifyGuildChannelPositions";
import modifyGuildEmoji from "./apiMethods/modifyGuildEmoji";
import modifyGuildMember from "./apiMethods/modifyGuildMember";
import modifyGuildRole from "./apiMethods/modifyGuildRole";
import modifyGuildRolePositions from "./apiMethods/modifyGuildRolePositions";
import modifyGuildTemplate from "./apiMethods/modifyGuildTemplate";
import modifyGuildWelcomeScreen from "./apiMethods/modifyGuildWelcomeScreen";
import modifyGuildWidget from "./apiMethods/modifyGuildWidget";
import modifyWebhook from "./apiMethods/modifyWebhook";
import removeGuildBan from "./apiMethods/removeGuildBan";
import removeGuildMember from "./apiMethods/removeGuildMember";
import removeGuildMemberRole from "./apiMethods/removeGuildMemberRole";
import searchGuildMembers from "./apiMethods/searchGuildMembers";
import syncGuildTemplate from "./apiMethods/syncGuildTemplate";
import triggerTypingIndicator from "./apiMethods/triggerTypingIndicator";
import canManageMember from "./canManageMember";
import canManageRoles from "./canManageRoles";
import connect from "./connect";
import fetch from "./fetch";
import garbageCollect from "./garbageCollect";
import getFetchQueue from "./getFetchQueue";
import hasPermission from "./hasPermission";

/**
 * Client Data
 *
 * Data to create a `Client`
 */
export interface ClientData {

    /**
     * Token
     *
     * The bot's token
     */
    token: string;

    /**
     * Presence
     *
     * The bot's presence
     */
    presence?: ClientPresence;

    /**
     * Members Intent
     *
     * Whether or not to use the members intent
     */
    membersIntent?: boolean;

    /**
     * Presences Intent
     *
     * Whether or not to use the presences intent
     */
    presencesIntent?: boolean;

    /**
     * Cache Strategies
     *
     * How the client should cache objects
     */
    cacheStrategies?: ClientCacheStrategyData;
}

/**
 * Client Presence
 *
 * The client's presence
 */
export interface ClientPresence {

    /**
     * Status
     *
     * The client's status
     */
    status?: ClientStatus;

    /**
     * AFK
     *
     * Whether or not the presence should be marked as AFK
     */
    afk?: boolean;

    /**
     * Activities
     *
     * The client's activities
     */
    activities?: ClientActivity[];

    /**
     * Since
     *
     * The timestamp in milliseconds for when the client went idle
     */
    since?: number;
}

/**
 * Client Status
 *
 * The statuses a client can have, ie. online, idle, dnd, etc.
 */
export type ClientStatus = Status | "invisible";

/**
 * Client Activity
 *
 * The client's activity
 */
export interface ClientActivity {

    /**
     * Name
     *
     * The activity's name
     */
    name: string;

    /**
     * Type
     *
     * The type of activity
     */
    type: ClientActivityType;

    /**
     * URL
     *
     * The activity's Twitch URL
     */
    url?: string;
}

/**
 * Client Activity Type
 *
 * The types of client activities
 */
export type ClientActivityType = typeof ACTIVITY_TYPE_PLAYING | typeof ACTIVITY_TYPE_STREAMING | typeof ACTIVITY_TYPE_LISTENING | typeof ACTIVITY_TYPE_COMPETING;

/**
 * Event Queue Event
 *
 * A queued event
 */
export interface EventQueueEvent {

    /**
     * Type
     *
     * The event's type
     */
    type: string;

    /**
     * Data
     *
     * The event's data
     */
    data: any;
}

/**
 * Unemitted Ready Data
 *
 * The data for the `ready` event
 */
export interface UnemittedReadyData {
    data: ReadyData;
    rawData: any;
}

/**
 * Client
 *
 * The events the client emits
 */
export default interface Client {

    /**
     * Ready
     *
     * Emitted when the client is ready
     * The client shouldn't attempt to make requests to the API until this event is emitted
     */
    on(event: "ready", listener: (data: ReadyData, options: EventOptions) => void): this;

    /**
     * Channel Create
     *
     * Emitted when a channel is created
     */
    on(event: "channelCreate", listener: (channelData: AnyChannelData, options: ChannelEventOptions) => void): this;

    /**
     * Channel Delete
     *
     * Emitted when a channel is deleted
     */
    on(event: "channelDelete", listener: (channelData: AnyChannelData, options: ChannelEventOptions) => void): this;

    /**
     * Channel Pins Update
     *
     * Emitted when a channel's pins are updated
     */
    on(event: "channelPinsUpdate", listener: (data: ChannelPinsUpdateData, options: ChannelEventOptions) => void): this;

    /**
     * Channel Update
     *
     * Emitted when a channel is updated
     */
    on(event: "channelUpdate", listener: (channelData: AnyChannelData, options: ChannelUpdateEventOptions) => void): this;

    /**
     * Guild Available
     *
     * Emitted when a guild becomes available
     */
    on(event: "guildAvailable", listener: (data: GuildCreateData, options: GuildEventOptions) => void): this;

    /**
     * Guild Ban Add
     *
     * Emitted when a user is banned from a guild
     */
    on(event: "guildBanAdd", listener: (data: GuildBanAddData, options: BanEventOptions) => void): this;

    /**
     * Guild Ban Remove
     *
     * Emitted when a user is unbanned from a guild
     */
    on(event: "guildBanRemove", listener: (data: GuildBanRemoveData, options: BanEventOptions) => void): this;

    /**
     * Guild Create
     *
     * Emitted when the client joins a new guild
     */
    on(event: "guildCreate", listener: (data: GuildCreateData, options: GuildEventOptions) => void): this;

    /**
     * Guild Delete
     *
     * Emitted when the client is removed from a guild
     */
    on(event: "guildDelete", listener: (data: GuildDeleteData, options: GuildEventOptions) => void): this;

    /**
     * Guild Emojis Update
     *
     * Emitted when a guild's emojis are updated
     */
    on(event: "guildEmojisUpdate", listener: (data: GuildEmojisUpdateData, options: GuildEmojisUpdateEventOptions) => void): this;

    /**
     * Guild Integrations Update
     *
     * Emitted when a guild's integrations are updated
     */
    on(event: "guildIntegrationsUpdate", listener: (data: GuildIntegrationsUpdateData, options: GuildEventOptions) => void): this;

    /**
     * Guild Member Add
     *
     * Emitted when a user joins a guild
     */
    on(event: "guildMemberAdd", listener: (memberData: MemberData, options: MemberEventOptions) => void): this;

    /**
     * Guild Member Remove
     *
     * Emitted when a member leaves a guild or gets kicked from a guild
     */
    on(event: "guildMemberRemove", listener: (data: GuildMemberRemoveData, options: MemberEventOptions) => void): this;

    /**
     * Guild Member Update
     *
     * Emitted when a guild member is updated
     */
    on(event: "guildMemberUpdate", listener: (data: GuildMemberUpdateData, options: MemberUpdateEventOptions) => void): this;

    /**
     * Guild Role Create
     *
     * Emitted when a role is created
     */
    on(event: "guildRoleCreate", listener: (roleData: RoleData, options: RoleEventOptions) => void): this;

    /**
     * Guild Role Delete
     *
     * Emitted when a role is deleted
     */
    on(event: "guildRoleDelete", listener: (data: GuildRoleDeleteData, options: RoleEventOptions) => void): this;

    /**
     * Guild Role Update
     *
     * Emitted when a role is updated
     */
    on(event: "guildRoleUpdate", listener: (roleData: RoleData, options: RoleUpdateEventOptions) => void): this;

    /**
     * Guild Unavailable
     *
     * Emitted when a guild becomes unavailable
     */
    on(event: "guildUnavailable", listener: (data: GuildDeleteData, options: GuildEventOptions) => void): this;

    /**
     * Guild Update
     *
     * Emitted when a guild is updated
     */
    on(event: "guildUpdate", listener: (guildData: GuildData, options: GuildUpdateEventOptions) => void): this;

    /**
     * Invite Create
     *
     * Emitted when an invite is created
     */
    on(event: "inviteCreate", listener: (inviteData: InviteData, options: InviteEventOptions) => void): this;

    /**
     * Invite Delete
     *
     * Emitted when an invite is deleted
     */
    on(event: "inviteDelete", listener: (data: InviteDeleteData, options: InviteEventOptions) => void): this;

    /**
     * Message Create
     *
     * Emitted when a message is created
     */
    on(event: "messageCreate", listener: (messageData: MessageData, options: MessageEventOptions) => void): this;

    /**
     * Message Delete
     *
     * Emitted when a message is deleted
     */
    on(event: "messageDelete", listener: (data: MessageDeleteData, options: MessageEventOptions) => void): this;

    /**
     * Message Delete Bulk
     *
     * Emitted when messages are bulk deleted
     */
    on(event: "messageDeleteBulk", listener: (data: MessageDeleteBulkData, options: MessageDeleteBulkEventOptions) => void): this;

    /**
     * Message Reaction Add
     *
     * Emitted when a reaction is added
     */
    on(event: "messageReactionAdd", listener: (data: MessageReactionAddData, options: ReactionEventOptions) => void): this;

    /**
     * Message Reaction Remove
     *
     * Emitted when a reaction is removed
     */
    on(event: "messageReactionRemove", listener: (data: MessageReactionRemoveData, options: ReactionEventOptions) => void): this;

    /**
     * Message Reaction Remove All
     *
     * Emitted when all the reactions on a message are removed
     */
    on(event: "messageReactionRemoveAll", listener: (data: MessageReactionRemoveAllData, options: MessageEventOptions) => void): this;

    /**
     * Message Reaction Remove Emoji
     *
     * Emitted when all the reactions on a message for a specific emoji are removed
     */
    on(event: "messageReactionRemoveEmoji", listener: (data: MessageReactionRemoveEmojiData, options: MessageEventOptions) => void): this;

    /**
     * Message Update
     *
     * Emitted when a message is updated
     */
    on(event: "messageUpdate", listener: (data: MessageUpdateData, options: MessageUpdateEventOptions) => void): this;

    /**
     * Presence Update
     *
     * Emitted when a presence is updated
     */
    on(event: "presenceUpdate", listener: (presenceData: PresenceData, options: PresenceUpdateEventOptions) => void): this;

    /**
     * Typing Start
     *
     * Emitted when a user starts typing in a channel
     */
    on(event: "typingStart", listener: (data: TypingStartData, options: TypingStartEventOptions) => void): this;

    /**
     * User Update
     *
     * Emitted when a user is updated
     */
    on(event: "userUpdate", listener: (userData: UserData, options: UserUpdateEventOptions) => void): this;

    /**
     * Voice State Update
     *
     * Emitted when a voice state is updated
     */
    on(event: "voiceStateUpdate", listener: (voiceStateData: VoiceStateData, options: VoiceStateEventOptions) => void): this;

    /**
     * Webhooks Update
     *
     * Emitted when a channel's webhooks are updated
     */
    on(event: "webhooksUpdate", listener: (data: WebhooksUpdateData, options: WebhooksUpdateEventOptions) => void): this;
}

export default class Client extends EventEmitter {

    /**
     * ID
     *
     * The client's ID
     */
    id: string;

    /**
     * Username
     *
     * The client's username
     */
    username: string;

    /**
     * Discriminator
     *
     * The client's discriminator
     */
    discriminator: string;

    /**
     * Tag
     *
     * The client's tag
     */
    get tag(): string {
        return `${this.username}#${this.discriminator}`;
    }

    /**
     * Avatar
     *
     * The client's avatar hash
     */
    avatar: string | null;

    /**
     * Session ID
     *
     * The session ID
     */
    _sessionID?: string;

    /**
     * Sequence
     *
     * The sequence number
     */
    _sequence?: number;

    /**
     * Token
     *
     * The client's token
     */
    token: string;

    /**
     * Websocket
     *
     * The client's websocket
     */
    _ws: WebSocket;

    /**
     * Ready State
     *
     * Whether or not the client is ready to process events
     */
    _readyState: ReadyState;

    /**
     * Ready Data
     *
     * The data for the `ready` event, generated by `events/ready/ready.ts`, and emitted by `events/ready.ts` after all initial guilds are loaded in
     */
    _readyData?: UnemittedReadyData;

    /**
     * Event Queue
     *
     * A queue of events that were sent before the client was ready
     */
    _eventQueue: EventQueueEvent[];

    /**
     * Uninitialized Guilds
     *
     * An array of IDs for guilds that are uninitialized
     * This will be all the guilds the bot is in as sent by the `READY` event that haven't also been sent by the `GUILD_CREATE` event
     */
    _uninitializedGuilds: Set<string>;

    /**
     * Unavailable Guilds
     *
     * An array of IDs for guilds that are unavailable
     */
    _unavailableGuilds: Set<string>;

    /**
     * Ping
     *
     * The client's ping
     */
    ping: number;

    /**
     * Last Ping Timestamp
     *
     * The last timestamp a ping was sent
     */
    _lastPingTimestamp: number;

    /**
     * Ping Interval
     *
     * The result from `setInterval` for pings
     */
    _pingInterval: NodeJS.Timeout;

    /**
     * Heartbeat Interval
     *
     * The result from `setInterval` for heartbeats
     */
    _heartbeatInterval: NodeJS.Timeout;

    /**
     * Heartbeat Acked
     *
     * Whether or not the last heartbeat has been acknowledged
     */
    _heartbeatAcked: boolean;

    /**
     * Initial Presence
     *
     * The bot's initial presence
     */
    _initialPresence?: ClientPresence;

    /**
     * Members Intent
     *
     * Whether or not the bot needs the members intent
     */
    _membersIntent: boolean;

    /**
     * Presences Intent
     *
     * Whether or not the bot needs the presences intent
     */
    _presencesIntent: boolean;

    /**
     * Fetch Queues
     *
     * Queues for fetching data from the API
     */
    _fetchQueues: Map<string, FetchQueue>;

    /**
     * Cache Strategies
     *
     * How objects should be cached
     */
    _cacheStrategies: CacheStrategies;

    /**
     * Guild Owners
     *
     * A map of guild IDs to the guild's owner's IDs
     */
    _guildOwners?: Map<string, string>;

    /**
     * Guild Roles
     *
     * A map of guild IDs to an array of the guild's role IDs
     */
    _guildRoles?: Map<string, string[]>;

    /**
     * Guild Channels
     *
     * A map of guild IDs to an array of the guild's channel IDs
     */
    _guildChannels?: Map<string, string[]>;

    /**
     * Guild Emojis
     *
     * A map of guild IDs to an array of the guild's emoji IDs
     */
    _guildEmojis?: Map<string, string[]>;

    /**
     * Role Permissions
     *
     * A map of role IDs to their permission data
     */
    _rolePermissions?: Map<string, RolePermissionData>;

    /**
     * Channel Permissions
     *
     * A map of channel IDs to their permission data
     */
    _channelPermissions?: Map<string, ChannelPermissionData>;

    /**
     * Client Roles
     *
     * A map of guild IDs to an array of the client's roles' IDs in that guild
     */
    _clientRoles?: Map<string, string[]>;

    /**
     * Emoji Guilds
     *
     * A map of emoji IDs to the ID of the guild the emoji is in
     */
    _emojiGuilds?: Map<string, string>;

    /**
     * Commands
     *
     * The internal cache of commands
     */
    _commands: CacheManager<Command>;

    /**
     * Bans
     *
     * The internal cache of bans
     */
    _bans: GuildUserCacheManager<Ban>;

    /**
     * Channels
     *
     * The internal cache of channels
     */
    _channels: CacheManager<AnyChannel>;

    /**
     * Emojis
     *
     * The internal cache of emojis
     */
    _emojis: CacheManager<Emoji>;

    /**
     * Guilds
     *
     * The internal cache of guilds
     */
    _guilds: CacheManager<Guild>;

    /**
     * Guild Widgets
     *
     * The internal cache of guild widgets
     */
    _guildWidgets: CacheManager<GuildWidget>;

    /**
     * Invites
     *
     * The internal cache of invites
     */
    _invites: CacheManager<Invite>;

    /**
     * Members
     *
     * The internal cache of members
     */
    _members: GuildUserCacheManager<Member>;

    /**
     * Messages
     *
     * The internal cache of messages
     */
    _messages: CacheManager<Message>;

    /**
     * Presences
     *
     * The internal cache of presences
     */
    _presences: CacheManager<Presence>;

    /**
     * Roles
     *
     * The internal cache of roles
     */
    _roles: CacheManager<Role>;

    /**
     * Templates
     *
     * The internal cache of templates
     */
    _templates: CacheManager<Template>;

    /**
     * Vanity Invites
     *
     * The internal cache of vanity invites
     */
    _vanityInvites: CacheManager<VanityInvite>;

    /**
     * Webhooks
     *
     * The internal cache of webhooks
     */
    _webhooks: CacheManager<Webhook>;

    /**
     * Welcome Screens
     *
     * The internal cache of welcome screens
     */
    _welcomeScreens: CacheManager<WelcomeScreen>;

    /**
     * Users
     *
     * The internal cache of users
     */
    _users: CacheManager<User>;

    /**
     * Commands
     *
     * The cache of commands
     */
    commands: CacheManagerInterface<Command, false>;

    /**
     * Bans
     *
     * The cache of bans
     */
    bans: GuildUserCacheManagerInterface<Ban>;

    /**
     * Channels
     *
     * The cache of channels
     */
    channels: CacheManagerInterface<AnyChannel>;

    /**
     * Emojis
     *
     * The cache of emojis
     */
    emojis: CacheManagerInterface<Emoji, false>;

    /**
     * Guilds
     *
     * The cache of guilds
     */
    guilds: CacheManagerInterface<Guild>;

    /**
     * Guild Widgets
     *
     * The cache of guild widgets
     */
    guildWidgets: CacheManagerInterface<GuildWidget>;

    /**
     * Invites
     *
     * The cache of invites
     */
    invites: CacheManagerInterface<Invite>;

    /**
     * Members
     *
     * The cache of members
     */
    members: GuildUserCacheManagerInterface<Member>;

    /**
     * Messages
     *
     * The cache of messages
     */
    messages: CacheManagerInterface<Message, false>;

    /**
     * Presences
     *
     * The cache of presences
     */
    presences: CacheManagerInterface<Presence, false>;

    /**
     * Roles
     *
     * The cache of roles
     */
    roles: CacheManagerInterface<Role, false>;

    /**
     * Templates
     *
     * The cache of templates
     */
    templates: CacheManagerInterface<Template>;

    /**
     * Vanity Invites
     *
     * The cache of vanity invites
     */
    vanityInvites: CacheManagerInterface<VanityInvite>;

    /**
     * Webhooks
     *
     * The cache of webhooks
     */
    webhooks: CacheManagerInterface<Webhook, false>;

    /**
     * Welcome Screens
     *
     * The cache of welcome screens
     */
    welcomeScreens: CacheManagerInterface<WelcomeScreen>;

    /**
     * Users
     *
     * The cache of users
     */
    users: CacheManagerInterface<User>;

    /**
     * Client
     *
     * @param clientData Options to initialize this client with
     * @param clientData.token The client's token
     */
    constructor(clientData: ClientData) {

        // Super
        super();

        // Set data
        this.token = clientData.token;
        this._readyState = READY_STATE_NONE;
        this._eventQueue = [];
        this._uninitializedGuilds = new Set();
        this._unavailableGuilds = new Set();
        this._heartbeatAcked = true;
        this._initialPresence = clientData.presence;
        this._membersIntent = Boolean(clientData.membersIntent);
        this._presencesIntent = Boolean(clientData.presencesIntent);
        this._fetchQueues = new Map();
        this._cacheStrategies = {
            objects: clientData.cacheStrategies?.objects || {},
            permissions: {
                enabled: clientData.cacheStrategies?.permissions?.enabled === undefined ? true : clientData.cacheStrategies.permissions.enabled,
                externalEmojis: Boolean(clientData.cacheStrategies?.permissions?.externalEmojis)
            }
        };
        if (this._cacheStrategies.permissions.enabled === undefined) this._cacheStrategies.permissions.enabled = true;
        this._cacheStrategies.permissions.externalEmojis = Boolean(this._cacheStrategies.permissions.externalEmojis);
        if (this._cacheStrategies.permissions.enabled) {
            this._guildOwners = new Map();
            this._guildRoles = new Map();
            this._guildChannels = new Map();
            this._rolePermissions = new Map();
            this._channelPermissions = new Map();
            this._clientRoles = new Map();
        }
        if (this._cacheStrategies.permissions.externalEmojis) {
            this._guildEmojis = new Map();
            this._emojiGuilds = new Map();
        }
        this._commands = new CacheManager<Command>(this, CacheManager.parseCacheStrategy(this._cacheStrategies.objects.commands));
        this._bans = new GuildUserCacheManager<Ban>(this, CacheManager.parseCacheStrategy(this._cacheStrategies.objects.bans));
        this._channels = new CacheManager<AnyChannel>(this, CacheManager.parseCacheStrategy(this._cacheStrategies.objects.channels));
        this._emojis = new CacheManager<Emoji>(this, CacheManager.parseCacheStrategy(this._cacheStrategies.objects.emojis));
        this._guilds = new CacheManager<Guild>(this, CacheManager.parseCacheStrategy(this._cacheStrategies.objects.guilds));
        this._guildWidgets = new CacheManager<GuildWidget>(this, CacheManager.parseCacheStrategy(this._cacheStrategies.objects.guildWidgets));
        this._invites = new CacheManager<Invite>(this, CacheManager.parseCacheStrategy(this._cacheStrategies.objects.invites));
        this._members = new GuildUserCacheManager<Member>(this, CacheManager.parseCacheStrategy(this._cacheStrategies.objects.members));
        this._messages = new CacheManager<Message>(this, CacheManager.parseCacheStrategy(this._cacheStrategies.objects.messages));
        this._presences = new CacheManager<Presence>(this, CacheManager.parseCacheStrategy(this._cacheStrategies.objects.presences));
        this._roles = new CacheManager<Role>(this, CacheManager.parseCacheStrategy(this._cacheStrategies.objects.roles));
        this._templates = new CacheManager<Template>(this, CacheManager.parseCacheStrategy(this._cacheStrategies.objects.templates));
        this._vanityInvites = new CacheManager<VanityInvite>(this, CacheManager.parseCacheStrategy(this._cacheStrategies.objects.vanityInvites));
        this._webhooks = new CacheManager<Webhook>(this, CacheManager.parseCacheStrategy(this._cacheStrategies.objects.webhooks));
        this._welcomeScreens = new CacheManager<WelcomeScreen>(this, CacheManager.parseCacheStrategy(this._cacheStrategies.objects.welcomeScreens));
        this._users = new CacheManager<User>(this, CacheManager.parseCacheStrategy(this._cacheStrategies.objects.users));
        this.commands = new CacheManagerInterface<Command, false>(this, {
            cacheManager: this._commands
        });
        this.bans = new GuildUserCacheManagerInterface<Ban>(this, {
            cacheManager: this._bans._cacheManager,
            fetchObject: async (id: string): Promise<Ban> => Ban.fromData(this, await this.getGuildBan(id.split("_")[0], id.split("_")[1]))
        });
        this.channels = new CacheManagerInterface<AnyChannel>(this, {
            cacheManager: this._channels,
            fetchObject: async (id: string): Promise<AnyChannel> => Channel.fromData(this, await this.getChannel(id))
        });
        this.emojis = new CacheManagerInterface<Emoji, false>(this, {
            cacheManager: this._emojis
        });
        this.guilds = new CacheManagerInterface<Guild>(this, {
            cacheManager: this._guilds,
            fetchObject: async (id: string): Promise<Guild> => Guild.fromData(this, await this.getGuild(id))
        });
        this.guildWidgets = new CacheManagerInterface<GuildWidget>(this, {
            cacheManager: this._guildWidgets,
            fetchObject: async (id: string): Promise<GuildWidget> => GuildWidget.fromData(this, await this.getGuildWidgetSettings(id))
        });
        this.invites = new CacheManagerInterface<Invite>(this, {
            cacheManager: this._invites,
            fetchObject: async (id: string): Promise<Invite> => Invite.fromData(this, await this.getInvite(id))
        });
        this.members = new GuildUserCacheManagerInterface<Member>(this, {
            cacheManager: this._members._cacheManager,
            fetchObject: async (id: string): Promise<Member> => Member.fromData(this, await this.getGuildMember(id.split("_")[0], id.split("_")[1]))
        });
        this.messages = new CacheManagerInterface<Message, false>(this, {
            cacheManager: this._messages
        });
        this.presences = new CacheManagerInterface<Presence, false>(this, {
            cacheManager: this._presences
        });
        this.roles = new CacheManagerInterface<Role, false>(this, {
            cacheManager: this._roles
        });
        this.templates = new CacheManagerInterface<Template>(this, {
            cacheManager: this._templates,
            fetchObject: async (id: string): Promise<Template> => Template.fromData(this, await this.getTemplate(id))
        });
        this.vanityInvites = new CacheManagerInterface<VanityInvite>(this, {
            cacheManager: this._vanityInvites,
            fetchObject: async (id: string): Promise<VanityInvite> => VanityInvite.fromData(this, await this.getGuildVanityURL(id))
        });
        this.webhooks = new CacheManagerInterface<Webhook, false>(this, {
            cacheManager: this._webhooks
        });
        this.welcomeScreens = new CacheManagerInterface<WelcomeScreen>(this, {
            cacheManager: this._welcomeScreens,
            fetchObject: async (id: string): Promise<WelcomeScreen> => {

                // Get welcome screen data
                const welcomeScreenData: WelcomeScreenData | null = (await this.guilds.get(id, true)).welcomeScreen;
                if (!welcomeScreenData) throw new Error("Couldn't find a welcome screen in that guild");

                // Return
                return WelcomeScreen.fromData(this, welcomeScreenData);
            }
        });
        this.users = new CacheManagerInterface<User>(this, {
            cacheManager: this._users,
            fetchObject: async (id: string): Promise<User> => User.fromData(this, await this.getUser(id))
        });

        // Connect
        this._connect();

        // Garbage collection interval
        setInterval(() => this._garbageCollect(), 30000);
    }

    /**
     * Connect
     *
     * Connect to the gateway
     */
    _connect() {
        connect(this);
    }

    /**
     * Garbage Collect
     *
     * Garbage collect the client's properties
     */
    _garbageCollect() {
        garbageCollect(this);
    }

    /**
     * Has Permission
     *
     * Check if the client has a permission
     *
     * @param permission The permission
     * @param guildOrChannel The guild or channel to check the permissions in
     *
     * @returns {boolean} Whether or not the client has the permission
     */
    hasPermission(permission: PermissionsResolvable, guildOrChannel: string): boolean {
        return hasPermission(this, permission, guildOrChannel);
    }

    /**
     * Can Manage Roles
     *
     * Check if the client has permissions to manage roles
     *
     * @param guild The guild the roles are in
     * @param roles The roles
     *
     * @returns {boolean} Whether or not the client has permissions to manage the role
     */
    canManageRoles(guild: GuildResolvable, roles: RoleResolvable | RoleResolvable[]): boolean {
        return canManageRoles(this, guild, roles);
    }

    /**
     * Can Manage Member
     *
     * Check if the client has permissions to manage a member
     *
     * @param member The member
     *
     * @returns {boolean} Whether or not the client has permissions to manage the member
     */
    canManageMember(member: Member): boolean {
        return canManageMember(this, member);
    }

    /**
     * Fetch
     *
     * Fetch data from the API
     *
     * @param requestOptions The options for the request
     * @param requestOptions.path The path for the request
     * @param requestOptions.method The method for the request
     * @param requestOptions.contentType The `Content-Type` header for the request
     * @param requestOptions.body The body for the request
     *
     * @returns {Promise<FetchedData>} The fetched data
     */
    fetch(requestOptions: RequestOptions): Promise<FetchedData> {
        return fetch(this, requestOptions);
    }

    /**
     * Get Fetch Queue
     *
     * Get a fetch queue for a route, and create one if it doesn't already exist
     *
     * @param route The route for the fetch queue
     *
     * @returns {FetchQueue} The fetch queue
     */
    _getFetchQueue(route: string): FetchQueue {
        return getFetchQueue(this, route);
    }

    /**
     * Add Guild Member Role
     *
     * Add a role to a member
     *
     * @param guild The guild to add the role in
     * @param user The user resolvable for the member to add the role to
     * @param role The role to add
     */
    addGuildMemberRole(guild: GuildResolvable, user: UserResolvable, role: RoleResolvable): Promise<void> {
        return addGuildMemberRole(this, guild, user, role);
    }

    /**
     * Add Pinned Channel Message
     *
     * Pin a message to a channel
     *
     * @param channel The channel to pin the messages in
     * @param message The message to pin
     */
    addPinnedChannelMessage(channel: ChannelResolvable, message: MessageResolvable): Promise<void> {
        return addPinnedChannelMessage(this, channel, message);
    }

    /**
     * Bulk Delete Messages
     *
     * Bulk delete messages
     *
     * @param channel The channel to delete the messages in
     * @param bulkDeleteMessagesData The data for bulk deleting messages
     */
    bulkDeleteMessages(channel: ChannelResolvable, bulkDeleteMessagesData: BulkDeleteMessagesData): Promise<void> {
        return bulkDeleteMessages(this, channel, bulkDeleteMessagesData);
    }

    /**
     * Bulk Overwrite Global Commands
     *
     * Bulk edit global commands
     *
     * @param editCommandData The data for the commands
     *
     * @returns {Promise<CommandData[]>} The commands
     */
    bulkOverwriteGlobalCommands(editCommandData: EditCommandData[]): Promise<CommandData[]> {
        return bulkOverwriteGlobalCommands(this, editCommandData);
    }

    /**
     * Bulk Overwrite Guild Commands
     *
     * Bulk edit guild commands
     *
     * @param guild The guild to edit the commands in
     * @param editCommandData The data for the commands
     *
     * @returns {Promise<CommandData[]>} The commands
     */
    bulkOverwriteGuildCommands(guild: GuildResolvable, editCommandData: EditCommandData[]): Promise<CommandData[]> {
        return bulkOverwriteGuildCommands(this, guild, editCommandData);
    }

    /**
     * Create Channel Invite
     *
     * Create an invite
     *
     * @param channel The channel to create an invite in
     * @param createChannelInviteData The data for the invite
     *
     * @returns {Promise<InviteData>} The invite data
     */
    createChannelInvite(channel: ChannelResolvable, createChannelInviteData?: CreateChannelInviteData): Promise<InviteData> {
        return createChannelInvite(this, channel, createChannelInviteData);
    }

    /**
     * Create DM
     *
     * Create a DM
     *
     * @param createDMData The data for the DM
     *
     * @returns {Promise<DMChannelData>} The DM channel data
     */
    createDM(createDMData: CreateDMData): Promise<DMChannelData> {
        return createDM(this, createDMData);
    }

    /**
     * Create Global Command
     *
     * Create a global command
     *
     * @param createCommandData The data for the command
     *
     * @returns {Promise<CommandData>} The command data
     */
    createGlobalCommand(createCommandData: CreateCommandData): Promise<CommandData> {
        return createGlobalCommand(this, createCommandData);
    }

    /**
     * Create Guild Command
     *
     * Create a guild command
     *
     * @param guild The guild to create the command in
     * @param createCommandData The data for the command
     *
     * @returns {Promise<CommandData>} The command data
     */
    createGuildCommand(guild: GuildResolvable, createCommandData: CreateCommandData): Promise<CommandData> {
        return createGuildCommand(this, guild, createCommandData);
    }

    /**
     * Create Guild
     *
     * Create a guild
     *
     * @param createGuildData The data for the guild
     *
     * @returns {Promise<GuildData>} The created guild's data
     */
    createGuild(createGuildData: CreateGuildData): Promise<GuildData> {
        return createGuild(this, createGuildData);
    }

    /**
     * Create Guild Ban
     *
     * Ban a user from a guild
     *
     * @param guild The guild to ban the user from
     * @param user The user to ban
     * @param createGuildBanData The data for the ban
     */
    createGuildBan(guild: GuildResolvable, user: UserResolvable, createGuildBanData?: CreateGuildBanData): Promise<void> {
        return createGuildBan(this, guild, user, createGuildBanData);
    }

    /**
     * Create Guild Channel
     *
     * Create a channel in a guild
     *
     * @param guild The guild to create a channel in
     * @param createGuildChannelData The data for the channel
     *
     * @returns {Promise<AnyGuildChannelData>} The created channel's data
     */
    createGuildChannel(guild: GuildResolvable, createGuildChannelData: CreateGuildChannelData): Promise<AnyGuildChannelData> {
        return createGuildChannel(this, guild, createGuildChannelData);
    }

    /**
     * Create Guild Emoji
     *
     * Create an emoji
     *
     * @param guild The guild to create an emoji in
     * @param createGuildEmojiData The data for the emoji
     *
     * @returns {Promise<EmojiData>} The created emoji's data
     */
    createGuildEmoji(guild: GuildResolvable, createGuildEmojiData: CreateGuildEmojiData): Promise<EmojiData> {
        return createGuildEmoji(this, guild, createGuildEmojiData);
    }

    /**
     * Create Guild From Template
     *
     * Create a guild from a template
     *
     * @param template The template to create the guild from
     * @param createGuildFromTemplateData The data for the guild
     *
     * @returns {Promise<GuildData>} The created guild's data
     */
    createGuildFromTemplate(template: TemplateResolvable, createGuildFromTemplateData: CreateGuildFromTemplateData): Promise<GuildData> {
        return createGuildFromTemplate(this, template, createGuildFromTemplateData);
    }

    /**
     * Create Guild Role
     *
     * Create a role
     *
     * @param guild The guild to create a role in
     * @param createGuildRoleData The data for the role
     *
     * @returns {Promise<RoleData>} The created role's data
     */
    createGuildRole(guild: GuildResolvable, createGuildRoleData: CreateGuildRoleData): Promise<RoleData> {
        return createGuildRole(this, guild, createGuildRoleData);
    }

    /**
     * Create Guild Template
     *
     * Create a template
     *
     * @param guild The guild to create a template in
     * @param createGuildTemplateData The data for the template
     *
     * @returns {Promise<TemplateData>} The created template's data
     */
    createGuildTemplate(guild: GuildResolvable, createGuildTemplateData: CreateGuildTemplateData): Promise<TemplateData> {
        return createGuildTemplate(this, guild, createGuildTemplateData);
    }

    /**
     * Create Message
     *
     * Send a message to a channel
     *
     * @param channel The channel to send this message to
     * @param createMessageData The data for the message
     *
     * @returns {Promise<MessageData>} The created message's data
     */
    createMessage(channel: ChannelResolvable, createMessageData: CreateMessageData): Promise<MessageData> {
        return createMessage(this, channel, createMessageData);
    }

    /**
     * Create Reaction
     *
     * Add a reaction to a message
     *
     * @param channel The channel to create the reaction in
     * @param message The message to create the reaction on
     * @param reactionEmoji The emoji to react with
     */
    createReaction(channel: ChannelResolvable, message: MessageResolvable, reactionEmoji: ReactionEmojiResolvable): Promise<void> {
        return createReaction(this, channel, message, reactionEmoji);
    }

    /**
     * Create Webhook
     *
     * Create a webhook
     *
     * @param channel The channel to create a webhook in
     * @param createWebhookData The data for the webhook
     *
     * @returns {Promise<WebhookData>} The created webhook's data
     */
    createWebhook(channel: ChannelResolvable, createWebhookData: CreateWebhookData): Promise<WebhookData> {
        return createWebhook(this, channel, createWebhookData);
    }

    /**
     * Crosspost Message
     *
     * Publish a message in a news channel
     *
     * @param channel The channel to crosspost from
     * @param message The message to crosspost
     *
     * @returns {Promise<MessageData>} The crossposted message's data
     */
    crosspostMessage(channel: ChannelResolvable, message: MessageResolvable): Promise<MessageData> {
        return crosspostMessage(this, channel, message);
    }

    /**
     * Delete All Reactions
     *
     * Remove all reactions from a message
     *
     * @param channel The channel to delete the reactions in
     * @param message The message to delete the reactions from
     */
    deleteAllReactions(channel: ChannelResolvable, message: MessageResolvable): Promise<void> {
        return deleteAllReactions(this, channel, message);
    }

    /**
     * Delete All Reactions for Emoji
     *
     * Remove all reactions from a message for a specific emoji
     *
     * @param channel The channel to delete the reactions in
     * @param message The message to delete the reactions from
     * @param reactionEmoji The emoji to delete reactions for
     */
    deleteAllReactionsForEmoji(channel: ChannelResolvable, message: MessageResolvable, reactionEmoji: ReactionEmojiResolvable): Promise<void> {
        return deleteAllReactionsForEmoji(this, channel, message, reactionEmoji);
    }

    /**
     * Delete Channel
     *
     * Delete a guild channel or close a DM channel
     *
     * @param channel The channel to delete or close
     *
     * @returns {Promise<AnyChannelData>} The deleted or closed channel's data
     */
    deleteChannel(channel: ChannelResolvable): Promise<AnyChannelData> {
        return deleteChannel(this, channel);
    }

    /**
     * Delete Channel Permission
     *
     * Delete a permission from a channel
     *
     * @param channel The channel to delete the permission from
     * @param roleOrUser The role or user's permissions to delete
     */
    deleteChannelPermission(channel: ChannelResolvable, roleOrUser: RoleResolvable | UserResolvable): Promise<void> {
        return deleteChannelPermission(this, channel, roleOrUser);
    }

    /**
     * Delete Global Command
     *
     * Delete a global command
     *
     * @param command The command to delete
     */
    deleteGlobalCommand(command: CommandResolvable): Promise<void> {
        return deleteGlobalCommands(this, command);
    }

    /**
     * Delete Guild
     *
     * Delete a guild
     *
     * @param guild The guild to delete
     */
    deleteGuild(guild: GuildResolvable): Promise<void> {
        return deleteGuild(this, guild);
    }

    /**
     * Delete Guild Command
     *
     * Delete a guild command
     *
     * @param guild The guild to delete the command in
     * @param command The command to delete
     */
    deleteGuildCommand(guild: GuildResolvable, command: CommandResolvable): Promise<void> {
        return deleteGuildCommand(this, guild, command);
    }

    /**
     * Delete Guild Emoji
     *
     * Delete an emoji
     *
     * @param guild The guild to delete the emoji from
     * @param emoji The emoji to delete
     */
    deleteGuildEmoji(guild: GuildResolvable, emoji: EmojiResolvable): Promise<void> {
        return deleteGuildEmoji(this, guild, emoji);
    }

    /**
     * Delete Guild Role
     *
     * Delete a role
     *
     * @param guild The guild to delete the role from
     * @param role The role to delete
     */
    deleteGuildRole(guild: GuildResolvable, role: RoleResolvable): Promise<void> {
        return deleteGuildRole(this, guild, role);
    }

    /**
     * Delete Guild Template
     *
     * Delete a template
     *
     * @param guild The guild to delete the template in
     * @param template The template to delete
     *
     * @returns {Promise<TemplateData>} The deleted template's data
     */
    deleteGuildTemplate(guild: GuildResolvable, template: TemplateResolvable): Promise<TemplateData> {
        return deleteGuildTemplate(this, guild, template);
    }

    /**
     * Delete Invite
     *
     * Delete an invite
     *
     * @param channel The channel to delete the invite in
     * @param invite The invite to delete
     *
     * @returns {Promise<InviteData>} The deleted invite's data
     */
    deleteInvite(channel: ChannelResolvable, invite: InviteResolvable): Promise<InviteData> {
        return deleteInvite(this, channel, invite);
    }

    /**
     * Delete Message
     *
     * Delete a message
     *
     * @param channel The channel to delete the message in
     * @param message The message to delete
     */
    deleteMessage(channel: ChannelResolvable, message: MessageResolvable): Promise<void> {
        return deleteMessage(this, channel, message);
    }

    /**
     * Delete Own Reaction
     *
     * Remove the client's reaction from a message
     *
     * @param channel The channel to delete the reaction in
     * @param message The message to delete the reaction from
     * @param reactionEmoji The emoji to unreact with
     */
    deleteOwnReaction(channel: ChannelResolvable, message: MessageResolvable, reactionEmoji: ReactionEmojiResolvable): Promise<void> {
        return deleteOwnReaction(this, channel, message, reactionEmoji);
    }

    /**
     * Delete Pinned Channel Message
     *
     * Unpin a message from a channel
     *
     * @param channel The channel to unpin the messages from
     * @param message The message to unpin
     */
    deletePinnedChannelMessage(channel: ChannelResolvable, message: MessageResolvable): Promise<void> {
        return deletePinnedChannelMessage(this, channel, message);
    }

    /**
     * Delete User Reaction
     *
     * Remove a user's reaction from a message
     *
     * @param channel The channel to delete the reaction in
     * @param message The message to delete the reaction from
     * @param reactionEmoji The emoji to unreact with
     * @param user The user to delete the reaction for
     */
    deleteUserReaction(channel: ChannelResolvable, message: MessageResolvable, reactionEmoji: ReactionEmojiResolvable, user: UserResolvable): Promise<void> {
        return deleteUserReaction(this, channel, message, reactionEmoji, user);
    }

    /**
     * Delete Webhook
     *
     * Delete a webhook
     *
     * @param channel The channel to delete the webhook in
     * @param webhook The webhook to delete
     */
    deleteWebhook(channel: ChannelResolvable, webhook: WebhookResolvable): Promise<void> {
        return deleteWebhook(this, channel, webhook);
    }

    /**
     * Edit Channel Permissions
     *
     * Edit the permissions for a channel
     *
     * @param channel The channel to edit the permissions for
     * @param roleOrUser The role or user's permissions to edit
     * @param editChannelPermissionsData The data for editing the channel permissions
     */
    editChannelPermissions(channel: ChannelResolvable, roleOrUser: RoleResolvable | UserResolvable, editChannelPermissionsData: EditChannelPermissionsData): Promise<void> {
        return editChannelPermissions(this, channel, roleOrUser, editChannelPermissionsData);
    }

    /**
     * Edit Global Command
     *
     * Edit a global command
     *
     * @param command The command to edit
     * @param editCommandData The data for the command
     *
     * @returns {Promise<CommandData>} The command data
     */
    editGlobalCommand(command: CommandResolvable, editCommandData: EditCommandData): Promise<CommandData> {
        return editGlobalCommand(this, command, editCommandData);
    }

    /**
     * Edit Guild Command
     *
     * Edit a guild command
     *
     * @param guild The guild to edit the command in
     * @param command The command to edit
     * @param editCommandData The data for the command
     *
     * @returns {Promise<CommandData>} The command data
     */
    editGuildCommand(guild: GuildResolvable, command: CommandResolvable, editCommandData: EditCommandData): Promise<CommandData> {
        return editGuildCommand(this, guild, command, editCommandData);
    }

    /**
     * Edit Message
     *
     * Edit a message
     *
     * @param channel The channel to edit the message in
     * @param message The message to edit
     * @param editMessageData The data for editing the message
     *
     * @returns {Promise<MessageData>} The edited message's data
     */
    editMessage(channel: ChannelResolvable, message: MessageResolvable, editMessageData: EditMessageData): Promise<MessageData> {
        return editMessage(this, channel, message, editMessageData);
    }

    /**
     * Follow News Channel
     *
     * Follows an announcement channel
     *
     * @param channel The channel to follow
     * @param followNewsChannelData The data for following the news channel
     *
     * @returns {Promise<FollowedChannel>} The followed channel
     */
    followNewsChannel(channel: ChannelResolvable, followNewsChannelData: FollowNewsChannelData): Promise<FollowedChannel> {
        return followNewsChannel(this, channel, followNewsChannelData);
    }

    /**
     * Get Channel
     *
     * Get a channel
     *
     * @param channel The channel to get
     *
     * @returns {Promise<AnyChannelData>} The channel data
     */
    getChannel(channel: ChannelResolvable): Promise<AnyChannelData> {
        return getChannel(this, channel);
    }

    /**
     * Get Channel Invites
     *
     * Get a channel's invites
     *
     * @param channel The channel to get the invites of
     *
     * @returns {Promise<InviteData[]>} The invites
     */
    getChannelInvites(channel: ChannelResolvable): Promise<InviteData[]> {
        return getChannelInvites(this, channel);
    }

    /**
     * Get Channel Message
     *
     * Get a message
     *
     * @param channel The channel to get the message from
     * @param message The message to get
     *
     * @returns {Promise<MessageData>} The message data
     */
    getChannelMessage(channel: ChannelResolvable, message: MessageResolvable): Promise<MessageData> {
        return getChannelMessage(this, channel, message);
    }

    /**
     * Get Channel Messages
     *
     * Get a channel's messages
     *
     * @param channel The channel to get messages from
     * @param getChannelMessagesData The data for getting messages
     *
     * @returns {Promise<MessageData[]>} The messages
     */
    getChannelMessages(channel: ChannelResolvable, getChannelMessagesData?: GetChannelMessagesData): Promise<MessageData[]> {
        return getChannelMessages(this, channel, getChannelMessagesData);
    }

    /**
     * Get Channel Webhooks
     *
     * Get a channel's webhooks
     *
     * @param channel The channel to get the webhooks for
     *
     * @returns {Promise<WebhookData[]>} The channel's webhooks
     */
    getChannelWebhooks(channel: ChannelResolvable): Promise<WebhookData[]> {
        return getChannelWebhooks(this, channel);
    }

    /**
     * Get Current User
     *
     * Get the current user
     *
     * @returns {Promise<UserData>} The user data
     */
    getCurrentUser(): Promise<UserData> {
        return getCurrentUser(this);
    }

    /**
     * Get Current User Guilds
     *
     * Get the current user's guilds
     *
     * @param getCurrentUserGuildsData The data for getting the current user's guilds
     *
     * @returns {Promise<PartialGuild[]>} The guilds
     */
    getCurrentUserGuilds(getCurrentUserGuildsData?: GetCurrentUserGuildsData): Promise<PartialGuild[]> {
        return getCurrentUserGuilds(this, getCurrentUserGuildsData);
    }

    /**
     * Get Global Command
     *
     * Get a global command
     *
     * @param command The command to get
     *
     * @returns {Promise<CommandData>} The command data
     */
    getGlobalCommand(command: CommandResolvable): Promise<CommandData> {
        return getGlobalCommand(this, command);
    }

    /**
     * Get Global Commands
     *
     * Get the global commands
     *
     * @returns {Promise<CommandData[]>} The commands
     */
    getGlobalCommands(): Promise<CommandData[]> {
        return getGlobalCommands(this);
    }

    /**
     * Get Guild
     *
     * Get a guild
     *
     * @param guild The guild to get
     * @param getGuildData The data for getting the guild
     *
     * @returns {Promise<GuildData>} The guild data
     */
    getGuild(guild: GuildResolvable, getGuildData?: GetGuildData): Promise<GuildData> {
        return getGuild(this, guild, getGuildData);
    }

    /**
     * Get Guild Audit Log
     *
     * Get an audit log
     *
     * @param guild The guild to get the ban for
     * @param getGuildAuditLogData The data for getting the audit log
     *
     * @returns {Promise<AuditLogData>} The audit log data
     */
    getGuildAuditLog(guild: GuildResolvable, getGuildAuditLogData?: GetGuildAuditLogData): Promise<AuditLogData> {
        return getGuildAuditLog(this, guild, getGuildAuditLogData);
    }

    /**
     * Get Guild Ban
     *
     * Get a guild ban
     *
     * @param guild The guild to get the ban for
     * @param user The user to get the ban for
     *
     * @returns {Promise<BanData>} The ban data
     */
    getGuildBan(guild: GuildResolvable, user: UserResolvable): Promise<BanData> {
        return getGuildBan(this, guild, user);
    }

    /**
     * Get Guild Bans
     *
     * Get a guild's bans
     *
     * @param guild The guild to get the bans for
     *
     * @returns {Promise<BanData[]>} The guild's bans
     */
    getGuildBans(guild: GuildResolvable): Promise<BanData[]> {
        return getGuildBans(this, guild);
    }

    /**
     * Get Guild Channels
     *
     * Get a guild's channels
     *
     * @param guild The guild to get the channels for
     *
     * @returns {Promise<AnyGuildChannelData[]>} The guild's channels
     */
    getGuildChannels(guild: GuildResolvable): Promise<AnyGuildChannelData[]> {
        return getGuildChannels(this, guild);
    }

    /**
     * Get Guild Command
     *
     * Get a guild command
     *
     * @param guild The guild to get the command from
     * @param command The command to get
     *
     * @returns {Promise<CommandData>} The command data
     */
    getGuildCommand(guild: GuildResolvable, command: CommandResolvable): Promise<CommandData> {
        return getGuildCommand(this, guild, command);
    }

    /**
     * Get Guild Commands
     *
     * Get the guild commands
     *
     * @param guild The guild to get the commands from
     *
     * @returns {Promise<CommandData[]>} The commands
     */
    getGuildCommands(guild: GuildResolvable): Promise<CommandData[]> {
        return getGuildCommands(this, guild);
    }

    /**
     * Get Guild Emoji
     *
     * Get an emoji from a guild
     *
     * @param guild The guild to get the emoji from
     * @param emoji The emoji to get
     *
     * @returns {Promise<EmojiData>} The emoji data
     */
    getGuildEmoji(guild: GuildResolvable, emoji: EmojiResolvable): Promise<EmojiData> {
        return getGuildEmoji(this, guild, emoji);
    }

    /**
     * Get Guild Invites
     *
     * Get a guild's invites
     *
     * @param guild The guild to get the invites for
     *
     * @returns {Promise<InviteData[]>} The invites
     */
    getGuildInvites(guild: GuildResolvable): Promise<InviteData[]> {
        return getGuildInvites(this, guild);
    }

    /**
     * Get Guild Member
     *
     * Get a member from a guild
     *
     * @param guild The guild to get the member from
     * @param user The user resolvable for the member to get
     *
     * @returns {Promise<MemberData>} The member data
     */
    getGuildMember(guild: GuildResolvable, user: UserResolvable): Promise<MemberData> {
        return getGuildMember(this, guild, user);
    }

    /**
     * Get Guild Preview
     *
     * Get a guild preview
     *
     * @param guild The guild to get the preview from
     *
     * @returns {Promise<GuildPreview>} The guild preview
     */
    getGuildPreview(guild: GuildResolvable): Promise<GuildPreview> {
        return getGuildPreview(this, guild);
    }

    /**
     * Get Guild Roles
     *
     * Get a guild's roles
     *
     * @param guild The guild to get the roles for
     *
     * @returns {Promise<RoleData[]>} The guild's roles
     */
    getGuildRoles(guild: GuildResolvable): Promise<RoleData[]> {
        return getGuildRoles(this, guild);
    }

    /**
     * Get Guild Templates
     *
     * Get a guild's templates
     *
     * @param guild The guild to get the templates for
     *
     * @returns {Promise<TemplateData[]>} The guild's templates
     */
    getGuildTemplates(guild: GuildResolvable): Promise<TemplateData[]> {
        return getGuildTemplates(this, guild);
    }

    /**
     * Get Guild Vanity URL
     *
     * Get a guild's vanity invite
     *
     * @param guild The guild to get the vanity invite for
     *
     * @returns {Promise<VanityInviteData>} The vanity invite data
     */
    getGuildVanityURL(guild: GuildResolvable): Promise<VanityInviteData> {
        return getGuildVanityURL(this, guild);
    }

    /**
     * Get Guild Voice Regions
     *
     * Get a guild's voice regions
     *
     * @param guild The guild to get the voice regions for
     *
     * @returns {Promise<VoiceRegion[]>} The guild's voice regions
     */
    getGuildVoiceRegions(guild: GuildResolvable): Promise<VoiceRegion[]> {
        return getGuildVoiceRegions(this, guild);
    }

    /**
     * Get Guild Webhooks
     *
     * Get a guild's webhooks
     *
     * @param guild The guild to get the webhooks for
     *
     * @returns {Promise<WebhookData[]>} The guild's webhooks
     */
    getGuildWebhooks(guild: GuildResolvable): Promise<WebhookData[]> {
        return getGuildWebhooks(this, guild);
    }

    /**
     * Get Guild Welcome Screen
     *
     * Get a guild's welcome screen
     *
     * @param guild The guild to get the welcome screen from
     *
     * @returns {Promise<WelcomeScreenData | undefined>} The guild's welcome screen or `undefined` if the guild doesn't have one
     */
    getGuildWelcomeScreen(guild: GuildResolvable): Promise<WelcomeScreenData | undefined> {
        return getGuildWelcomeScreen(this, guild);
    }

    /**
     * Get Guild Widget Settings
     *
     * Get a guild's widget settings
     *
     * @param guild The guild to get the widget for
     *
     * @returns {Promise<GuildWidgetData>} The guild widget data
     */
    getGuildWidgetSettings(guild: GuildResolvable): Promise<GuildWidgetData> {
        return getGuildWidgetSettings(this, guild);
    }

    /**
     * Get Invite
     *
     * Get an invite
     *
     * @param invite The invite to get
     * @param getInviteData The data for getting the invite
     *
     * @returns {Promise<InviteData>} The invite data
     */
    getInvite(invite: InviteResolvable, getInviteData?: GetInviteData): Promise<InviteData> {
        return getInvite(this, invite, getInviteData);
    }

    /**
     * Get Pinned Messages
     *
     * Get a channel's pinned messages
     *
     * @param channel The channel to get the pinned messages of
     *
     * @returns {Promise<MessageData[]>} The messages
     */
    getPinnedMessages(channel: ChannelResolvable): Promise<MessageData[]> {
        return getPinnedMessages(this, channel);
    }

    /**
     * Get Reactions
     *
     * Get the users that reacted to a message with a specific emoji
     *
     * @param channel The channel to get the reactions from
     * @param message The message to get the reactions from
     * @param reactionEmoji The emoji to get the reactions for
     * @param getReactionsData The data for getting reactions
     *
     * @returns {Promise<UserData[]>} The users
     */
    getReactions(channel: ChannelResolvable, message: MessageResolvable, reactionEmoji: ReactionEmojiResolvable, getReactionsData?: GetReactionsData): Promise<UserData[]> {
        return getReactions(this, channel, message, reactionEmoji, getReactionsData);
    }

    /**
     * Get Template
     *
     * Get a template
     *
     * @param template The template to get
     *
     * @returns {Promise<TemplateData>} The template data
     */
    getTemplate(template: TemplateResolvable): Promise<TemplateData> {
        return getTemplate(this, template);
    }

    /**
     * Get User
     *
     * Get a user
     *
     * @param user The user to get
     *
     * @returns {Promise<UserData>} The user data
     */
    getUser(user: UserResolvable): Promise<UserData> {
        return getUser(this, user);
    }

    /**
     * Get Webhook
     *
     * Get a webhook
     *
     * @param channel The channel to get the webhook from
     * @param webhook The webhook to get
     *
     * @returns {Promise<WebhookData>} The webhook data
     */
    getWebhook(channel: ChannelResolvable, webhook: WebhookResolvable): Promise<WebhookData> {
        return getWebhook(this, channel, webhook);
    }

    /**
     * Leave Guild
     *
     * Leave a guild
     *
     * @param guild The guild to leave
     */
    leaveGuild(guild: GuildResolvable): Promise<void> {
        return leaveGuild(this, guild);
    }

    /**
     * List Guild Emojis
     *
     * Get the emojis in a guild
     *
     * @param guild The guild to get the emojis from
     *
     * @returns {Promise<EmojiData[]>} The emojis
     */
    listGuildEmojis(guild: GuildResolvable): Promise<EmojiData[]> {
        return listGuildEmojis(this, guild);
    }

    /**
     * List Guild Members
     *
     * Get members from a guild
     *
     * @param guild The guild to get the members from
     * @param listGuildMembersData The data for getting the members
     *
     * @returns {Promise<MemberData[]>} The members
     */
    listGuildMembers(guild: GuildResolvable, listGuildMembersData?: ListGuildMembersData): Promise<MemberData[]> {
        return listGuildMembers(this, guild, listGuildMembersData);
    }

    /**
     * List Voice Regions
     *
     * Get the voice regions that can be used when creating servers
     *
     * @returns {Promise<VoiceRegion[]>} The voice regions
     */
    listVoiceRegions(): Promise<VoiceRegion[]> {
        return listVoiceRegions(this);
    }

    /**
     * Modify Channel
     *
     * Modify a channel
     *
     * @param channel The channel to modify
     * @param modifyChannelData The data to modify the channel
     *
     * @returns {Promise<AnyGuildChannelData>} The modified channel's data
     */
    modifyChannel(channel: ChannelResolvable, modifyChannelData: ModifyChannelData): Promise<AnyGuildChannelData> {
        return modifyChannel(this, channel, modifyChannelData);
    }

    /**
     * Modify Current User
     *
     * Modify the current user
     *
     * @param modifyCurrentUserData The data to modify the current user
     *
     * @returns {Promise<UserData>} The modified user's data
     */
    modifyCurrentUser(modifyCurrentUserData: ModifyCurrentUserData): Promise<UserData> {
        return modifyCurrentUser(this, modifyCurrentUserData);
    }

    /**
     * Modify Current User Nickname
     *
     * Set the client's nickname in a guild
     *
     * @param guild The guild to set the nickname in
     * @param modifyCurrentUserNicknameData The data to modify the nickname
     *
     * @returns {Promise<CurrentUserNickname>} The modified nickname data
     */
    modifyCurrentUserNickname(guild: GuildResolvable, modifyCurrentUserNicknameData?: ModifyCurrentUserNicknameData): Promise<CurrentUserNickname> {
        return modifyCurrentUserNickname(this, guild, modifyCurrentUserNicknameData);
    }

    /**
     * Modify Guild
     *
     * Modify a guild
     *
     * @param guild The guild to modify
     * @param modifyGuildData The data to modify the guild
     *
     * @returns {Promise<GuildData>} The modified guild's data
     */
    modifyGuild(guild: GuildResolvable, modifyGuildData: ModifyGuildData): Promise<GuildData> {
        return modifyGuild(this, guild, modifyGuildData);
    }

    /**
     * Modify Guild Channel Positions
     *
     * Modify the positions of channels in a guild
     *
     * @param guild The guild to modify channel positions in
     * @param modifyGuildChannelPositionsData The data to modify the channel positions
     */
    modifyGuildChannelPositions(guild: GuildResolvable, modifyGuildChannelPositionsData: ModifyGuildChannelPositionsData[]): Promise<void> {
        return modifyGuildChannelPositions(this, guild, modifyGuildChannelPositionsData);
    }

    /**
     * Modify Guild Emoji
     *
     * Modify an emoji
     *
     * @param guild The guild to modify the emoji in
     * @param emoji The emoji to modify
     * @param modifyGuildEmojiData The data to modify the emoji
     *
     * @returns {Promise<EmojiData>} The modified emoji's data
     */
    modifyGuildEmoji(guild: GuildResolvable, emoji: EmojiResolvable, modifyGuildEmojiData: ModifyGuildEmojiData): Promise<EmojiData> {
        return modifyGuildEmoji(this, guild, emoji, modifyGuildEmojiData);
    }

    /**
     * Modify Guild Member
     *
     * Modify a member
     *
     * @param guild The guild to modify the member in
     * @param user The user resolvable for the member to modify
     * @param modifyGuildMemberData The data to modify the member
     *
     * @returns {Promise<MemberData>} The modified member's data
     */
    modifyGuildMember(guild: GuildResolvable, user: UserResolvable, modifyGuildMemberData: ModifyGuildMemberData): Promise<MemberData> {
        return modifyGuildMember(this, guild, user, modifyGuildMemberData);
    }

    /**
     * Modify Guild Role
     *
     * Modify a role
     *
     * @param guild The guild to modify the role in
     * @param role The role to modify
     * @param modifyGuildRoleData The data to modify the role
     *
     * @returns {Promise<RoleData>} The modified role's data
     */
    modifyGuildRole(guild: GuildResolvable, role: RoleResolvable, modifyGuildRoleData: ModifyGuildRoleData): Promise<RoleData> {
        return modifyGuildRole(this, guild, role, modifyGuildRoleData);
    }

    /**
     * Modify Guild Role Positions
     *
     * Modify the positions of roles in a guild
     *
     * @param guild The guild to modify role positions in
     * @param modifyGuildRolePositionsData The data to modify the role positions
     *
     * @returns {Promise<RoleData[]>} The guild's roles
     */
    modifyGuildRolePositions(guild: GuildResolvable, modifyGuildRolePositionsData: ModifyGuildRolePositionsData[]): Promise<RoleData[]> {
        return modifyGuildRolePositions(this, guild, modifyGuildRolePositionsData);
    }

    /**
     * Modify Guild Template
     *
     * Modify a template
     *
     * @param guild The guild to modify the template in
     * @param template The template to modify
     * @param modifyGuildTemplateData The data to modify the template
     *
     * @returns {Promise<TemplateData>} The modified template's data
     */
    modifyGuildTemplate(guild: GuildResolvable, template: TemplateResolvable, modifyGuildTemplateData: ModifyGuildTemplateData): Promise<TemplateData> {
        return modifyGuildTemplate(this, guild, template, modifyGuildTemplateData);
    }

    /**
     * Modify Guild Welcome Screen
     *
     * Modify a guild's welcome screen
     *
     * @param guild The guild to modify the welcome screen in
     * @param modifyGuildWelcomeScreenData The data to modify the welcome screen
     *
     * @returns {Promise<WelcomeScreenData>} The modified welcome screen's data
     */
    modifyGuildWelcomeScreen(guild: GuildResolvable, modifyGuildWelcomeScreenData: ModifyGuildWelcomeScreenData): Promise<WelcomeScreenData> {
        return modifyGuildWelcomeScreen(this, guild, modifyGuildWelcomeScreenData);
    }

    /**
     * Modify Guild Widget
     *
     * Modify a guild's widget
     *
     * @param guild The guild to modify the widget in
     * @param modifyGuildWidgetData The data to modify the guild's widget
     *
     * @returns {Promise<GuildWidgetData>} The modified guild widget's data
     */
    modifyGuildWidget(guild: GuildResolvable, modifyGuildWidgetData: ModifyGuildWidgetData): Promise<GuildWidgetData> {
        return modifyGuildWidget(this, guild, modifyGuildWidgetData);
    }

    /**
     * Modify Webhook
     *
     * Modify a webhook
     *
     * @param channel The channel to modify the webhook in
     * @param webhook The webhook to modify
     * @param modifyWebhookData The data to modify the webhook
     *
     * @returns {Promise<WebhookData>} The modified webhook's data
     */
    modifyWebhook(channel: ChannelResolvable, webhook: WebhookResolvable, modifyWebhookData: ModifyWebhookData): Promise<WebhookData> {
        return modifyWebhook(this, channel, webhook, modifyWebhookData);
    }

    /**
     * Remove Guild Ban
     *
     * Unban a user from a guild
     *
     * @param guild The guild to unban the user from
     * @param user The user to unban
     */
    removeGuildBan(guild: GuildResolvable, user: UserResolvable): Promise<void> {
        return removeGuildBan(this, guild, user);
    }

    /**
     * Remove Guild Member
     *
     * Kick a member
     *
     * @param guild The guild to kick the member from
     * @param user The user resolvable for the member to kick
     */
    removeGuildMember(guild: GuildResolvable, user: UserResolvable): Promise<void> {
        return removeGuildMember(this, guild, user);
    }

    /**
     * Remove Guild Member Role
     *
     * Remove a role from a member
     *
     * @param guild The guild to remove the role in
     * @param user The user resolvable for the member to remove the role from
     * @param role The role to remove
     */
    removeGuildMemberRole(guild: GuildResolvable, user: UserResolvable, role: RoleResolvable): Promise<void> {
        return removeGuildMemberRole(this, guild, user, role);
    }

    /**
     * Search Guild Members
     *
     * Search a guild's members by username or nickname
     *
     * @param guild The guild to search the members in
     * @param searchGuildMembersData The data for searching the members
     *
     * @returns {Promise<MemberData[]>} The members
     */
    searchGuildMembers(guild: GuildResolvable, searchGuildMembersData: SearchGuildMembersData): Promise<MemberData[]> {
        return searchGuildMembers(this, guild, searchGuildMembersData);
    }

    /**
     * Sync Guild Template
     *
     * Sync a template
     *
     * @param guild The guild to sync the template in
     * @param template The template to sync
     *
     * @returns {Promise<TemplateData>} The synced template's data
     */
    syncGuildTemplate(guild: GuildResolvable, template: TemplateResolvable): Promise<TemplateData> {
        return syncGuildTemplate(this, guild, template);
    }

    /**
     * Trigger Typing Indicator
     *
     * Start typing in a channel
     *
     * @param channel The channel to start typing in
     */
    triggerTypingIndicator(channel: ChannelResolvable): Promise<void> {
        return triggerTypingIndicator(this, channel);
    }
}