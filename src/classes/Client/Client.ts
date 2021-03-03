import EventEmitter from "events";
import WebSocket from "ws";
import {
    AnyChannel,
    AnyGuildChannel,
    ACTIVITY_TYPE_COMPETING,
    ACTIVITY_TYPE_LISTENING,
    ACTIVITY_TYPE_PLAYING,
    ACTIVITY_TYPE_STREAMING,
    Ban,
    BulkDeleteMessagesData,
    ChannelPinsUpdateData,
    ChannelResolvable,
    CreateChannelInviteData,
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
    DMChannel,
    EditChannelPermissionsData,
    EditMessageData,
    Emoji,
    EmojiResolvable,
    FetchedData,
    FetchQueue,
    FollowedChannel,
    FollowNewsChannelData,
    GetChannelMessagesData,
    GetCurrentUserGuildsData,
    GetGuildData,
    GetInviteData,
    GetReactionsData,
    Guild,
    GuildChannel,
    GuildCreateData,
    GuildDeleteData,
    GuildEmojisUpdateData,
    GuildIntegrationsUpdateData,
    GuildMemberUpdateData,
    GuildPreview,
    GuildResolvable,
    GuildRoleDeleteData,
    GuildWidget,
    Intent,
    Invite,
    InviteDeleteData,
    InviteResolvable,
    ListGuildMembersData,
    Member,
    Message,
    MessageDeleteBulkData,
    MessageDeleteData,
    MessageReactionAddData,
    MessageReactionRemoveAllData,
    MessageReactionRemoveData,
    MessageReactionRemoveEmojiData,
    MessageResolvable,
    MessageUpdateData,
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
    ModifyGuildWidgetData,
    PartialGuild,
    Presence,
    ReactionEmojiResolvable,
    ReadyData,
    RequestOptions,
    Role,
    RoleResolvable,
    Status,
    Template,
    TemplateResolvable,
    TypingStartData,
    User,
    UserResolvable,
    VanityInvite,
    VoiceRegion,
    VoiceState,
    Webhook,
    WebhooksUpdateData
} from "../../internal";
import addGuildMemberRole from "./apiMethods/addGuildMemberRole";
import addPinnedChannelMessage from "./apiMethods/addPinnedChannelMessage";
import bulkDeleteMessages from "./apiMethods/bulkDeleteMessages";
import createChannelInvite from "./apiMethods/createChannelInvite";
import createDM from "./apiMethods/createDM";
import createGuild from "./apiMethods/createGuild";
import createGuildBan from "./apiMethods/createGuildBan";
import createGuildChannel from "./apiMethods/createGuildChannel";
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
import deleteGuild from "./apiMethods/deleteGuild";
import deleteGuildEmoji from "./apiMethods/deleteGuildEmoji";
import deleteGuildRole from "./apiMethods/deleteGuildRole";
import deleteGuildTemplate from "./apiMethods/deleteGuildTemplate";
import deleteInvite from "./apiMethods/deleteInvite";
import deleteMessage from "./apiMethods/deleteMessage";
import deleteOwnReaction from "./apiMethods/deleteOwnReaction";
import deletePinnedChannelMessage from "./apiMethods/deletePinnedChannelMessage";
import deleteUserReaction from "./apiMethods/deleteUserReaction";
import editChannelPermissions from "./apiMethods/editChannelPermissions";
import editMessage from "./apiMethods/editMessage";
import followNewsChannel from "./apiMethods/followNewsChannel";
import getChannel from "./apiMethods/getChannel";
import getChannelInvites from "./apiMethods/getChannelInvites";
import getChannelMessage from "./apiMethods/getChannelMessage";
import getChannelMessages from "./apiMethods/getChannelMessages";
import getCurrentUser from "./apiMethods/getCurrentUser";
import getCurrentUserGuilds from "./apiMethods/getCurrentUserGuilds";
import getGuild from "./apiMethods/getGuild";
import getGuildBan from "./apiMethods/getGuildBan";
import getGuildBans from "./apiMethods/getGuildBans";
import getGuildChannels from "./apiMethods/getGuildChannels";
import getGuildEmoji from "./apiMethods/getGuildEmoji";
import getGuildInvites from "./apiMethods/getGuildInvites";
import getGuildMember from "./apiMethods/getGuildMember";
import getGuildPreview from "./apiMethods/getGuildPreview";
import getGuildRoles from "./apiMethods/getGuildRoles";
import getGuildTemplates from "./apiMethods/getGuildTemplates";
import getGuildVanityURL from "./apiMethods/getGuildVanityURL";
import getGuildVoiceRegions from "./apiMethods/getGuildVoiceRegions";
import getGuildWidgetSettings from "./apiMethods/getGuildWidgetSettings";
import getInvite from "./apiMethods/getInvite";
import getPinnedMessages from "./apiMethods/getPinnedMessages";
import getReactions from "./apiMethods/getReactions";
import getTemplate from "./apiMethods/getTemplate";
import getUser from "./apiMethods/getUser";
import leaveGuild from "./apiMethods/leaveGuild";
import listGuildEmojis from "./apiMethods/listGuildEmojis";
import listGuildMembers from "./apiMethods/listGuildMembers";
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
import modifyGuildWidget from "./apiMethods/modifyGuildWidget";
import removeGuildBan from "./apiMethods/removeGuildBan";
import removeGuildMember from "./apiMethods/removeGuildMember";
import removeGuildMemberRole from "./apiMethods/removeGuildMemberRole";
import syncGuildTemplate from "./apiMethods/syncGuildTemplate";
import triggerTypingIndicator from "./apiMethods/triggerTypingIndicator";
import connect from "./connect";
import fetch from "./fetch";
import getFetchQueue from "./getFetchQueue";

export interface ClientData {
    token: string;
    presence?: ClientPresence;
    intents: Intent[];
}

export interface ClientPresence {
    status?: ClientStatus;
    afk?: boolean;
    activities?: ClientActivity[];
    since?: number;
}

export type ClientStatus = Status | "invisible";

export interface ClientActivity {
    name: string;
    type: ClientActivityType;
    url?: string;
}

export type ClientActivityType = typeof ACTIVITY_TYPE_PLAYING | typeof ACTIVITY_TYPE_STREAMING | typeof ACTIVITY_TYPE_LISTENING | typeof ACTIVITY_TYPE_COMPETING;

export interface EventQueueEvent {
    type: string;
    data: any;
}

export type ReadyState = typeof READY_STATE_NONE | typeof READY_STATE_INITIAL_GUILDS | typeof READY_STATE_READY;
export const READY_STATE_NONE = 0;
export const READY_STATE_INITIAL_GUILDS = 1;
export const READY_STATE_READY = 2;

export interface UnemittedReadyData {
    data: ReadyData;
    rawData: any;
}

export default interface Client {
    on(event: "ready", listener: (data: ReadyData, rawData: any) => void): this;
    on(event: "channelCreate", listener: (channel: AnyGuildChannel, rawData: any) => void): this;
    on(event: "channelDelete", listener: (channel: AnyGuildChannel, rawData: any) => void): this;
    on(event: "channelPinsUpdate", listener: (data: ChannelPinsUpdateData, rawData: any) => void): this;
    on(event: "channelUpdate", listener: (channel: AnyGuildChannel, rawData: any) => void): this;
    on(event: "guildAvailable", listener: (data: GuildCreateData, rawData: any) => void): this;
    on(event: "guildBanAdd", listener: (user: User, rawData: any) => void): this;
    on(event: "guildBanRemove", listener: (user: User, rawData: any) => void): this;
    on(event: "guildCreate", listener: (data: GuildCreateData, rawData: any) => void): this;
    on(event: "guildDelete", listener: (data: GuildDeleteData, rawData: any) => void): this;
    on(event: "guildEmojisUpdate", listener: (data: GuildEmojisUpdateData, rawData: any) => void): this;
    on(event: "guildIntegrationsUpdate", listener: (data: GuildIntegrationsUpdateData, rawData: any) => void): this;
    on(event: "guildMemberAdd", listener: (member: Member, rawData: any) => void): this;
    on(event: "guildMemberRemove", listener: (user: User, rawData: any) => void): this;
    on(event: "guildMemberUpdate", listener: (data: GuildMemberUpdateData, rawData: any) => void): this;
    on(event: "guildRoleCreate", listener: (role: Role, rawData: any) => void): this;
    on(event: "guildRoleDelete", listener: (data: GuildRoleDeleteData, rawData: any) => void): this;
    on(event: "guildRoleUpdate", listener: (role: Role, rawData: any) => void): this;
    on(event: "guildUnavailable", listener: (data: GuildDeleteData, rawData: any) => void): this;
    on(event: "guildUpdate", listener: (guild: Guild, rawData: any) => void): this;
    on(event: "inviteCreate", listener: (invite: Invite, rawData: any) => void): this;
    on(event: "inviteDelete", listener: (data: InviteDeleteData, rawData: any) => void): this;
    on(event: "messageCreate", listener: (message: Message, rawData: any) => void): this;
    on(event: "messageDelete", listener: (data: MessageDeleteData, rawData: any) => void): this;
    on(event: "messageDeleteBulk", listener: (data: MessageDeleteBulkData, rawData: any) => void): this;
    on(event: "messageReactionAdd", listener: (data: MessageReactionAddData, rawData: any) => void): this;
    on(event: "messageReactionRemove", listener: (data: MessageReactionRemoveData, rawData: any) => void): this;
    on(event: "messageReactionRemoveAll", listener: (data: MessageReactionRemoveAllData, rawData: any) => void): this;
    on(event: "messageReactionRemoveEmoji", listener: (data: MessageReactionRemoveEmojiData, rawData: any) => void): this;
    on(event: "messageUpdate", listener: (data: MessageUpdateData, rawData: any) => void): this;
    on(event: "presenceUpdate", listener: (presence: Presence, rawData: any) => void): this;
    on(event: "typingStart", listener: (data: TypingStartData, rawData: any) => void): this;
    on(event: "userUpdate", listener: (user: User, rawData: any) => void): this;
    on(event: "voiceStateUpdate", listener: (voiceState: VoiceState, rawData: any) => void): this;
    on(event: "webhooksUpdate", listener: (data: WebhooksUpdateData, rawData: any) => void): this;
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
    avatar?: string;

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
     * Initial Presence
     *
     * The bot's initial presence
     */
    _initialPresence?: ClientPresence;

    /**
     * Intents
     *
     * The bot's intents
     */
    _intents: Intent[];

    /**
     * Fetch Queues
     *
     * Queues for fetching data from the API
     */
    _fetchQueues: Map<string, FetchQueue>;

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
        this._initialPresence = clientData.presence;
        this._intents = clientData.intents;
        this._fetchQueues = new Map();

        // Connect
        this._connect();
    }

    /**
     * Connect
     *
     * Connect to the gateway
     */
    _connect = () => connect(this);

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
    fetch = (requestOptions: RequestOptions): Promise<FetchedData> => fetch(this, requestOptions);

    /**
     * Get Fetch Queue
     *
     * Get a fetch queue for a route, and create one if it doesn't already exist
     *
     * @param route The route for the fetch queue
     *
     * @returns {FetchQueue} The fetch queue
     */
    _getFetchQueue = (route: string): FetchQueue => getFetchQueue(this, route);

    /**
     * Add Guild Member Role
     *
     * Add a role to a member
     *
     * @param guild The guild to add the role in
     * @param user The user resolvable for the member to add the role to
     * @param role The role to add
     */
    addGuildMemberRole = (guild: GuildResolvable, user: UserResolvable, role: RoleResolvable): Promise<void> => addGuildMemberRole(this, guild, user, role);

    /**
     * Add Pinned Channel Message
     *
     * Pin a message to a channel
     *
     * @param channel The channel to pin the messages in
     * @param message The message to pin
     */
    addPinnedChannelMessage = (channel: ChannelResolvable, message: MessageResolvable): Promise<void> => addPinnedChannelMessage(this, channel, message);

    /**
     * Bulk Delete Messages
     *
     * Bulk delete messages
     *
     * @param channel The channel to delete the messages in
     * @param bulkDeleteMessagesData The data for bulk deleting messages
     */
    bulkDeleteMessages = (channel: ChannelResolvable, bulkDeleteMessagesData: BulkDeleteMessagesData): Promise<void> => bulkDeleteMessages(this, channel, bulkDeleteMessagesData);

    /**
     * Create Channel Invite
     *
     * Create an invite
     *
     * @param channel The channel to create an invite in
     * @param createChannelInviteData The data for the invite
     *
     * @returns {Promise<Invite>} The invite
     */
    createChannelInvite = (channel: ChannelResolvable, createChannelInviteData?: CreateChannelInviteData): Promise<Invite> => createChannelInvite(this, channel, createChannelInviteData);

    /**
     * Create DM
     *
     * Create a DM
     *
     * @param createDMData The data for the DM
     *
     * @returns {Promise<DMChannel[]>} The DM channel
     */
    createDM = (createDMData: CreateDMData): Promise<DMChannel> => createDM(this, createDMData);

    /**
     * Create Guild
     *
     * Create a guild
     *
     * @param createGuildData The data for the guild
     *
     * @returns {Promise<Guild>} The created guild
     */
    createGuild = (createGuildData: CreateGuildData): Promise<Guild> => createGuild(this, createGuildData);

    /**
     * Create Guild Ban
     *
     * Ban a user from a guild
     *
     * @param guild The guild to ban the user from
     * @param user The user to ban
     * @param createGuildBanData The data for the ban
     */
    createGuildBan = (guild: GuildResolvable, user: UserResolvable, createGuildBanData?: CreateGuildBanData): Promise<void> => createGuildBan(this, guild, user, createGuildBanData);

    /**
     * Create Guild Channel
     *
     * Create a channel in a guild
     *
     * @param guild The guild to create a channel in
     * @param createGuildChannelData The data for the channel
     *
     * @returns {Promise<AnyGuildChannel>} The created channel
     */
    createGuildChannel = (guild: GuildResolvable, createGuildChannelData: CreateGuildChannelData): Promise<AnyGuildChannel> => createGuildChannel(this, guild, createGuildChannelData);

    /**
     * Create Guild Emoji
     *
     * Create an emoji
     *
     * @param guild The guild to create an emoji in
     * @param createGuildEmojiData The data for the emoji
     *
     * @returns {Promise<Emoji>} The created emoji
     */
    createGuildEmoji = (guild: GuildResolvable, createGuildEmojiData: CreateGuildEmojiData): Promise<Emoji> => createGuildEmoji(this, guild, createGuildEmojiData);

    /**
     * Create Guild From Template
     *
     * Create a guild from a template
     *
     * @param template The template to create the guild from
     * @param createGuildFromTemplateData The data for the ban
     *
     * @returns {Promise<Guild>} The created guild
     */
    createGuildFromTemplate = (template: TemplateResolvable, createGuildFromTemplateData: CreateGuildFromTemplateData): Promise<Guild> => createGuildFromTemplate(this, template, createGuildFromTemplateData);

    /**
     * Create Guild Role
     *
     * Create a role
     *
     * @param guild The guild to create a role in
     * @param createGuildRoleData The data for the role
     *
     * @returns {Promise<Role>} The created role
     */
    createGuildRole = (guild: GuildResolvable, createGuildRoleData: CreateGuildRoleData): Promise<Role> => createGuildRole(this, guild, createGuildRoleData);

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
    createGuildTemplate = (guild: GuildResolvable, createGuildTemplateData: CreateGuildTemplateData): Promise<Template> => createGuildTemplate(this, guild, createGuildTemplateData);

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
    createMessage = (channel: ChannelResolvable, createMessageData: CreateMessageData): Promise<Message> => createMessage(this, channel, createMessageData);

    /**
     * Create Reaction
     *
     * Add a reaction to a message
     *
     * @param channel The channel to create the reaction in
     * @param message The message to create the reaction on
     * @param reactionEmoji The emoji to react with
     */
    createReaction = (channel: ChannelResolvable, message: MessageResolvable, reactionEmoji: ReactionEmojiResolvable): Promise<void> => createReaction(this, channel, message, reactionEmoji);

    /**
     * Create Webhook
     *
     * Create a webhook
     *
     * @param channel The channel to create a webhook in
     * @param createWebhookData The data for the webhook
     *
     * @returns {Promise<Webhook>} The created webhook
     */
    createWebhook = (channel: ChannelResolvable, createWebhookData: CreateWebhookData): Promise<Webhook> => createWebhook(this, channel, createWebhookData);

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
    crosspostMessage = (channel: ChannelResolvable, message: MessageResolvable): Promise<Message> => crosspostMessage(this, channel, message);

    /**
     * Delete All Reactions
     *
     * Remove all reactions from a message
     *
     * @param channel The channel to delete the reactions in
     * @param message The message to delete the reactions from
     */
    deleteAllReactions = (channel: ChannelResolvable, message: MessageResolvable): Promise<void> => deleteAllReactions(this, channel, message);

    /**
     * Delete All Reactions for Emoji
     *
     * Remove all reactions from a message for a specific emoji
     *
     * @param channel The channel to delete the reactions in
     * @param message The message to delete the reactions from
     * @param reactionEmoji The emoji to delete reactions for
     */
    deleteAllReactionsForEmoji = (channel: ChannelResolvable, message: MessageResolvable, reactionEmoji: ReactionEmojiResolvable): Promise<void> => deleteAllReactionsForEmoji(this, channel, message, reactionEmoji);

    /**
     * Delete Channel
     *
     * Delete a channel or close a DM channel
     *
     * @param channel The channel to delete or close
     *
     * @returns {Promise<AnyChannel>} The deleted or closed channel
     */
    deleteChannel = (channel: ChannelResolvable): Promise<AnyChannel> => deleteChannel(this, channel);

    /**
     * Delete Channel Permission
     *
     * Delete a permission from a channel
     *
     * @param channel The channel to delete the permission from
     * @param roleOrUser The role or user's permissions to delete
     */
    deleteChannelPermission = (channel: ChannelResolvable, roleOrUser: RoleResolvable | UserResolvable): Promise<void> => deleteChannelPermission(this, channel, roleOrUser);

    /**
     * Delete Guild
     *
     * Delete a guild
     *
     * @param guild The guild to delete
     */
    deleteGuild = (guild: GuildResolvable): Promise<void> => deleteGuild(this, guild);

    /**
     * Delete Guild Emoji
     *
     * Delete an emoji
     *
     * @param guild The guild to delete the emoji from
     * @param emoji The emoji to delete
     */
    deleteGuildEmoji = (guild: GuildResolvable, emoji: EmojiResolvable): Promise<void> => deleteGuildEmoji(this, guild, emoji);

    /**
     * Delete Guild Role
     *
     * Delete a role
     *
     * @param guild The guild to delete the role from
     * @param role The role to delete
     */
    deleteGuildRole = (guild: GuildResolvable, role: RoleResolvable): Promise<void> => deleteGuildRole(this, guild, role);

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
    deleteGuildTemplate = (guild: GuildResolvable, template: TemplateResolvable): Promise<Template> => deleteGuildTemplate(this, guild, template);

    /**
     * Delete Invite
     *
     * Delete an invite
     *
     * @param invite The invite to delete
     *
     * @returns {Promise<Invite>} The deleted invite
     */
    deleteInvite = (invite: InviteResolvable): Promise<Invite> => deleteInvite(this, invite);

    /**
     * Delete Message
     *
     * Delete a message
     *
     * @param channel The channel to delete the message in
     * @param message The message to delete
     */
    deleteMessage = (channel: ChannelResolvable, message: MessageResolvable): Promise<void> => deleteMessage(this, channel, message);

    /**
     * Delete Own Reaction
     *
     * Remove the client's reaction from a message
     *
     * @param channel The channel to delete the reaction in
     * @param message The message to delete the reaction from
     * @param reactionEmoji The emoji to unreact with
     */
    deleteOwnReaction = (channel: ChannelResolvable, message: MessageResolvable, reactionEmoji: ReactionEmojiResolvable): Promise<void> => deleteOwnReaction(this, channel, message, reactionEmoji);

    /**
     * Delete Pinned Channel Message
     *
     * Unpin a message from a channel
     *
     * @param channel The channel to unpin the messages from
     * @param message The message to unpin
     */
    deletePinnedChannelMessage = (channel: ChannelResolvable, message: MessageResolvable): Promise<void> => deletePinnedChannelMessage(this, channel, message);

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
    deleteUserReaction = (channel: ChannelResolvable, message: MessageResolvable, reactionEmoji: ReactionEmojiResolvable, user: UserResolvable): Promise<void> => deleteUserReaction(this, channel, message, reactionEmoji, user);

    /**
     * Edit Channel Permissions
     *
     * Edit the permissions for a channel
     *
     * @param channel The channel to edit the permissions for
     * @param roleOrUser The role or user's permissions to edit
     * @param editChannelPermissionsData The data for editing the channel permissions
     */
    editChannelPermissions = (channel: ChannelResolvable, roleOrUser: RoleResolvable | UserResolvable, editChannelPermissionsData: EditChannelPermissionsData): Promise<void> => editChannelPermissions(this, channel, roleOrUser, editChannelPermissionsData);

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
    editMessage = (channel: ChannelResolvable, message: MessageResolvable, editMessageData: EditMessageData): Promise<Message> => editMessage(this, channel, message, editMessageData);

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
    followNewsChannel = (channel: ChannelResolvable, followNewsChannelData: FollowNewsChannelData): Promise<FollowedChannel> => followNewsChannel(this, channel, followNewsChannelData);

    /**
     * Get Channel
     *
     * Get a channel
     *
     * @param channel The channel to get
     *
     * @returns {Promise<AnyChannel>} The channel
     */
    getChannel = (channel: ChannelResolvable): Promise<AnyChannel> => getChannel(this, channel);

    /**
     * Get Channel Invites
     *
     * Get a channel's invites
     *
     * @param channel The channel to get the invites of
     *
     * @returns {Promise<Invite[]>} The invites
     */
    getChannelInvites = (channel: ChannelResolvable): Promise<Invite[]> => getChannelInvites(this, channel);

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
    getChannelMessage = (channel: ChannelResolvable, message: MessageResolvable): Promise<Message> => getChannelMessage(this, channel, message);

    /**
     * Get Channel Messages
     *
     * Get a channel's messages
     *
     * @param channel The channel to get messages from
     * @param getChannelMessagesData The data for getting messages from the channel
     *
     * @returns {Promise<Message[]>} The messages
     */
    getChannelMessages = (channel: ChannelResolvable, getChannelMessagesData?: GetChannelMessagesData): Promise<Message[]> => getChannelMessages(this, channel, getChannelMessagesData);

    /**
     * Get Current User
     *
     * Get the current user
     *
     * @returns {Promise<User>} The user
     */
    getCurrentUser = (): Promise<User> => getCurrentUser(this);

    /**
     * Get Current User Guilds
     *
     * Get the current user's guilds
     *
     * @param getCurrentUserGuildsData The data for getting the current user's guilds
     *
     * @returns {Promise<PartialGuild[]>} The guilds
     */
    getCurrentUserGuilds = (getCurrentUserGuildsData?: GetCurrentUserGuildsData): Promise<PartialGuild[]> => getCurrentUserGuilds(this, getCurrentUserGuildsData);

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
    getGuild = (guild: GuildResolvable, getGuildData?: GetGuildData): Promise<Guild> => getGuild(this, guild, getGuildData);

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
    getGuildBan = (guild: GuildResolvable, user: UserResolvable): Promise<Ban> => getGuildBan(this, guild, user);

    /**
     * Get Guild Bans
     *
     * Get a guild's bans
     *
     * @param guild The guild to get the bans for
     *
     * @returns {Promise<Ban[]>} The guild's bans
     */
    getGuildBans = (guild: GuildResolvable): Promise<Ban[]> => getGuildBans(this, guild);

    /**
     * Get Guild Channels
     *
     * Get a guild's channels
     *
     * @param guild The guild to get the channels for
     *
     * @returns {Promise<GuildChannel[]>} The guild's channels
     */
    getGuildChannels = (guild: GuildResolvable): Promise<GuildChannel[]> => getGuildChannels(this, guild);

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
    getGuildEmoji = (guild: GuildResolvable, emoji: EmojiResolvable): Promise<Emoji> => getGuildEmoji(this, guild, emoji);

    /**
     * Get Guild Invites
     *
     * Get a guild's invites
     *
     * @param guild The guild to get the invites for
     *
     * @returns {Promise<Invite[]>} The guild's invites
     */
    getGuildInvites = (guild: GuildResolvable): Promise<Invite[]> => getGuildInvites(this, guild);

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
    getGuildMember = (guild: GuildResolvable, user: UserResolvable): Promise<Member> => getGuildMember(this, guild, user);

    /**
     * Get Guild Preview
     *
     * Get a guild preview
     *
     * @param guild The guild to get the preview from
     *
     * @returns {Promise<GuildPreview>} The guild preview
     */
    getGuildPreview = (guild: GuildResolvable): Promise<GuildPreview> => getGuildPreview(this, guild);

    /**
     * Get Guild Roles
     *
     * Get a guild's roles
     *
     * @param guild The guild to get the roles for
     *
     * @returns {Promise<Role[]>} The guild's roles
     */
    getGuildRoles = (guild: GuildResolvable): Promise<Role[]> => getGuildRoles(this, guild);

    /**
     * Get Guild Templates
     *
     * Get a guild's templates
     *
     * @param guild The guild to get the templates for
     *
     * @returns {Promise<Template[]>} The guild's templates
     */
    getGuildTemplates = (guild: GuildResolvable): Promise<Template[]> => getGuildTemplates(this, guild);

    /**
     * Get Guild Vanity URL
     *
     * Get a guild's vanity invite
     *
     * @param guild The guild to get the vanity invite for
     *
     * @returns {Promise<VanityInvite>} The vanity invite
     */
    getGuildVanityURL = (guild: GuildResolvable): Promise<VanityInvite> => getGuildVanityURL(this, guild);

    /**
     * Get Guild Voice Regions
     *
     * Get a guild's voice regions
     *
     * @param guild The guild to get the voice regions for
     *
     * @returns {Promise<VoiceRegion[]>} The guild's voice regions
     */
    getGuildVoiceRegions = (guild: GuildResolvable): Promise<VoiceRegion[]> => getGuildVoiceRegions(this, guild);

    /**
     * Get Guild Widget Settings
     *
     * Get a guild's widget settings
     *
     * @param guild The guild to get the widget for
     *
     * @returns {Promise<GuildWidget>} The widget
     */
    getGuildWidgetSettings = (guild: GuildResolvable): Promise<GuildWidget> => getGuildWidgetSettings(this, guild);

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
    getInvite = (invite: InviteResolvable, getInviteData?: GetInviteData): Promise<Invite> => getInvite(this, invite, getInviteData);

    /**
     * Get Pinned Messages
     *
     * Get a channel's pinned messages
     *
     * @param channel The channel to get the pinned messages of
     *
     * @returns {Promise<Message[]>} The messages
     */
    getPinnedMessages = (channel: ChannelResolvable): Promise<Message[]> => getPinnedMessages(this, channel);

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
    getReactions = (channel: ChannelResolvable, message: MessageResolvable, reactionEmoji: ReactionEmojiResolvable, getReactionsData?: GetReactionsData): Promise<User[]> => getReactions(this, channel, message, reactionEmoji, getReactionsData);

    /**
     * Get Template
     *
     * Get a template
     *
     * @param template The template to get
     *
     * @returns {Promise<Template>} The template
     */
    getTemplate = (template: TemplateResolvable): Promise<Template> => getTemplate(this, template);

    /**
     * Get User
     *
     * Get a user
     *
     * @param user The user to get
     *
     * @returns {Promise<User>} The user
     */
    getUser = (user: UserResolvable): Promise<User> => getUser(this, user);

    /**
     * Leave Guild
     *
     * Leave a guild
     *
     * @param guild The guild to leave
     */
    leaveGuild = (guild: GuildResolvable): Promise<void> => leaveGuild(this, guild);

    /**
     * List Guild Emojis
     *
     * Get the emojis in a guild
     *
     * @param guild The guild to get the emojis from
     *
     * @returns {Promise<Emoji[]>} The emojis
     */
    listGuildEmojis = (guild: GuildResolvable): Promise<Emoji[]> => listGuildEmojis(this, guild);

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
    listGuildMembers = (guild: GuildResolvable, listGuildMembersData?: ListGuildMembersData): Promise<Member[]> => listGuildMembers(this, guild, listGuildMembersData);

    /**
     * Modify Channel
     *
     * Modify a channel
     *
     * @param channel The channel to modify
     * @param modifyChannelData The data to modify the channel
     *
     * @returns {Promise<AnyGuildChannel>} The modified channel
     */
    modifyChannel = (channel: ChannelResolvable, modifyChannelData: ModifyChannelData): Promise<AnyGuildChannel> => modifyChannel(this, channel, modifyChannelData);

    /**
     * Modify Current User
     *
     * Modify the current user
     *
     * @param modifyCurrentUserData The data to modify the current user
     *
     * @returns {Promise<User>} The modified user
     */
    modifyCurrentUser = (modifyCurrentUserData: ModifyCurrentUserData): Promise<User> => modifyCurrentUser(this, modifyCurrentUserData);

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
    modifyCurrentUserNickname = (guild: GuildResolvable, modifyCurrentUserNicknameData?: ModifyCurrentUserNicknameData): Promise<CurrentUserNickname> => modifyCurrentUserNickname(this, guild, modifyCurrentUserNicknameData);

    /**
     * Modify Guild
     *
     * Modify a guild
     *
     * @param guild The guild to modify
     * @param modifyGuildData The data to modify the guild
     *
     * @returns {Promise<Guild>} The modified guild
     */
    modifyGuild = (guild: GuildResolvable, modifyGuildData: ModifyGuildData): Promise<Guild> => modifyGuild(this, guild, modifyGuildData);

    /**
     * Modify Guild Channel Positions
     *
     * Modify the positions of channels in a guild
     *
     * @param guild The guild to modify channel positions in
     * @param modifyGuildChannelPositionsData The data to modify the channel positions
     */
    modifyGuildChannelPositions = (guild: GuildResolvable, modifyGuildChannelPositionsData: ModifyGuildChannelPositionsData[]): Promise<void> => modifyGuildChannelPositions(this, guild, modifyGuildChannelPositionsData);

    /**
     * Modify Guild Emoji
     *
     * Modify an emoji
     *
     * @param guild The guild to modify the emoji in
     * @param emoji The emoji to modify
     * @param modifyGuildEmojiData The data to modify the emoji
     *
     * @returns {Promise<Emoji>} The modified emoji
     */
    modifyGuildEmoji = (guild: GuildResolvable, emoji: EmojiResolvable, modifyGuildEmojiData: ModifyGuildEmojiData): Promise<Emoji> => modifyGuildEmoji(this, guild, emoji, modifyGuildEmojiData);

    /**
     * Modify Guild Member
     *
     * Modify a member
     *
     * @param guild The guild to modify the member in
     * @param user The user resolvable for the member to modify
     * @param modifyGuildMemberData The data to modify the member
     *
     * @returns {Promise<Member>} The modified member
     */
    modifyGuildMember = (guild: GuildResolvable, user: UserResolvable, modifyGuildMemberData: ModifyGuildMemberData): Promise<Member> => modifyGuildMember(this, guild, user, modifyGuildMemberData);

    /**
     * Modify Guild Role
     *
     * Modify a role
     *
     * @param guild The guild to modify the role in
     * @param role The role to modify
     * @param modifyGuildRoleData The data to modify the role
     *
     * @returns {Promise<Role>} The modified role
     */
    modifyGuildRole = (guild: GuildResolvable, role: RoleResolvable, modifyGuildRoleData: ModifyGuildRoleData): Promise<Role> => modifyGuildRole(this, guild, role, modifyGuildRoleData);

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
    modifyGuildRolePositions = (guild: GuildResolvable, modifyGuildRolePositionsData: ModifyGuildRolePositionsData[]): Promise<Role[]> => modifyGuildRolePositions(this, guild, modifyGuildRolePositionsData);

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
    modifyGuildTemplate = (guild: GuildResolvable, template: TemplateResolvable, modifyGuildTemplateData: ModifyGuildTemplateData): Promise<Template> => modifyGuildTemplate(this, guild, template, modifyGuildTemplateData);

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
    modifyGuildWidget = (guild: GuildResolvable, modifyGuildWidgetData: ModifyGuildWidgetData): Promise<GuildWidget> => modifyGuildWidget(this, guild, modifyGuildWidgetData);

    /**
     * Remove Guild Ban
     *
     * Unban a user from a guild
     *
     * @param guild The guild to unban the user from
     * @param user The user to unban
     */
    removeGuildBan = (guild: GuildResolvable, user: UserResolvable): Promise<void> => removeGuildBan(this, guild, user);

    /**
     * Remove Guild Member
     *
     * Kick a member
     *
     * @param guild The guild to kick the member from
     * @param user The user resolvable for the member to kick
     */
    removeGuildMember = (guild: GuildResolvable, user: UserResolvable): Promise<void> => removeGuildMember(this, guild, user);

    /**
     * Remove Guild Member Role
     *
     * Remove a role from a member
     *
     * @param guild The guild to remove the role in
     * @param user The user resolvable for the member to remove the role from
     * @param role The role to remove
     */
    removeGuildMemberRole = (guild: GuildResolvable, user: UserResolvable, role: RoleResolvable): Promise<void> => removeGuildMemberRole(this, guild, user, role);

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
    syncGuildTemplate = (guild: GuildResolvable, template: TemplateResolvable): Promise<Template> => syncGuildTemplate(this, guild, template);

    /**
     * Trigger Typing Indicator
     *
     * Start typing in a channel
     *
     * @param channel The channel to start typing in
     */
    triggerTypingIndicator = (channel: ChannelResolvable): Promise<void> => triggerTypingIndicator(this, channel);
}