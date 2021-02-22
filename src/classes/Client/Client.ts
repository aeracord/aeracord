import EventEmitter from "events";
import WebSocket from "ws";
import {
    AnyChannel,
    ACTIVITY_TYPE_COMPETING,
    ACTIVITY_TYPE_LISTENING,
    ACTIVITY_TYPE_PLAYING,
    ACTIVITY_TYPE_STREAMING,
    ChannelPinsUpdateData,
    ChannelResolvable,
    CreateMessageData,
    EditMessageData,
    FetchedData,
    FetchQueue,
    GetChannelMessagesData,
    GetReactionsData,
    Guild,
    GuildCreateData,
    GuildDeleteData,
    GuildEmojisUpdateData,
    GuildIntegrationsUpdateData,
    GuildMemberUpdateData,
    GuildRoleDeleteData,
    Intent,
    Invite,
    InviteDeleteData,
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
    Presence,
    ReactionEmojiResolvable,
    ReadyData,
    RequestOptions,
    Role,
    Status,
    TypingStartData,
    User,
    UserResolvable,
    VoiceState,
    WebhooksUpdateData
} from "../../internal";
import createMessage from "./apiMethods/channel/createMessage";
import createReaction from "./apiMethods/channel/createReaction";
import crosspostMessage from "./apiMethods/channel/crosspostMessage";
import deleteAllReactions from "./apiMethods/channel/deleteAllReactions";
import deleteAllReactionsForEmoji from "./apiMethods/channel/deleteAllReactionsForEmoji";
import deleteChannel from "./apiMethods/channel/deleteChannel";
import deleteMessage from "./apiMethods/channel/deleteMessage";
import deleteOwnReaction from "./apiMethods/channel/deleteOwnReaction";
import deleteUserReaction from "./apiMethods/channel/deleteUserReaction";
import editMessage from "./apiMethods/channel/editMessage";
import getChannel from "./apiMethods/channel/getChannel";
import getChannelMessage from "./apiMethods/channel/getChannelMessage";
import getChannelMessages from "./apiMethods/channel/getChannelMessages";
import getReactions from "./apiMethods/channel/getReactions";
import modifyChannel from "./apiMethods/channel/modifyChannel";
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
    on(event: "channelCreate", listener: (channel: AnyChannel, rawData: any) => void): this;
    on(event: "channelDelete", listener: (channel: AnyChannel, rawData: any) => void): this;
    on(event: "channelPinsUpdate", listener: (data: ChannelPinsUpdateData, rawData: any) => void): this;
    on(event: "channelUpdate", listener: (channel: AnyChannel, rawData: any) => void): this;
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
     * Delete a channel
     *
     * @param channel The channel to delete
     *
     * @returns {Promise<AnyChannel>} The deleted channel
     */
    deleteChannel = (channel: ChannelResolvable): Promise<AnyChannel> => deleteChannel(this, channel);

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
     * Modify Channel
     *
     * Modify a channel
     *
     * @param channel The channel to modify
     * @param modifyChannelData The data to modify the channel
     *
     * @returns {Promise<AnyChannel>} The modified channel
     */
    modifyChannel = (channel: ChannelResolvable, modifyChannelData: ModifyChannelData): Promise<AnyChannel> => modifyChannel(this, channel, modifyChannelData);
}