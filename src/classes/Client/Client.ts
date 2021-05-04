import EventEmitter from "events";
import WebSocket from "ws";
import {
    AnyChannel,
    AnyGuildChannel,
    AuditLog,
    ACTIVITY_TYPE_COMPETING,
    ACTIVITY_TYPE_LISTENING,
    ACTIVITY_TYPE_PLAYING,
    ACTIVITY_TYPE_STREAMING,
    ACTIVITY_TYPE_WATCHING,
    Ban,
    BanEventOptions,
    BulkDeleteMessagesData,
    BulkEditGuildCommandPermissionsData,
    CacheInterface,
    CacheManager,
    CacheStrategies,
    ChannelEventOptions,
    ChannelPermissionData,
    ChannelPinsUpdateData,
    ChannelPinsUpdateEventOptions,
    ChannelResolvable,
    ChannelUpdateEventOptions,
    ClientCacheStrategyData,
    Command,
    CommandPermissions,
    CommandResolvable,
    CommandUpdateEventOptions,
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
    CreateInteractionResponseData,
    CreateMessageData,
    CreateWebhookData,
    CurrentUserNickname,
    DMChannel,
    EditChannelPermissionsData,
    EditCommandData,
    EditGuildCommandPermissionsData,
    EditInteractionResponseData,
    EditMessageData,
    Emoji,
    EmojiResolvable,
    EventOptions,
    FetchedData,
    FetchQueue,
    FollowedChannel,
    FollowupInteractionResponseData,
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
    GuildDeleteData,
    GuildEmojisUpdateData,
    GuildEmojisUpdateEventOptions,
    GuildEventOptions,
    GuildIntegrationsUpdateData,
    GuildMemberAddEventOptions,
    GuildMemberRemoveData,
    GuildMemberRemoveEventOptions,
    GuildMemberUpdateEventOptions,
    GuildPreview,
    GuildResolvable,
    GuildRoleDeleteData,
    GuildRoleDeleteEventOptions,
    GuildRoleUpdateEventOptions,
    GuildUpdateEventOptions,
    GuildUserCacheInterface,
    GuildUserCacheManager,
    GuildWidget,
    Interaction,
    InteractionResolvable,
    Invite,
    InviteDeleteData,
    InviteDeleteEventOptions,
    InviteResolvable,
    ListGuildMembersData,
    Member,
    Message,
    MessageDeleteBulkData,
    MessageDeleteBulkEventOptions,
    MessageDeleteData,
    MessageDeleteEventOptions,
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
    PresenceUpdateEventOptions,
    ReactionBulkRemoveEventOptions,
    ReactionEmojiResolvable,
    ReactionEventOptions,
    ReadyData,
    ReadyState,
    RequestOptions,
    Role,
    RolePermissionData,
    RoleResolvable,
    READY_STATE_NONE,
    SearchGuildMembersData,
    Status,
    Template,
    TemplateResolvable,
    TextBasedChannelEventOptions,
    TypingStartData,
    TypingStartEventOptions,
    User,
    UserData,
    UserResolvable,
    UserUpdateEventOptions,
    VanityInvite,
    VoiceRegion,
    VoiceState,
    VoiceStateUpdateEventOptions,
    Webhook,
    WebhooksUpdateData,
    WebhookResolvable,
    WelcomeScreen,
    WelcomeScreenData
} from "../../internal";
import addGuildMemberRole from "./apiMethods/addGuildMemberRole";
import addPinnedChannelMessage from "./apiMethods/addPinnedChannelMessage";
import bulkDeleteMessages from "./apiMethods/bulkDeleteMessages";
import bulkEditGuildCommandPermissions from "./apiMethods/bulkEditGuildCommandPermissions";
import bulkOverwriteGlobalCommands from "./apiMethods/bulkOverwriteGlobalCommands";
import bulkOverwriteGuildCommands from "./apiMethods/bulkOverwriteGuildCommands";
import createChannelInvite from "./apiMethods/createChannelInvite";
import createDM from "./apiMethods/createDM";
import createFollowupMessage from "./apiMethods/createFollowupMessage";
import createGlobalCommand from "./apiMethods/createGlobalCommand";
import createGuild from "./apiMethods/createGuild";
import createGuildBan from "./apiMethods/createGuildBan";
import createGuildChannel from "./apiMethods/createGuildChannel";
import createGuildCommand from "./apiMethods/createGuildCommand";
import createGuildEmoji from "./apiMethods/createGuildEmoji";
import createGuildFromTemplate from "./apiMethods/createGuildFromTemplate";
import createGuildRole from "./apiMethods/createGuildRole";
import createGuildTemplate from "./apiMethods/createGuildTemplate";
import createInteractionResponse from "./apiMethods/createInteractionResponse";
import createMessage from "./apiMethods/createMessage";
import createReaction from "./apiMethods/createReaction";
import createWebhook from "./apiMethods/createWebhook";
import crosspostMessage from "./apiMethods/crosspostMessage";
import deleteAllReactions from "./apiMethods/deleteAllReactions";
import deleteAllReactionsForEmoji from "./apiMethods/deleteAllReactionsForEmoji";
import deleteChannel from "./apiMethods/deleteChannel";
import deleteChannelPermission from "./apiMethods/deleteChannelPermission";
import deleteFollowupMessage from "./apiMethods/deleteFollowupMessage";
import deleteGlobalCommands from "./apiMethods/deleteGlobalCommand";
import deleteGuild from "./apiMethods/deleteGuild";
import deleteGuildCommand from "./apiMethods/deleteGuildCommand";
import deleteGuildEmoji from "./apiMethods/deleteGuildEmoji";
import deleteGuildRole from "./apiMethods/deleteGuildRole";
import deleteGuildTemplate from "./apiMethods/deleteGuildTemplate";
import deleteInvite from "./apiMethods/deleteInvite";
import deleteMessage from "./apiMethods/deleteMessage";
import deleteOriginalInteractionResponse from "./apiMethods/deleteOriginalInteractionResponse";
import deleteOwnReaction from "./apiMethods/deleteOwnReaction";
import deletePinnedChannelMessage from "./apiMethods/deletePinnedChannelMessage";
import deleteUserReaction from "./apiMethods/deleteUserReaction";
import deleteWebhook from "./apiMethods/deleteWebhook";
import editChannelPermissions from "./apiMethods/editChannelPermissions";
import editFollowupMessage from "./apiMethods/editFollowupMessage";
import editGlobalCommand from "./apiMethods/editGlobalCommand";
import editGuildCommand from "./apiMethods/editGuildCommand";
import editGuildCommandPermissions from "./apiMethods/editGuildCommandPermissions";
import editMessage from "./apiMethods/editMessage";
import editOriginalInteractionResponse from "./apiMethods/editOriginalInteractionResponse";
import followNewsChannel from "./apiMethods/followNewsChannel";
import getAllGuildCommandPermissions from "./apiMethods/getAllGuildCommandPermissions";
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
import getGuildCommandPermissions from "./apiMethods/getGuildCommandPermissions";
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
     * Global Commands
     *
     * Data to bulk overwrite the bot's global commands
     */
    globalCommands?: EditCommandData[];

    /**
     * Global Command Guild IDs
     *
     * The guild IDs to also add the global commands to
     * This can be useful during development since global commands can take up to an hour to update
     */
    globalCommandGuildIDs?: string[];

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
export type ClientActivityType = typeof ACTIVITY_TYPE_PLAYING | typeof ACTIVITY_TYPE_STREAMING | typeof ACTIVITY_TYPE_LISTENING | typeof ACTIVITY_TYPE_WATCHING | typeof ACTIVITY_TYPE_COMPETING;

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
    on(event: "channelCreate", listener: (channel: AnyChannel, options: EventOptions) => void): this;

    /**
     * Channel Delete
     *
     * Emitted when a channel is deleted
     */
    on(event: "channelDelete", listener: (channel: AnyChannel, options: EventOptions) => void): this;

    /**
     * Channel Pins Update
     *
     * Emitted when a channel's pins are updated
     */
    on(event: "channelPinsUpdate", listener: (data: ChannelPinsUpdateData, options: ChannelPinsUpdateEventOptions) => void): this;

    /**
     * Channel Update
     *
     * Emitted when a channel is updated
     */
    on(event: "channelUpdate", listener: (channel: AnyChannel, options: ChannelUpdateEventOptions) => void): this;

    /**
     * Command Create
     *
     * Emitted when a command is created
     */
    on(event: "commandCreate", listener: (command: Command, options: EventOptions) => void): this;

    /**
     * Command Delete
     *
     * Emitted when a command is deleted
     */
    on(event: "commandDelete", listener: (command: Command, options: EventOptions) => void): this;

    /**
     * Command Update
     *
     * Emitted when a command is updated
     */
    on(event: "commandUpdate", listener: (command: Command, options: CommandUpdateEventOptions) => void): this;

    /**
     * Guild Available
     *
     * Emitted when a guild becomes available
     */
    on(event: "guildAvailable", listener: (data: GuildCreateData, options: EventOptions) => void): this;

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
    on(event: "guildCreate", listener: (data: GuildCreateData, options: EventOptions) => void): this;

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
    on(event: "guildMemberAdd", listener: (member: Member, options: GuildMemberAddEventOptions) => void): this;

    /**
     * Guild Member Remove
     *
     * Emitted when a member leaves a guild or gets kicked from a guild
     */
    on(event: "guildMemberRemove", listener: (data: GuildMemberRemoveData, options: GuildMemberRemoveEventOptions) => void): this;

    /**
     * Guild Member Update
     *
     * Emitted when a guild member is updated
     */
    on(event: "guildMemberUpdate", listener: (member: Member, options: GuildMemberUpdateEventOptions) => void): this;

    /**
     * Guild Role Create
     *
     * Emitted when a role is created
     */
    on(event: "guildRoleCreate", listener: (role: Role, options: GuildEventOptions) => void): this;

    /**
     * Guild Role Delete
     *
     * Emitted when a role is deleted
     */
    on(event: "guildRoleDelete", listener: (data: GuildRoleDeleteData, options: GuildRoleDeleteEventOptions) => void): this;

    /**
     * Guild Role Update
     *
     * Emitted when a role is updated
     */
    on(event: "guildRoleUpdate", listener: (role: Role, options: GuildRoleUpdateEventOptions) => void): this;

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
    on(event: "guildUpdate", listener: (guild: Guild, options: GuildUpdateEventOptions) => void): this;

    /**
     * Interaction Create
     *
     * Emitted when an interaction is created
     */
    on(event: "interactionCreate", listener: (interaction: Interaction, options: ChannelEventOptions) => void): this;

    /**
     * Invite Create
     *
     * Emitted when an invite is created
     */
    on(event: "inviteCreate", listener: (invite: Invite, options: ChannelEventOptions) => void): this;

    /**
     * Invite Delete
     *
     * Emitted when an invite is deleted
     */
    on(event: "inviteDelete", listener: (data: InviteDeleteData, options: InviteDeleteEventOptions) => void): this;

    /**
     * Message Create
     *
     * Emitted when a message is created
     */
    on(event: "messageCreate", listener: (message: Message, options: TextBasedChannelEventOptions) => void): this;

    /**
     * Message Delete
     *
     * Emitted when a message is deleted
     */
    on(event: "messageDelete", listener: (data: MessageDeleteData, options: MessageDeleteEventOptions) => void): this;

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
    on(event: "messageReactionRemoveAll", listener: (data: MessageReactionRemoveAllData, options: ReactionBulkRemoveEventOptions) => void): this;

    /**
     * Message Reaction Remove Emoji
     *
     * Emitted when all the reactions on a message for a specific emoji are removed
     */
    on(event: "messageReactionRemoveEmoji", listener: (data: MessageReactionRemoveEmojiData, options: ReactionBulkRemoveEventOptions) => void): this;

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
    on(event: "presenceUpdate", listener: (presence: Presence, options: PresenceUpdateEventOptions) => void): this;

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
    on(event: "userUpdate", listener: (user: User, options: UserUpdateEventOptions) => void): this;

    /**
     * Voice State Update
     *
     * Emitted when a voice state is updated
     */
    on(event: "voiceStateUpdate", listener: (voiceState: VoiceState, options: VoiceStateUpdateEventOptions) => void): this;

    /**
     * Webhooks Update
     *
     * Emitted when a channel's webhooks are updated
     */
    on(event: "webhooksUpdate", listener: (data: WebhooksUpdateData, options: ChannelEventOptions) => void): this;
}

export default class Client extends EventEmitter {

    /**
     * ID
     *
     * The client's ID
     */
    get id(): string {
        return this.user.id;
    }

    /**
     * User
     *
     * The client's user object
     */
    user: UserData;

    /**
     * Session ID
     *
     * The session ID
     *
     * @private
     */
    _sessionID?: string;

    /**
     * Sequence
     *
     * The sequence number
     *
     * @private
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
     *
     * @private
     */
    _ws: WebSocket;

    /**
     * Ready State
     *
     * Whether or not the client is ready to process events
     *
     * @private
     */
    _readyState: ReadyState;

    /**
     * Ready Data
     *
     * The data for the `ready` event, generated by `events/ready/ready.ts`, and emitted by `events/ready.ts` after all initial guilds are loaded in
     *
     * @private
     */
    _readyData?: UnemittedReadyData;

    /**
     * Event Queue
     *
     * A queue of events that were sent before the client was ready
     *
     * @private
     */
    _eventQueue: EventQueueEvent[];

    /**
     * Uninitialized Guilds
     *
     * An array of IDs for guilds that are uninitialized
     * This will be all the guilds the bot is in as sent by the `READY` event that haven't also been sent by the `GUILD_CREATE` event
     *
     * @private
     */
    _uninitializedGuilds: Set<string>;

    /**
     * Unavailable Guilds
     *
     * An array of IDs for guilds that are unavailable
     *
     * @private
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
     *
     * @private
     */
    _lastPingTimestamp: number;

    /**
     * Ping Interval
     *
     * The result from `setInterval` for pings
     *
     * @private
     */
    _pingInterval: NodeJS.Timeout;

    /**
     * Heartbeat Interval
     *
     * The result from `setInterval` for heartbeats
     *
     * @private
     */
    _heartbeatInterval: NodeJS.Timeout;

    /**
     * Heartbeat Acked
     *
     * Whether or not the last heartbeat has been acknowledged
     *
     * @private
     */
    _heartbeatAcked: boolean;

    /**
     * Initial Presence
     *
     * The bot's initial presence
     *
     * @private
     */
    _initialPresence?: ClientPresence;

    /**
     * Members Intent
     *
     * Whether or not the bot needs the members intent
     *
     * @private
     */
    _membersIntent: boolean;

    /**
     * Presences Intent
     *
     * Whether or not the bot needs the presences intent
     *
     * @private
     */
    _presencesIntent: boolean;

    /**
     * Global Commands
     *
     * Data to bulk overwrite the bot's global commands when connecting to the gateway
     *
     * @private
     */
    _globalCommands?: EditCommandData[];

    /**
     * Global Command Guild IDs
     *
     * The guild IDs to also add the global commands to
     */
    _globalCommandGuildIDs?: string[];

    /**
     * Fetch Queues
     *
     * Queues for fetching data from the API
     *
     * @private
     */
    _fetchQueues: Map<string, FetchQueue>;

    /**
     * Global Rate Limit Reset
     *
     * A promise that resolves when the global rate limit resets
     * `undefined` if the client hasn't hit the global rate limit
     *
     * @private
     */
    _globalRateLimitReset?: Promise<void>;

    /**
     * Cache Strategies
     *
     * How objects should be cached
     *
     * @private
     */
    _cacheStrategies: CacheStrategies;

    /**
     * Guild Owners
     *
     * A map of guild IDs to the guild's owner's IDs
     *
     * @private
     */
    _guildOwners?: Map<string, string>;

    /**
     * Guild Roles
     *
     * A map of guild IDs to an array of the guild's role IDs
     *
     * @private
     */
    _guildRoles?: Map<string, string[]>;

    /**
     * Guild Channels
     *
     * A map of guild IDs to an array of the guild's channel IDs
     *
     * @private
     */
    _guildChannels?: Map<string, string[]>;

    /**
     * Guild Emojis
     *
     * A map of guild IDs to an array of the guild's emoji IDs
     *
     * @private
     */
    _guildEmojis?: Map<string, string[]>;

    /**
     * Role Permissions
     *
     * A map of role IDs to their permission data
     *
     * @private
     */
    _rolePermissions?: Map<string, RolePermissionData>;

    /**
     * Channel Permissions
     *
     * A map of channel IDs to their permission data
     *
     * @private
     */
    _channelPermissions?: Map<string, ChannelPermissionData>;

    /**
     * Client Roles
     *
     * A map of guild IDs to an array of the client's roles' IDs in that guild
     *
     * @private
     */
    _clientRoles?: Map<string, string[]>;

    /**
     * Emoji Guilds
     *
     * A map of emoji IDs to the ID of the guild the emoji is in
     *
     * @private
     */
    _emojiGuilds?: Map<string, string>;

    /**
     * Pending Interaction Response Messages
     *
     * When creating an interaction response, the API endpoint doesn't return a message object
     * This maps interaction IDs to a promise's resolve function to resolve the interaction response's message once a `messageCreate` event is received for it
     *
     * @private
     */
    _pendingInteractionResponseMessages: Map<string, Function>;

    /**
     * Commands
     *
     * The internal cache of commands
     *
     * @private
     */
    _commands: CacheManager<Command>;

    /**
     * Command Permissions
     *
     * The internal cache of command permissions
     *
     * @private
     */
    _commandPermissions: CacheManager<CommandPermissions>;

    /**
     * Bans
     *
     * The internal cache of bans
     *
     * @private
     */
    _bans: GuildUserCacheManager<Ban>;

    /**
     * Channels
     *
     * The internal cache of channels
     *
     * @private
     */
    _channels: CacheManager<AnyChannel>;

    /**
     * Emojis
     *
     * The internal cache of emojis
     *
     * @private
     */
    _emojis: CacheManager<Emoji>;

    /**
     * Guilds
     *
     * The internal cache of guilds
     *
     * @private
     */
    _guilds: CacheManager<Guild>;

    /**
     * Guild Widgets
     *
     * The internal cache of guild widgets
     *
     * @private
     */
    _guildWidgets: CacheManager<GuildWidget>;

    /**
     * Interactions
     *
     * The internal cache of interactions
     *
     * @private
     */
    _interactions: CacheManager<Interaction>;

    /**
     * Invites
     *
     * The internal cache of invites
     *
     * @private
     */
    _invites: CacheManager<Invite>;

    /**
     * Members
     *
     * The internal cache of members
     *
     * @private
     */
    _members: GuildUserCacheManager<Member>;

    /**
     * Messages
     *
     * The internal cache of messages
     *
     * @private
     */
    _messages: CacheManager<Message>;

    /**
     * Presences
     *
     * The internal cache of presences
     *
     * @private
     */
    _presences: CacheManager<Presence>;

    /**
     * Roles
     *
     * The internal cache of roles
     *
     * @private
     */
    _roles: CacheManager<Role>;

    /**
     * Templates
     *
     * The internal cache of templates
     *
     * @private
     */
    _templates: CacheManager<Template>;

    /**
     * Users
     *
     * The internal cache of users
     *
     * @private
     */
    _users: CacheManager<User>;

    /**
     * Vanity Invites
     *
     * The internal cache of vanity invites
     *
     * @private
     */
    _vanityInvites: CacheManager<VanityInvite>;

    /**
     * Webhooks
     *
     * The internal cache of webhooks
     *
     * @private
     */
    _webhooks: CacheManager<Webhook>;

    /**
     * Welcome Screens
     *
     * The internal cache of welcome screens
     *
     * @private
     */
    _welcomeScreens: CacheManager<WelcomeScreen>;

    /**
     * Commands
     *
     * The cache of commands
     */
    commands: CacheInterface<Command, false>;

    /**
     * Command Permissions
     *
     * The cache of command permissions
     */
    commandPermissions: CacheInterface<CommandPermissions, false>;

    /**
     * Bans
     *
     * The cache of bans
     */
    bans: GuildUserCacheInterface<Ban>;

    /**
     * Channels
     *
     * The cache of channels
     */
    channels: CacheInterface<AnyChannel>;

    /**
     * Emojis
     *
     * The cache of emojis
     */
    emojis: CacheInterface<Emoji, false>;

    /**
     * Guilds
     *
     * The cache of guilds
     */
    guilds: CacheInterface<Guild>;

    /**
     * Guild Widgets
     *
     * The cache of guild widgets
     */
    guildWidgets: CacheInterface<GuildWidget>;

    /**
     * Interactions
     *
     * The cache of interactions
     */
    interactions: CacheInterface<Interaction, false>;

    /**
     * Invites
     *
     * The cache of invites
     */
    invites: CacheInterface<Invite>;

    /**
     * Members
     *
     * The cache of members
     */
    members: GuildUserCacheInterface<Member>;

    /**
     * Messages
     *
     * The cache of messages
     */
    messages: CacheInterface<Message, false>;

    /**
     * Presences
     *
     * The cache of presences
     */
    presences: CacheInterface<Presence, false>;

    /**
     * Roles
     *
     * The cache of roles
     */
    roles: CacheInterface<Role, false>;

    /**
     * Templates
     *
     * The cache of templates
     */
    templates: CacheInterface<Template>;

    /**
     * Users
     *
     * The cache of users
     */
    users: CacheInterface<User>;

    /**
     * Vanity Invites
     *
     * The cache of vanity invites
     */
    vanityInvites: CacheInterface<VanityInvite>;

    /**
     * Webhooks
     *
     * The cache of webhooks
     */
    webhooks: CacheInterface<Webhook, false>;

    /**
     * Welcome Screens
     *
     * The cache of welcome screens
     */
    welcomeScreens: CacheInterface<WelcomeScreen>;

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
        this._globalCommands = clientData.globalCommands;
        this._globalCommandGuildIDs = clientData.globalCommandGuildIDs;
        Object.defineProperty(this, "_fetchQueues", { value: new Map() });
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
            Object.defineProperty(this, "_guildOwners", { value: new Map() });
            Object.defineProperty(this, "_guildRoles", { value: new Map() });
            Object.defineProperty(this, "_guildChannels", { value: new Map() });
            Object.defineProperty(this, "_rolePermissions", { value: new Map() });
            Object.defineProperty(this, "_channelPermissions", { value: new Map() });
            Object.defineProperty(this, "_clientRoles", { value: new Map() });
        }
        if (this._cacheStrategies.permissions.externalEmojis) {
            Object.defineProperty(this, "_guildEmojis", { value: new Map() });
            Object.defineProperty(this, "_emojiGuilds", { value: new Map() });
        }
        this._pendingInteractionResponseMessages = new Map();
        Object.defineProperty(this, "_commands", { value: new CacheManager<Command>(this, CacheManager.parseCacheStrategy(this._cacheStrategies.objects.commands)) });
        Object.defineProperty(this, "_commandPermissions", { value: new CacheManager<CommandPermissions>(this, CacheManager.parseCacheStrategy(this._cacheStrategies.objects.commandPermissions)) });
        Object.defineProperty(this, "_bans", { value: new GuildUserCacheManager<Ban>(this, CacheManager.parseCacheStrategy(this._cacheStrategies.objects.bans)) });
        Object.defineProperty(this, "_channels", { value: new CacheManager<AnyChannel>(this, CacheManager.parseCacheStrategy(this._cacheStrategies.objects.channels)) });
        Object.defineProperty(this, "_emojis", { value: new CacheManager<Emoji>(this, CacheManager.parseCacheStrategy(this._cacheStrategies.objects.emojis)) });
        Object.defineProperty(this, "_guilds", { value: new CacheManager<Guild>(this, CacheManager.parseCacheStrategy(this._cacheStrategies.objects.guilds)) });
        Object.defineProperty(this, "_guildWidgets", { value: new CacheManager<GuildWidget>(this, CacheManager.parseCacheStrategy(this._cacheStrategies.objects.guildWidgets)) });
        Object.defineProperty(this, "_interactions", { value: new CacheManager<Interaction>(this, CacheManager.parseCacheStrategy(this._cacheStrategies.objects.interactions)) });
        Object.defineProperty(this, "_invites", { value: new CacheManager<Invite>(this, CacheManager.parseCacheStrategy(this._cacheStrategies.objects.invites)) });
        Object.defineProperty(this, "_members", { value: new GuildUserCacheManager<Member>(this, CacheManager.parseCacheStrategy(this._cacheStrategies.objects.members)) });
        Object.defineProperty(this, "_messages", { value: new CacheManager<Message>(this, CacheManager.parseCacheStrategy(this._cacheStrategies.objects.messages)) });
        Object.defineProperty(this, "_presences", { value: new CacheManager<Presence>(this, CacheManager.parseCacheStrategy(this._cacheStrategies.objects.presences)) });
        Object.defineProperty(this, "_roles", { value: new CacheManager<Role>(this, CacheManager.parseCacheStrategy(this._cacheStrategies.objects.roles)) });
        Object.defineProperty(this, "_templates", { value: new CacheManager<Template>(this, CacheManager.parseCacheStrategy(this._cacheStrategies.objects.templates)) });
        Object.defineProperty(this, "_users", { value: new CacheManager<User>(this, CacheManager.parseCacheStrategy(this._cacheStrategies.objects.users)) });
        Object.defineProperty(this, "_vanityInvites", { value: new CacheManager<VanityInvite>(this, CacheManager.parseCacheStrategy(this._cacheStrategies.objects.vanityInvites)) });
        Object.defineProperty(this, "_webhooks", { value: new CacheManager<Webhook>(this, CacheManager.parseCacheStrategy(this._cacheStrategies.objects.webhooks)) });
        Object.defineProperty(this, "_welcomeScreens", { value: new CacheManager<WelcomeScreen>(this, CacheManager.parseCacheStrategy(this._cacheStrategies.objects.welcomeScreens)) });
        Object.defineProperty(this, "commands", {
            value: new CacheInterface<Command, false>(this, {
                cacheManager: this._commands
            })
        });
        Object.defineProperty(this, "commandPermissions", {
            value: new CacheInterface<CommandPermissions, false>(this, {
                cacheManager: this._commandPermissions
            })
        });
        Object.defineProperty(this, "bans", {
            value: new GuildUserCacheInterface<Ban>(this, {
                cacheManager: this._bans._cacheManager,
                fetchObject: async (id: string): Promise<Ban | undefined> => await this.getGuildBan(id.split("_")[0], id.split("_")[1])
            })
        });
        Object.defineProperty(this, "channels", {
            value: new CacheInterface<AnyChannel>(this, {
                cacheManager: this._channels,
                fetchObject: async (id: string): Promise<AnyChannel | undefined> => await this.getChannel(id)
            })
        });
        Object.defineProperty(this, "emojis", {
            value: new CacheInterface<Emoji, false>(this, {
                cacheManager: this._emojis
            })
        });
        Object.defineProperty(this, "guilds", {
            value: new CacheInterface<Guild>(this, {
                cacheManager: this._guilds,
                fetchObject: async (id: string): Promise<Guild | undefined> => await this.getGuild(id)
            })
        });
        Object.defineProperty(this, "guildWidgets", {
            value: new CacheInterface<GuildWidget>(this, {
                cacheManager: this._guildWidgets,
                fetchObject: async (id: string): Promise<GuildWidget> => await this.getGuildWidgetSettings(id)
            })
        });
        Object.defineProperty(this, "interactions", {
            value: new CacheInterface<Interaction, false>(this, {
                cacheManager: this._interactions
            })
        });
        Object.defineProperty(this, "invites", {
            value: new CacheInterface<Invite>(this, {
                cacheManager: this._invites,
                fetchObject: async (id: string): Promise<Invite | undefined> => await this.getInvite(id)
            })
        });
        Object.defineProperty(this, "members", {
            value: new GuildUserCacheInterface<Member>(this, {
                cacheManager: this._members._cacheManager,
                fetchObject: async (id: string): Promise<Member | undefined> => await this.getGuildMember(id.split("_")[0], id.split("_")[1])
            })
        });
        Object.defineProperty(this, "messages", {
            value: new CacheInterface<Message, false>(this, {
                cacheManager: this._messages
            })
        });
        Object.defineProperty(this, "presences", {
            value: new CacheInterface<Presence, false>(this, {
                cacheManager: this._presences
            })
        });
        Object.defineProperty(this, "roles", {
            value: new CacheInterface<Role, false>(this, {
                cacheManager: this._roles
            })
        });
        Object.defineProperty(this, "templates", {
            value: new CacheInterface<Template>(this, {
                cacheManager: this._templates,
                fetchObject: async (id: string): Promise<Template | undefined> => await this.getTemplate(id)
            })
        });
        Object.defineProperty(this, "users", {
            value: new CacheInterface<User>(this, {
                cacheManager: this._users,
                fetchObject: async (id: string): Promise<User | undefined> => await this.getUser(id)
            })
        });
        Object.defineProperty(this, "vanityInvites", {
            value: new CacheInterface<VanityInvite>(this, {
                cacheManager: this._vanityInvites,
                fetchObject: async (id: string): Promise<VanityInvite | undefined> => await this.getGuildVanityURL(id)
            })
        });
        Object.defineProperty(this, "webhooks", {
            value: new CacheInterface<Webhook, false>(this, {
                cacheManager: this._webhooks
            })
        });
        Object.defineProperty(this, "welcomeScreens", {
            value: new CacheInterface<WelcomeScreen>(this, {
                cacheManager: this._welcomeScreens,
                fetchObject: async (id: string): Promise<WelcomeScreen> => {

                    // Get welcome screen data
                    const welcomeScreenData: WelcomeScreenData | null = (await this.guilds.get(id, true)).welcomeScreen;
                    if (!welcomeScreenData) throw new Error("Couldn't find a welcome screen in that guild");

                    // Return
                    return WelcomeScreen.fromData(this, welcomeScreenData);
                }
            })
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
     *
     * @private
     */
    _connect() {
        connect(this);
    }

    /**
     * Garbage Collect
     *
     * Garbage collect the client's properties
     *
     * @private
     */
    _garbageCollect() {
        garbageCollect(this);
    }

    /**
     * Avatar URL
     *
     * Get the client's avatar's URL
     *
     * @returns {string} The avatar's URL
     */
    avatarURL(): string {
        return this.user.avatarHash ? `https://cdn.discordapp.com/avatars/${this.user.id}/${this.user.avatarHash}.png` : `https://cdn.discordapp.com/embed/avatars/${parseInt(this.user.discriminator) % 5}.png`;
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
     * @private
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
     * @param reason The reason for adding the role
     */
    addGuildMemberRole(guild: GuildResolvable, user: UserResolvable, role: RoleResolvable, reason?: string): Promise<void> {
        return addGuildMemberRole(this, guild, user, role, reason);
    }

    /**
     * Add Pinned Channel Message
     *
     * Pin a message to a channel
     *
     * @param channel The channel to pin the messages in
     * @param message The message to pin
     * @param reason The reason for pinning the message
     */
    addPinnedChannelMessage(channel: ChannelResolvable, message: MessageResolvable, reason?: string): Promise<void> {
        return addPinnedChannelMessage(this, channel, message, reason);
    }

    /**
     * Bulk Edit Guild Command Permissions
     *
     * Bulk edit the permissions of a guild's commands
     *
     * @param guild The guild to edit the command permissions in
     * @param bulkEditGuildCommandPermissionsData The data for editing the command permissions
     *
     * @returns {Promise<CommandPermissions[]>} The command permissions
     */
    bulkEditGuildCommandPermissions(guild: GuildResolvable, bulkEditGuildCommandPermissionsData: BulkEditGuildCommandPermissionsData[]): Promise<CommandPermissions[]> {
        return bulkEditGuildCommandPermissions(this, guild, bulkEditGuildCommandPermissionsData);
    }

    /**
     * Bulk Delete Messages
     *
     * Bulk delete messages
     *
     * @param channel The channel to delete the messages in
     * @param bulkDeleteMessagesData The data for bulk deleting messages
     * @param reason The reason for bulk deleting the messages
     */
    bulkDeleteMessages(channel: ChannelResolvable, bulkDeleteMessagesData: BulkDeleteMessagesData, reason?: string): Promise<void> {
        return bulkDeleteMessages(this, channel, bulkDeleteMessagesData, reason);
    }

    /**
     * Bulk Overwrite Global Commands
     *
     * Bulk edit global commands
     *
     * @param editCommandData The data for the commands
     *
     * @returns {Promise<Command[]>} The commands
     */
    bulkOverwriteGlobalCommands(editCommandData: EditCommandData[]): Promise<Command[]> {
        return bulkOverwriteGlobalCommands(this, editCommandData);
    }

    /**
     * Bulk Overwrite Guild Commands
     *
     * Bulk edit a guild's commands
     *
     * @param guild The guild to edit the commands in
     * @param editCommandData The data for the commands
     *
     * @returns {Promise<Command[]>} The commands
     */
    bulkOverwriteGuildCommands(guild: GuildResolvable, editCommandData: EditCommandData[]): Promise<Command[]> {
        return bulkOverwriteGuildCommands(this, guild, editCommandData);
    }

    /**
     * Create Channel Invite
     *
     * Create an invite
     *
     * @param channel The channel to create an invite in
     * @param createChannelInviteData The data for the invite
     * @param reason The reason for creating the invite
     *
     * @returns {Promise<Invite>} The invite
     */
    createChannelInvite(channel: ChannelResolvable, createChannelInviteData?: CreateChannelInviteData, reason?: string): Promise<Invite> {
        return createChannelInvite(this, channel, createChannelInviteData, reason);
    }

    /**
     * Create DM
     *
     * Create a DM
     *
     * @param createDMData The data for the DM
     *
     * @returns {Promise<DMChannel>} The DM channel
     */
    createDM(createDMData: CreateDMData): Promise<DMChannel> {
        return createDM(this, createDMData);
    }

    /**
     * Create Followup Message
     *
     * Create a followup message for an interaction
     *
     * @param interactionToken The token for the interaction to create a followup message to
     * @param followupInteractionResponseData The data for the message
     *
     * @returns {Promise<Message>} The created message
     */
    createFollowupMessage(interactionToken: string, followupInteractionResponseData: FollowupInteractionResponseData): Promise<Message> {
        return createFollowupMessage(this, interactionToken, followupInteractionResponseData);
    }

    /**
     * Create Global Command
     *
     * Create a global command
     *
     * @param createCommandData The data for the command
     *
     * @returns {Promise<Command>} The command
     */
    createGlobalCommand(createCommandData: CreateCommandData): Promise<Command> {
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
     * @returns {Promise<Command>} The command
     */
    createGuildCommand(guild: GuildResolvable, createCommandData: CreateCommandData): Promise<Command> {
        return createGuildCommand(this, guild, createCommandData);
    }

    /**
     * Create Guild
     *
     * Create a guild
     *
     * @param createGuildData The data for the guild
     *
     * @returns {Promise<Guild>} The created guild
     */
    createGuild(createGuildData: CreateGuildData): Promise<Guild> {
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
     * @param reason The reason for creating the channel
     *
     * @returns {Promise<AnyGuildChannel>} The created channel
     */
    createGuildChannel(guild: GuildResolvable, createGuildChannelData: CreateGuildChannelData, reason?: string): Promise<AnyGuildChannel> {
        return createGuildChannel(this, guild, createGuildChannelData, reason);
    }

    /**
     * Create Guild Emoji
     *
     * Create an emoji
     *
     * @param guild The guild to create an emoji in
     * @param createGuildEmojiData The data for the emoji
     * @param reason The reason for creating the emoji
     *
     * @returns {Promise<Emoji>} The created emoji
     */
    createGuildEmoji(guild: GuildResolvable, createGuildEmojiData: CreateGuildEmojiData, reason?: string): Promise<Emoji> {
        return createGuildEmoji(this, guild, createGuildEmojiData, reason);
    }

    /**
     * Create Guild From Template
     *
     * Create a guild from a template
     *
     * @param template The template to create the guild from
     * @param createGuildFromTemplateData The data for the guild
     *
     * @returns {Promise<Guild>} The created guild
     */
    createGuildFromTemplate(template: TemplateResolvable, createGuildFromTemplateData: CreateGuildFromTemplateData): Promise<Guild> {
        return createGuildFromTemplate(this, template, createGuildFromTemplateData);
    }

    /**
     * Create Guild Role
     *
     * Create a role
     *
     * @param guild The guild to create a role in
     * @param createGuildRoleData The data for the role
     * @param reason The reason for creating the role
     *
     * @returns {Promise<Role>} The created role
     */
    createGuildRole(guild: GuildResolvable, createGuildRoleData: CreateGuildRoleData, reason?: string): Promise<Role> {
        return createGuildRole(this, guild, createGuildRoleData, reason);
    }

    /**
     * Create Guild Template
     *
     * Create a template
     *
     * @param guild The guild to create a template in
     * @param createGuildTemplateData The data for the template
     *
     * @returns {Promise<Template>} The created template
     */
    createGuildTemplate(guild: GuildResolvable, createGuildTemplateData: CreateGuildTemplateData): Promise<Template> {
        return createGuildTemplate(this, guild, createGuildTemplateData);
    }

    /**
     * Create Interaction Response
     *
     * Create an interaction response
     *
     * @param interaction The interaction to respond to
     * @param interactionToken The token for the interaction to respond to
     * @param createInteractionResponseData The data for the response
     *
     * @returns {Promise<Message>} The created response
     */
    createInteractionResponse(interaction: InteractionResolvable, interactionToken: string, createInteractionResponseData: CreateInteractionResponseData): Promise<Message> {
        return createInteractionResponse(this, interaction, interactionToken, createInteractionResponseData);
    }

    /**
     * Create Message
     *
     * Send a message to a channel
     *
     * @param channel The channel to send this message to
     * @param createMessageData The data for the message
     *
     * @returns {Promise<Message>} The created message
     */
    createMessage(channel: ChannelResolvable, createMessageData: CreateMessageData): Promise<Message> {
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
     * @param reason The reason for creating the webhook
     *
     * @returns {Promise<Webhook>} The created webhook
     */
    createWebhook(channel: ChannelResolvable, createWebhookData: CreateWebhookData, reason?: string): Promise<Webhook> {
        return createWebhook(this, channel, createWebhookData, reason);
    }

    /**
     * Crosspost Message
     *
     * Publish a message in a news channel
     *
     * @param channel The channel to crosspost from
     * @param message The message to crosspost
     *
     * @returns {Promise<Message>} The crossposted message
     */
    crosspostMessage(channel: ChannelResolvable, message: MessageResolvable): Promise<Message> {
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
     * @param reason The reason for deleting the channel
     *
     * @returns {Promise<AnyChannel>} The deleted or closed channel
     */
    deleteChannel(channel: ChannelResolvable, reason?: string): Promise<AnyChannel> {
        return deleteChannel(this, channel, reason);
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
     * Delete Followup Message
     *
     * Delete a followup message to an interaction
     *
     * @param interactionToken The token for the interaction to delete the followup message for
     * @param message The message to delete
     */
    deleteFollowupMessage(interactionToken: string, message: MessageResolvable): Promise<void> {
        return deleteFollowupMessage(this, interactionToken, message);
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
     * @param reason The reason for deleting the emoji
     */
    deleteGuildEmoji(guild: GuildResolvable, emoji: EmojiResolvable, reason?: string): Promise<void> {
        return deleteGuildEmoji(this, guild, emoji, reason);
    }

    /**
     * Delete Guild Role
     *
     * Delete a role
     *
     * @param guild The guild to delete the role from
     * @param role The role to delete
     * @param reason The reason for deleting the role
     */
    deleteGuildRole(guild: GuildResolvable, role: RoleResolvable, reason?: string): Promise<void> {
        return deleteGuildRole(this, guild, role, reason);
    }

    /**
     * Delete Guild Template
     *
     * Delete a template
     *
     * @param guild The guild to delete the template in
     * @param template The template to delete
     *
     * @returns {Promise<Template>} The deleted template
     */
    deleteGuildTemplate(guild: GuildResolvable, template: TemplateResolvable): Promise<Template> {
        return deleteGuildTemplate(this, guild, template);
    }

    /**
     * Delete Invite
     *
     * Delete an invite
     *
     * @param channel The channel to delete the invite in
     * @param invite The invite to delete
     * @param reason The reason for deleting the invite
     *
     * @returns {Promise<Invite>} The deleted invite
     */
    deleteInvite(channel: ChannelResolvable, invite: InviteResolvable, reason?: string): Promise<Invite> {
        return deleteInvite(this, channel, invite, reason);
    }

    /**
     * Delete Message
     *
     * Delete a message
     *
     * @param channel The channel to delete the message in
     * @param message The message to delete
     * @param reason The reason for deleting the message
     */
    deleteMessage(channel: ChannelResolvable, message: MessageResolvable, reason?: string): Promise<void> {
        return deleteMessage(this, channel, message, reason);
    }

    /**
     * Delete Original Interaction Response
     *
     * Delete the original response to an interaction
     *
     * @param interactionToken The token for the interaction to delete the response for
     */
    deleteOriginalInteractionResponse(interactionToken: string): Promise<void> {
        return deleteOriginalInteractionResponse(this, interactionToken);
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
     * @param reason The reason for unpinning the message
     */
    deletePinnedChannelMessage(channel: ChannelResolvable, message: MessageResolvable, reason?: string): Promise<void> {
        return deletePinnedChannelMessage(this, channel, message, reason);
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
     * @param reason The reason for deleting the webhook
     */
    deleteWebhook(channel: ChannelResolvable, webhook: WebhookResolvable, reason?: string): Promise<void> {
        return deleteWebhook(this, channel, webhook, reason);
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
     * Edit Guild Command Permissions
     *
     * Edit the permissions of a command in a guild
     *
     * @param guild The guild to edit the command permissions in
     * @param command The command to edit the permissions for
     * @param editGuildCommandPermissionsData The data for editing the command permissions
     *
     * @returns {Promise<CommandPermissions>} The command permissions
     */
    editGuildCommandPermissions(guild: GuildResolvable, command: CommandResolvable, editGuildCommandPermissionsData: EditGuildCommandPermissionsData): Promise<CommandPermissions> {
        return editGuildCommandPermissions(this, guild, command, editGuildCommandPermissionsData);
    }

    /**
     * Edit Followup Message
     *
     * Edit a followup message to an interaction
     *
     * @param interactionToken The token for the interaction to edit the followup message for
     * @param message The message to edit
     * @param editInteractionResponseData The data for editing the message
     *
     * @returns {Promise<Message>} The edited message
     */
    editFollowupMessage(interactionToken: string, message: MessageResolvable, editInteractionResponseData: EditInteractionResponseData): Promise<Message> {
        return editFollowupMessage(this, interactionToken, message, editInteractionResponseData);
    }

    /**
     * Edit Global Command
     *
     * Edit a global command
     *
     * @param command The command to edit
     * @param editCommandData The data for the command
     *
     * @returns {Promise<Command>} The edited command
     */
    editGlobalCommand(command: CommandResolvable, editCommandData: EditCommandData): Promise<Command> {
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
     * @returns {Promise<Command>} The edited command
     */
    editGuildCommand(guild: GuildResolvable, command: CommandResolvable, editCommandData: EditCommandData): Promise<Command> {
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
     * @returns {Promise<Message>} The edited message
     */
    editMessage(channel: ChannelResolvable, message: MessageResolvable, editMessageData: EditMessageData): Promise<Message> {
        return editMessage(this, channel, message, editMessageData);
    }

    /**
     * Edit Original Interaction Response
     *
     * Edit the original response to an interaction
     *
     * @param interactionToken The token for the interaction to edit the response for
     * @param editInteractionResponseData The data for editing the response
     *
     * @returns {Promise<Message>} The edited response
     */
    editOriginalInteractionResponse(interactionToken: string, editInteractionResponseData: EditInteractionResponseData): Promise<Message> {
        return editOriginalInteractionResponse(this, interactionToken, editInteractionResponseData);
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
     * Get All Guild Command Permissions
     *
     * Get the permissions of a guild's commands
     *
     * @param guild The guild to get the command permissions from
     *
     * @returns {Promise<CommandPermissions[]>} The command permissions
     */
    getAllGuildCommandPermissions(guild: GuildResolvable): Promise<CommandPermissions[]> {
        return getAllGuildCommandPermissions(this, guild);
    }

    /**
     * Get Channel
     *
     * Get a channel
     *
     * @param channel The channel to get
     *
     * @returns {Promise<AnyChannel>} The channel
     */
    getChannel(channel: ChannelResolvable): Promise<AnyChannel | undefined> {
        return getChannel(this, channel);
    }

    /**
     * Get Channel Invites
     *
     * Get a channel's invites
     *
     * @param channel The channel to get the invites of
     *
     * @returns {Promise<Invite[]>} The invites
     */
    getChannelInvites(channel: ChannelResolvable): Promise<Invite[]> {
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
     * @returns {Promise<Message>} The message
     */
    getChannelMessage(channel: ChannelResolvable, message: MessageResolvable): Promise<Message | undefined> {
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
     * @returns {Promise<Message[]>} The messages
     */
    getChannelMessages(channel: ChannelResolvable, getChannelMessagesData?: GetChannelMessagesData): Promise<Message[]> {
        return getChannelMessages(this, channel, getChannelMessagesData);
    }

    /**
     * Get Channel Webhooks
     *
     * Get a channel's webhooks
     *
     * @param channel The channel to get the webhooks for
     *
     * @returns {Promise<Webhook[]>} The channel's webhooks
     */
    getChannelWebhooks(channel: ChannelResolvable): Promise<Webhook[]> {
        return getChannelWebhooks(this, channel);
    }

    /**
     * Get Current User
     *
     * Get the current user
     *
     * @returns {Promise<User>} The user
     */
    getCurrentUser(): Promise<User> {
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
     * @returns {Promise<Command>} The command
     */
    getGlobalCommand(command: CommandResolvable): Promise<Command | undefined> {
        return getGlobalCommand(this, command);
    }

    /**
     * Get Global Commands
     *
     * Get the global commands
     *
     * @returns {Promise<Command[]>} The commands
     */
    getGlobalCommands(): Promise<Command[]> {
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
     * @returns {Promise<Guild>} The guild
     */
    getGuild(guild: GuildResolvable, getGuildData?: GetGuildData): Promise<Guild | undefined> {
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
     * @returns {Promise<AuditLog>} The audit log
     */
    getGuildAuditLog(guild: GuildResolvable, getGuildAuditLogData?: GetGuildAuditLogData): Promise<AuditLog> {
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
     * @returns {Promise<Ban>} The ban
     */
    getGuildBan(guild: GuildResolvable, user: UserResolvable): Promise<Ban | undefined> {
        return getGuildBan(this, guild, user);
    }

    /**
     * Get Guild Bans
     *
     * Get a guild's bans
     *
     * @param guild The guild to get the bans for
     *
     * @returns {Promise<Ban[]>} The guild's bans
     */
    getGuildBans(guild: GuildResolvable): Promise<Ban[]> {
        return getGuildBans(this, guild);
    }

    /**
     * Get Guild Channels
     *
     * Get a guild's channels
     *
     * @param guild The guild to get the channels for
     *
     * @returns {Promise<AnyGuildChannel[]>} The guild's channels
     */
    getGuildChannels(guild: GuildResolvable): Promise<AnyGuildChannel[]> {
        return getGuildChannels(this, guild);
    }

    /**
     * Get Guild Command
     *
     * Get a command from a guild
     *
     * @param guild The guild to get the command from
     * @param command The command to get
     *
     * @returns {Promise<Command>} The command
     */
    getGuildCommand(guild: GuildResolvable, command: CommandResolvable): Promise<Command | undefined> {
        return getGuildCommand(this, guild, command);
    }

    /**
     * Get Guild Command Permissions
     *
     * Get the permissions of a guild's command
     *
     * @param guild The guild to get the command permissions from
     * @param command The command to get the permissions for
     *
     * @returns {Promise<CommandPermissions>} The command permissions
     */
    getGuildCommandPermissions(guild: GuildResolvable, command: CommandResolvable): Promise<CommandPermissions | undefined> {
        return getGuildCommandPermissions(this, guild, command);
    }

    /**
     * Get Guild Commands
     *
     * Get a guild's commands
     *
     * @param guild The guild to get the commands from
     *
     * @returns {Promise<Command[]>} The commands
     */
    getGuildCommands(guild: GuildResolvable): Promise<Command[]> {
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
     * @returns {Promise<Emoji>} The emoji
     */
    getGuildEmoji(guild: GuildResolvable, emoji: EmojiResolvable): Promise<Emoji | undefined> {
        return getGuildEmoji(this, guild, emoji);
    }

    /**
     * Get Guild Invites
     *
     * Get a guild's invites
     *
     * @param guild The guild to get the invites for
     *
     * @returns {Promise<Invite[]>} The invites
     */
    getGuildInvites(guild: GuildResolvable): Promise<Invite[]> {
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
     * @returns {Promise<Member>} The member
     */
    getGuildMember(guild: GuildResolvable, user: UserResolvable): Promise<Member | undefined> {
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
     * @returns {Promise<Role[]>} The guild's roles
     */
    getGuildRoles(guild: GuildResolvable): Promise<Role[]> {
        return getGuildRoles(this, guild);
    }

    /**
     * Get Guild Templates
     *
     * Get a guild's templates
     *
     * @param guild The guild to get the templates for
     *
     * @returns {Promise<Template[]>} The guild's templates
     */
    getGuildTemplates(guild: GuildResolvable): Promise<Template[]> {
        return getGuildTemplates(this, guild);
    }

    /**
     * Get Guild Vanity URL
     *
     * Get a guild's vanity invite
     *
     * @param guild The guild to get the vanity invite for
     *
     * @returns {Promise<VanityInvite>} The vanity invite
     */
    getGuildVanityURL(guild: GuildResolvable): Promise<VanityInvite | undefined> {
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
     * @returns {Promise<Webhook[]>} The guild's webhooks
     */
    getGuildWebhooks(guild: GuildResolvable): Promise<Webhook[]> {
        return getGuildWebhooks(this, guild);
    }

    /**
     * Get Guild Welcome Screen
     *
     * Get a guild's welcome screen
     *
     * @param guild The guild to get the welcome screen from
     *
     * @returns {Promise<WelcomeScreen | undefined>} The guild's welcome screen or `undefined` if the guild doesn't have one
     */
    getGuildWelcomeScreen(guild: GuildResolvable): Promise<WelcomeScreen | undefined> {
        return getGuildWelcomeScreen(this, guild);
    }

    /**
     * Get Guild Widget Settings
     *
     * Get a guild's widget settings
     *
     * @param guild The guild to get the widget for
     *
     * @returns {Promise<GuildWidget>} The guild widget
     */
    getGuildWidgetSettings(guild: GuildResolvable): Promise<GuildWidget> {
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
     * @returns {Promise<Invite>} The invite
     */
    getInvite(invite: InviteResolvable, getInviteData?: GetInviteData): Promise<Invite | undefined> {
        return getInvite(this, invite, getInviteData);
    }

    /**
     * Get Pinned Messages
     *
     * Get a channel's pinned messages
     *
     * @param channel The channel to get the pinned messages of
     *
     * @returns {Promise<Message[]>} The messages
     */
    getPinnedMessages(channel: ChannelResolvable): Promise<Message[]> {
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
     * @returns {Promise<User[]>} The users
     */
    getReactions(channel: ChannelResolvable, message: MessageResolvable, reactionEmoji: ReactionEmojiResolvable, getReactionsData?: GetReactionsData): Promise<User[]> {
        return getReactions(this, channel, message, reactionEmoji, getReactionsData);
    }

    /**
     * Get Template
     *
     * Get a template
     *
     * @param template The template to get
     *
     * @returns {Promise<Template>} The template
     */
    getTemplate(template: TemplateResolvable): Promise<Template | undefined> {
        return getTemplate(this, template);
    }

    /**
     * Get User
     *
     * Get a user
     *
     * @param user The user to get
     *
     * @returns {Promise<User>} The user
     */
    getUser(user: UserResolvable): Promise<User | undefined> {
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
     * @returns {Promise<Webhook>} The webhook
     */
    getWebhook(channel: ChannelResolvable, webhook: WebhookResolvable): Promise<Webhook | undefined> {
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
     * @returns {Promise<Emoji[]>} The emojis
     */
    listGuildEmojis(guild: GuildResolvable): Promise<Emoji[]> {
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
     * @returns {Promise<Member[]>} The members
     */
    listGuildMembers(guild: GuildResolvable, listGuildMembersData?: ListGuildMembersData): Promise<Member[]> {
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
     * @param reason The reason for modifying the channel
     *
     * @returns {Promise<AnyGuildChannel>} The modified channel
     */
    modifyChannel(channel: ChannelResolvable, modifyChannelData: ModifyChannelData, reason?: string): Promise<AnyGuildChannel> {
        return modifyChannel(this, channel, modifyChannelData, reason);
    }

    /**
     * Modify Current User
     *
     * Modify the current user
     *
     * @param modifyCurrentUserData The data to modify the current user
     *
     * @returns {Promise<User>} The modified user
     */
    modifyCurrentUser(modifyCurrentUserData: ModifyCurrentUserData): Promise<User> {
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
     * @param reason The reason for modifing the guild
     *
     * @returns {Promise<Guild>} The modified guild
     */
    modifyGuild(guild: GuildResolvable, modifyGuildData: ModifyGuildData, reason?: string): Promise<Guild> {
        return modifyGuild(this, guild, modifyGuildData, reason);
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
     * @param reason The reason for modifying the emoji
     *
     * @returns {Promise<Emoji>} The modified emoji
     */
    modifyGuildEmoji(guild: GuildResolvable, emoji: EmojiResolvable, modifyGuildEmojiData: ModifyGuildEmojiData, reason?: string): Promise<Emoji> {
        return modifyGuildEmoji(this, guild, emoji, modifyGuildEmojiData, reason);
    }

    /**
     * Modify Guild Member
     *
     * Modify a member
     *
     * @param guild The guild to modify the member in
     * @param user The user resolvable for the member to modify
     * @param modifyGuildMemberData The data to modify the member
     * @param reason The reason for modifying the member
     *
     * @returns {Promise<Member>} The modified member
     */
    modifyGuildMember(guild: GuildResolvable, user: UserResolvable, modifyGuildMemberData: ModifyGuildMemberData, reason?: string): Promise<Member> {
        return modifyGuildMember(this, guild, user, modifyGuildMemberData, reason);
    }

    /**
     * Modify Guild Role
     *
     * Modify a role
     *
     * @param guild The guild to modify the role in
     * @param role The role to modify
     * @param modifyGuildRoleData The data to modify the role
     * @param reason The reason for modifying the role
     *
     * @returns {Promise<Role>} The modified role
     */
    modifyGuildRole(guild: GuildResolvable, role: RoleResolvable, modifyGuildRoleData: ModifyGuildRoleData, reason?: string): Promise<Role> {
        return modifyGuildRole(this, guild, role, modifyGuildRoleData, reason);
    }

    /**
     * Modify Guild Role Positions
     *
     * Modify the positions of roles in a guild
     *
     * @param guild The guild to modify role positions in
     * @param modifyGuildRolePositionsData The data to modify the role positions
     *
     * @returns {Promise<Role[]>} The guild's roles
     */
    modifyGuildRolePositions(guild: GuildResolvable, modifyGuildRolePositionsData: ModifyGuildRolePositionsData[]): Promise<Role[]> {
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
     * @returns {Promise<Template>} The modified template
     */
    modifyGuildTemplate(guild: GuildResolvable, template: TemplateResolvable, modifyGuildTemplateData: ModifyGuildTemplateData): Promise<Template> {
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
     * @returns {Promise<WelcomeScreen>} The modified welcome screen
     */
    modifyGuildWelcomeScreen(guild: GuildResolvable, modifyGuildWelcomeScreenData: ModifyGuildWelcomeScreenData): Promise<WelcomeScreen> {
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
     * @returns {Promise<GuildWidget>} The modified guild widget
     */
    modifyGuildWidget(guild: GuildResolvable, modifyGuildWidgetData: ModifyGuildWidgetData): Promise<GuildWidget> {
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
     * @param reason The reason for modifying the webhook
     *
     * @returns {Promise<Webhook>} The modified webhook
     */
    modifyWebhook(channel: ChannelResolvable, webhook: WebhookResolvable, modifyWebhookData: ModifyWebhookData, reason?: string): Promise<Webhook> {
        return modifyWebhook(this, channel, webhook, modifyWebhookData, reason);
    }

    /**
     * Remove Guild Ban
     *
     * Unban a user from a guild
     *
     * @param guild The guild to unban the user from
     * @param user The user to unban
     * @param reason The reason for unbanning the user
     */
    removeGuildBan(guild: GuildResolvable, user: UserResolvable, reason?: string): Promise<void> {
        return removeGuildBan(this, guild, user, reason);
    }

    /**
     * Remove Guild Member
     *
     * Kick a member
     *
     * @param guild The guild to kick the member from
     * @param user The user resolvable for the member to kick
     * @param reason The reason for kicking the member
     */
    removeGuildMember(guild: GuildResolvable, user: UserResolvable, reason?: string): Promise<void> {
        return removeGuildMember(this, guild, user, reason);
    }

    /**
     * Remove Guild Member Role
     *
     * Remove a role from a member
     *
     * @param guild The guild to remove the role in
     * @param user The user resolvable for the member to remove the role from
     * @param role The role to remove
     * @param reason The reason for removing the role
     */
    removeGuildMemberRole(guild: GuildResolvable, user: UserResolvable, role: RoleResolvable, reason?: string): Promise<void> {
        return removeGuildMemberRole(this, guild, user, role, reason);
    }

    /**
     * Search Guild Members
     *
     * Search a guild's members by username or nickname
     *
     * @param guild The guild to search the members in
     * @param searchGuildMembersData The data for searching the members
     *
     * @returns {Promise<Member[]>} The members
     */
    searchGuildMembers(guild: GuildResolvable, searchGuildMembersData: SearchGuildMembersData): Promise<Member[]> {
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
     * @returns {Promise<Template>} The synced template
     */
    syncGuildTemplate(guild: GuildResolvable, template: TemplateResolvable): Promise<Template> {
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