import { AttachmentData, Base, Client, EmbedData, GuildChannelType, MemberData, RawMessageData, ReactionData, StickerData, UserData } from "../../internal";
import fromData from "./fromData";
import fromRawData from "./fromRawData";
import resolveID from "./resolveID";
import updateObject from "./updateObject";

export interface MessageData {
    id: string;
    type: MessageType;
    channelID: string;
    guildID?: string;
    author?: UserData;
    webhook?: MessageWebhook;
    member?: MemberData;
    content: string;
    timestamp: number;
    editedTimestamp?: number;
    tts?: boolean;
    mentionEveryone?: boolean;
    mentions: MemberData[];
    mentionedRoles: string[];
    mentionedChannels: ChannelMention[];
    attachments: AttachmentData[];
    embeds: EmbedData[];
    stickers: StickerData[];
    reactions: ReactionData[];
    pinned?: boolean;
    activity?: MessageActivity;
    application?: MessageApplication;
    messageReference?: MessageReference;
    flags: number;
    referencedMessage?: MessageData;
}

export type MessageType = typeof MESSAGE_TYPE_DEFAULT | typeof MESSAGE_TYPE_CHANNEL_PINNED_MESSAGE | typeof MESSAGE_TYPE_GUILD_MEMBER_JOIN | typeof MESSAGE_TYPE_USER_PREMIUM_GUILD_SUBSCRIPTION | typeof MESSAGE_TYPE_USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1 | typeof MESSAGE_TYPE_USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2 | typeof MESSAGE_TYPE_USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3 | typeof MESSAGE_TYPE_CHANNEL_FOLLOW_ADD | typeof MESSAGE_TYPE_GUILD_DISCOVERY_DISQUALIFIED | typeof MESSAGE_TYPE_GUILD_DISCOVERY_REQUALIFIED | typeof MESSAGE_TYPE_REPLY | typeof MESSAGE_TYPE_APPLICATION_COMMAND;
export const MESSAGE_TYPE_DEFAULT = 0;
export const MESSAGE_TYPE_CHANNEL_PINNED_MESSAGE = 6;
export const MESSAGE_TYPE_GUILD_MEMBER_JOIN = 7;
export const MESSAGE_TYPE_USER_PREMIUM_GUILD_SUBSCRIPTION = 8;
export const MESSAGE_TYPE_USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1 = 9;
export const MESSAGE_TYPE_USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2 = 10;
export const MESSAGE_TYPE_USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3 = 11;
export const MESSAGE_TYPE_CHANNEL_FOLLOW_ADD = 12;
export const MESSAGE_TYPE_GUILD_DISCOVERY_DISQUALIFIED = 14;
export const MESSAGE_TYPE_GUILD_DISCOVERY_REQUALIFIED = 15;
export const MESSAGE_TYPE_REPLY = 19;
export const MESSAGE_TYPE_APPLICATION_COMMAND = 20;

export interface MessageWebhook {
    id: string;
    name: string;
    avatar?: string;
}

export interface ChannelMention {
    id: string;
    guildID: string;
    type: GuildChannelType;
    name: string;
}

export interface MessageActivity {
    type: MessageActivityType;
    partyID?: string;
}

export type MessageActivityType = typeof MESSAGE_ACTIVITY_TYPE_JOIN | typeof MESSAGE_ACTIVITY_TYPE_SPECTATE | typeof MESSAGE_ACTIVITY_TYPE_LISTEN | typeof MESSAGE_ACTIVITY_TYPE_JOIN_REQUEST;
export const MESSAGE_ACTIVITY_TYPE_JOIN = 1;
export const MESSAGE_ACTIVITY_TYPE_SPECTATE = 2;
export const MESSAGE_ACTIVITY_TYPE_LISTEN = 3;
export const MESSAGE_ACTIVITY_TYPE_JOIN_REQUEST = 5;

export interface MessageApplication {
    id: string;
    name: string;
    description: string;
    icon?: string;
    coverImage?: string;
}

export interface MessageReference {
    messageID?: string;
    channelID: string;
    guildID?: string;
}

export type MessageResolvable = Message | string;

export default class Message extends Base<Message> {

    /**
     * Type
     *
     * The message's type
     */
    type: MessageType;

    /**
     * Channel ID
     *
     * The ID of the channel this message is in
     */
    channelID: string;

    /**
     * Guild ID
     *
     * The ID of the guild this message is in
     */
    guildID?: string;

    /**
     * Author
     *
     * The user that sent this message
     */
    author?: UserData;

    /**
     * Webhook
     *
     * The webhook that sent this message
     */
    webhook?: MessageWebhook;

    /**
     * Member
     *
     * The member object of the user that sent this message
     */
    member?: MemberData;

    /**
     * Content
     *
     * The message's content
     */
    content: string;

    /**
     * Timestamp
     *
     * The timestamp for when the message was sent
     */
    timestamp: number;

    /**
     * Edited Timestamp
     *
     * The timestamp for when the message was last edited
     */
    editedTimestamp?: number;

    /**
     * TTS
     *
     * Whether or not this message is TTS
     */
    tts: boolean;

    /**
     * Mention Everyone
     *
     * Whether or not this message mentions everyone
     */
    mentionEveryone: boolean;

    /**
     * Mentions
     *
     * The members this message mentions
     */
    mentions: MemberData[];

    /**
     * Mentioned Roles
     *
     * The IDs of the roles this message mentions
     */
    mentionedRoles: string[];

    /**
     * Mentioned Channels
     *
     * The channels this message mentions
     */
    mentionedChannels: ChannelMention[];

    /**
     * Attachments
     *
     * The message's attachments
     */
    attachments: AttachmentData[];

    /**
     * Embeds
     *
     * The message's embeds
     */
    embeds: EmbedData[];

    /**
     * Stickers
     *
     * The message's stickers
     */
    stickers: StickerData[];

    /**
     * Reactions
     *
     * The message's reactions
     */
    reactions: ReactionData[];

    /**
     * Pinned
     *
     * Whether or not this message is pinned
     */
    pinned: boolean;

    /**
     * Activity
     *
     * The message's activity
     */
    activity?: MessageActivity;

    /**
     * Application
     *
     * The message's application
     */
    application?: MessageApplication;

    /**
     * Message Reference
     *
     * The data for the message this message references
     */
    messageReference?: MessageReference;

    /**
     * Flags
     *
     * The message's flags
     */
    flags: number;

    /**
     * Referenced Message
     *
     * The message this message references
     */
    referencedMessage?: MessageData;

    /**
     * Message
     *
     * @param client The client
     * @param messageData Options to initialize this message with
     * @param messageData.id The message's ID
     * @param messageData.type The message's type
     * @param messageData.channelID The ID of the channel this message is in
     * @param messageData.guildID The ID of the guild this message is in
     * @param messageData.author The user that sent this message
     * @param messageData.webhook The webhook that sent this message
     * @param messageData.member The member object of the user that sent this message
     * @param messageData.content The message's content
     * @param messageData.timestamp The timestamp for when the message was sent
     * @param messageData.editedTimestamp The timestamp for when the message was last edited
     * @param messageData.tts Whether or not this message is TTS
     * @param messageData.mentionEveryone Whether or not this message mentions everyone
     * @param messageData.mentions The members this message mentions
     * @param messageData.mentionedRoles The IDs of the roles this message mentions
     * @param messageData.mentionedChannels The channels this message mentions
     * @param messageData.attachments The message's attachments
     * @param messageData.embeds The message's embeds
     * @param messageData.stickers The message's stickers
     * @param messageData.reactions The message's reactions
     * @param messageData.pinned Whether or not this message is pinned
     * @param messageData.activity The message's activity
     * @param messageData.application The message's application
     * @param messageData.messageReference The data for the message this message references
     * @param messageData.flags The message's flags
     * @param messageData.referencedMessage The message this message references
     */
    constructor(client: Client, messageData: MessageData) {

        // Super
        super(client, {
            id: messageData.id,
            cacheManager: client._messages
        });

        // Set data
        Message._updateObject(this, messageData);

        // Cache message
        this.client._messages.cache(this.id, this);
    }

    /**
     * From Raw Data
     *
     * Create a `MessageData` object from a `RawMessageData` object
     *
     * @param rawData The raw data from the API
     *
     * @returns {MessageData} The message data
     */
    static _fromRawData(rawData: RawMessageData): MessageData {
        return fromRawData(rawData);
    }

    /**
     * From Data
     *
     * Create a `Message` from a `MessageData` object
     *
     * @param messageData The message data
     *
     * @returns {Message} The message
     */
    static fromData(client: Client, messageData: MessageData): Message {
        return fromData(client, messageData);
    }

    /**
     * Resolve ID
     *
     * Resolve an object to a message ID
     *
     * @param messageResolvable The message resolvable
     *
     * @returns {string | undefined} The resolved message ID, or `undefined` if the message resolvable is invalid
     */
    static resolveID(messageResolvable: MessageResolvable): string | undefined {
        return resolveID(messageResolvable);
    }

    /**
     * Update Object
     *
     * Update the `Message` object with data from a `MessageData` object
     *
     * @param messageData The data to update this message with
     */
    static _updateObject(message: Message, messageData: MessageData) {
        updateObject(message, messageData);
    }
}