import { AttachmentData, GuildChannelType, InteractionType, MemberData, MessageEmbedData, ReactionData, StickerData, UserData } from "../../internal";

/**
 * Message Data
 *
 * Represents a `Message`
 */
export interface MessageData {

    /**
     * ID
     *
     * The message's ID
     */
    id: string;

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
    guildID: string | null;

    /**
     * Author
     *
     * The user that sent this message
     * `null` if the message is sent by a webhook
     */
    author: UserData | null;

    /**
     * Webhook
     *
     * The webhook that sent this message
     */
    webhook: MessageWebhook | null;

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
    editedTimestamp: number | null;

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
     * This field will be an empty array if the message isn't a crossposted message
     * Only channels from lurkable guilds are included
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
    embeds: MessageEmbedData[];

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
    activity: MessageActivity | null;

    /**
     * Application
     *
     * The message's application
     */
    application: MessageApplication | null;

    /**
     * Message Reference
     *
     * The data for the message this message references
     */
    messageReference: MessageReference | null;

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
    referencedMessage?: MessageData | null;

    /**
     * Interaction
     *
     * The interaction this message is in response to
     */
    interaction: MessageInteraction | null;

    /**
     * Fetched At
     *
     * The timestamp for when this message was fetched
     */
    fetchedAt: number;
}

/**
 * Message Type
 * https://discord.com/developers/docs/resources/channel#message-object-message-types
 */
export type MessageType = typeof MESSAGE_TYPE_DEFAULT | typeof MESSAGE_TYPE_CHANNEL_PINNED_MESSAGE | typeof MESSAGE_TYPE_GUILD_MEMBER_JOIN | typeof MESSAGE_TYPE_USER_PREMIUM_GUILD_SUBSCRIPTION | typeof MESSAGE_TYPE_USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1 | typeof MESSAGE_TYPE_USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2 | typeof MESSAGE_TYPE_USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3 | typeof MESSAGE_TYPE_CHANNEL_FOLLOW_ADD | typeof MESSAGE_TYPE_GUILD_DISCOVERY_DISQUALIFIED | typeof MESSAGE_TYPE_GUILD_DISCOVERY_REQUALIFIED | typeof MESSAGE_TYPE_REPLY | typeof MESSAGE_TYPE_APPLICATION_COMMAND | typeof MESSAGE_TYPE_GUILD_INVITE_REMINDER;
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
export const MESSAGE_TYPE_GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING = 16;
export const MESSAGE_TYPE_GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING = 17;
export const MESSAGE_TYPE_REPLY = 19;
export const MESSAGE_TYPE_APPLICATION_COMMAND = 20;
export const MESSAGE_TYPE_GUILD_INVITE_REMINDER = 22;

/**
 * Message Webhook
 *
 * A webhook that sent a message
 */
export interface MessageWebhook {

    /**
     * ID
     *
     * The webhook's ID
     */
    id: string;

    /**
     * Name
     *
     * The webhook's name
     */
    name: string;

    /**
     * Avatar
     *
     * The webhook's avatar
     */
    avatar: string | null;
}

/**
 * Channel Mention
 *
 * A channel mention
 */
export interface ChannelMention {

    /**
     * ID
     *
     * The channel's ID
     */
    id: string;

    /**
     * Guild ID
     *
     * The ID of the guild the channel is in
     */
    guildID: string;

    /**
     * Type
     *
     * The channel's type
     */
    type: GuildChannelType;

    /**
     * Name
     *
     * The channel's name
     */
    name: string;
}

/**
 * Message Activity
 *
 * A message activity
 */
export interface MessageActivity {

    /**
     * Type
     *
     * The message activity's type
     */
    type: MessageActivityType;

    /**
     * Party ID
     *
     * The ID of the rich presence party
     */
    partyID: string | null;
}

/**
 * Message Activity Type
 * https://discord.com/developers/docs/resources/channel#message-object-message-activity-types
 */
export type MessageActivityType = typeof MESSAGE_ACTIVITY_TYPE_JOIN | typeof MESSAGE_ACTIVITY_TYPE_SPECTATE | typeof MESSAGE_ACTIVITY_TYPE_LISTEN | typeof MESSAGE_ACTIVITY_TYPE_JOIN_REQUEST;
export const MESSAGE_ACTIVITY_TYPE_JOIN = 1;
export const MESSAGE_ACTIVITY_TYPE_SPECTATE = 2;
export const MESSAGE_ACTIVITY_TYPE_LISTEN = 3;
export const MESSAGE_ACTIVITY_TYPE_JOIN_REQUEST = 5;

/**
 * Message Application
 *
 * A message application
 */
export interface MessageApplication {

    /**
     * ID
     *
     * The message application's ID
     */
    id: string;

    /**
     * Name
     *
     * The message application's name
     */
    name: string;

    /**
     * Description
     *
     * The message application's description
     */
    description: string;

    /**
     * Icon
     *
     * The message application's icon
     */
    icon: string | null;

    /**
     * Cover Image
     *
     * The message application's cover image
     */
    coverImage: string | null;
}

/**
 * Message Reference
 *
 * A message reference
 */
export interface MessageReference {

    /**
     * Message ID
     *
     * The ID of the message being referenced
     */
    messageID: string | null;

    /**
     * Channel ID
     *
     * The ID of the channel of the message being referenced
     */
    channelID: string;

    /**
     * Guild ID
     *
     * The ID of the guild of the message being referenced
     */
    guildID: string | null;
}

/**
 * Message Interaction
 *
 * A message interaction
 */
export interface MessageInteraction {

    /**
     * ID
     *
     * The interaction's ID
     */
    id: string;

    /**
     * Type
     *
     * The interaction's type
     */
    type: InteractionType;

    /**
     * Name
     *
     * The command's name
     */
    name: string;

    /**
     * User
     *
     * The user that created the interaction
     */
    user: UserData;
}