import EventEmitter from "events";
import WebSocket from "ws";
import debug from "../../debug";
import { AnyChannel, ChannelPinsUpdateData, Guild, GuildEmojisUpdateData, GuildIntegrationsUpdateData, GuildMemberUpdateData, GuildRoleDeleteData, Intent, Invite, InviteDeleteData, Member, ReadyData, Role, TypingStartData, User, WebhooksUpdateData } from "../../internal";
import connect from "./connect";

export interface ClientData {
    token: string;
    presence?: Presence;
    intents: Intent[];
    debugMode?: boolean;
}

export interface Presence {
    status?: Status;
    afk?: boolean;
    activities?: BotActivity[];
    since?: number;
}

export type Status = "online" | "idle" | "dnd" | "invisible" | "offline";

export interface BotActivity {
    name: string;
    type: BotActivityType;
    url?: string;
}

/**
 * Activity types
 * https://discord.com/developers/docs/topics/gateway#activity-object-activity-types
 */
export type ActivityType = typeof ACTIVITY_TYPE_PLAYING | typeof ACTIVITY_TYPE_STREAMING | typeof ACTIVITY_TYPE_LISTENING | typeof ACTIVITY_TYPE_CUSTOM | typeof ACTIVITY_TYPE_COMPETING;
export type BotActivityType = typeof ACTIVITY_TYPE_PLAYING | typeof ACTIVITY_TYPE_STREAMING | typeof ACTIVITY_TYPE_LISTENING | typeof ACTIVITY_TYPE_COMPETING;
export const ACTIVITY_TYPE_PLAYING = 0;
export const ACTIVITY_TYPE_STREAMING = 1;
export const ACTIVITY_TYPE_LISTENING = 2;
export const ACTIVITY_TYPE_CUSTOM = 4;
export const ACTIVITY_TYPE_COMPETING = 5;

export interface EventQueueEvent {
    type: string;
    data: any;
}

export default interface Client {
    on(event: "ready", listener: (data: ReadyData, rawData: any) => void): this;
    on(event: "channelCreate", listener: (channel: AnyChannel, rawData: any) => void): this;
    on(event: "channelDelete", listener: (channel: AnyChannel, rawData: any) => void): this;
    on(event: "channelPinsUpdate", listener: (data: ChannelPinsUpdateData, rawData: any) => void): this;
    on(event: "channelUpdate", listener: (channel: AnyChannel, rawData: any) => void): this;
    on(event: "guildEmojisUpdate", listener: (data: GuildEmojisUpdateData, rawData: any) => void): this;
    on(event: "guildIntegrationsUpdate", listener: (data: GuildIntegrationsUpdateData, rawData: any) => void): this;
    on(event: "guildMemberAdd", listener: (member: Member, rawData: any) => void): this;
    on(event: "guildMemberRemove", listener: (user: User, rawData: any) => void): this;
    on(event: "guildMemberUpdate", listener: (data: GuildMemberUpdateData, rawData: any) => void): this;
    on(event: "guildRoleCreate", listener: (role: Role, rawData: any) => void): this;
    on(event: "guildRoleDelete", listener: (data: GuildRoleDeleteData, rawData: any) => void): this;
    on(event: "guildRoleUpdate", listener: (role: Role, rawData: any) => void): this;
    on(event: "guildUpdate", listener: (guild: Guild, rawData: any) => void): this;
    on(event: "inviteCreate", listener: (invite: Invite, rawData: any) => void): this;
    on(event: "inviteDelete", listener: (data: InviteDeleteData, rawData: any) => void): this;
    on(event: "typingStart", listener: (data: TypingStartData, rawData: any) => void): this;
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
     * Avatar URL
     *
     * The client's avatar's URL
     */
    avatarURL: string;

    /**
     * Session ID
     *
     * The session ID
     */
    sessionID: string | undefined;

    /**
     * Sequence
     *
     * The sequence number
     */
    sequence?: number;

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
    ws: WebSocket;

    /**
     * Ready
     *
     * Whether or not the client is ready to process events
     */
    ready?: boolean;

    /**
     * Event Queue
     *
     * A queue of events that were sent before the client was ready
     */
    eventQueue: EventQueueEvent[];

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
    _initialPresence?: Presence;

    /**
     * Intents
     *
     * The bot's intents
     */
    _intents: Intent[];

    /**
     * Debug Mode
     *
     * Whether or not this client is in debug mode
     */
    debugMode: boolean;

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
        this.eventQueue = [];
        this._initialPresence = clientData.presence;
        this._intents = clientData.intents;
        this.debugMode = Boolean(clientData.debugMode);

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
     * Debug
     *
     * Log debug info
     *
     * @param info Debug info to log
     */
    _debug = (info: string) => debug(this, info);
}