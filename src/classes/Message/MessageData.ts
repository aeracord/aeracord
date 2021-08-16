import { AnyMessageComponentData, AttachmentData, GuildChannelType, InteractionType, MemberData, MessageEmbedData, ReactionData, StickerFormatType, UserData } from "../../internal";

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
     * An array of users that are mentioned in this message
     * If the message is in a guild, this will be an array of members instead
     */
    mentions: UserData[] | MemberData[];

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
     * Sticker Items
     *
     * The message's stickers
     */
    stickerItems: MessageStickerItem[];

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
     * Components
     *
     * The message's components
     */
    components: AnyMessageComponentData[];

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
export type MessageType = typeof MessageTypes.DEFAULT | typeof MessageTypes.CHANNEL_PINNED_MESSAGE | typeof MessageTypes.GUILD_MEMBER_JOIN | typeof MessageTypes.USER_PREMIUM_GUILD_SUBSCRIPTION | typeof MessageTypes.USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1 | typeof MessageTypes.USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2 | typeof MessageTypes.USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3 | typeof MessageTypes.CHANNEL_FOLLOW_ADD | typeof MessageTypes.GUILD_DISCOVERY_DISQUALIFIED | typeof MessageTypes.GUILD_DISCOVERY_REQUALIFIED | typeof MessageTypes.REPLY | typeof MessageTypes.APPLICATION_COMMAND | typeof MessageTypes.GUILD_INVITE_REMINDER;
export const MessageTypes: {

    /**
     * Default
     *
     * A regular message
     */
    DEFAULT: 0,

    /**
     * Channel Pinned Message
     *
     * When a message is pinned
     */
    CHANNEL_PINNED_MESSAGE: 6,

    /**
     * Guild Member Join
     *
     * When a member joins a server
     */
    GUILD_MEMBER_JOIN: 7,

    /**
     * User Premium Guild Subscription
     *
     * When a user boosts a server
     */
    USER_PREMIUM_GUILD_SUBSCRIPTION: 8,

    /**
     * User Premium Guild Subscription Tier 1
     *
     * When a user boosts a server to tier 1
     */
    USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1: 9,

    /**
     * User Premium Guild Subscription Tier 2
     *
     * When a user boosts a server to tier 2
     */
    USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2: 10,

    /**
     * User Premium Guild Subscription Tier 3
     *
     * When a user boosts a server to tier 3
     */
    USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3: 11,

    /**
     * Channel Follow Add
     *
     * When an announcement channel is followed
     */
    CHANNEL_FOLLOW_ADD: 12,

    /**
     * Guild Discovery Disqualified
     *
     * When a server no longer meets the requirements for server discovery
     */
    GUILD_DISCOVERY_DISQUALIFIED: 14,

    /**
     * Guild Discovery Requalified
     *
     * When a server meets the requirements for server discovery
     */
    GUILD_DISCOVERY_REQUALIFIED: 15,

    /**
     * Guild Discovery Grace Period Initial Warning
     *
     * An initial warning about guild discovery
     */
    GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING: 16,

    /**
     * Guild Discovery Grace Period Final Warning
     *
     * A final warning about guild discovery
     */
    GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING: 17,

    /**
     * Reply
     *
     * A message that replies to another message
     */
    REPLY: 19,

    /**
     * Application Command
     *
     * A message that uses a slash command
     */
    APPLICATION_COMMAND: 20,

    /**
     * Guild Invite Reminder
     *
     * A reminder about guild invites
     */
    GUILD_INVITE_REMINDER: 22
} = {
    DEFAULT: 0,
    CHANNEL_PINNED_MESSAGE: 6,
    GUILD_MEMBER_JOIN: 7,
    USER_PREMIUM_GUILD_SUBSCRIPTION: 8,
    USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1: 9,
    USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2: 10,
    USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3: 11,
    CHANNEL_FOLLOW_ADD: 12,
    GUILD_DISCOVERY_DISQUALIFIED: 14,
    GUILD_DISCOVERY_REQUALIFIED: 15,
    GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING: 16,
    GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING: 17,
    REPLY: 19,
    APPLICATION_COMMAND: 20,
    GUILD_INVITE_REMINDER: 22
};

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
 * Message Sticker Item
 *
 * A message's stickers
 */
export interface MessageStickerItem {

    /**
     * ID
     *
     * The sticker's ID
     */
    id: string;

    /**
     * Name
     *
     * The sticker's name
     */
    name: string;

    /**
     * Format Type
     *
     * The sticker's format type
     */
    formatType: StickerFormatType;
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
export type MessageActivityType = typeof MessageActivityTypes.JOIN | typeof MessageActivityTypes.SPECTATE | typeof MessageActivityTypes.LISTEN | typeof MessageActivityTypes.JOIN_REQUEST;
export const MessageActivityTypes: {

    /**
     * Join
     *
     * For joining a game
     */
    JOIN: 1,

    /**
     * Spectate
     *
     * For spectating a game
     */
    SPECTATE: 2,

    /**
     * Listen
     *
     * To listen along on Spotify
     */
    LISTEN: 3,

    /**
     * Join Request
     *
     * For requesting to join a game
     */
    JOIN_REQUEST: 5
} = {
    JOIN: 1,
    SPECTATE: 2,
    LISTEN: 3,
    JOIN_REQUEST: 5
};

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