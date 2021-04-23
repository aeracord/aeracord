import { AnyChannel, AnyChannelData, Ban, CommandData, EmojiData, Guild, GuildData, Invite, Member, MemberData, Message, MessageData, PresenceData, Role, RoleData, TextBasedChannel, User, UserData } from "../../internal";

/**
 * Event Options
 *
 * Options for extra data sent with events
 */
export interface EventOptions {
    rawData: any;
}

/**
 * Ban Event Options
 *
 * Options for extra data sent with ban related events
 */
export interface BanEventOptions extends EventOptions {
    ban?: Ban;
    member?: Member;
    guild?: Guild;
}

/**
 * Channel Event Options
 *
 * Options for extra data sent with channel related events
 */
export interface ChannelEventOptions extends EventOptions {
    guild?: Guild;
    channel?: AnyChannel;
}

/**
 * Channel Pins Update Event Options
 *
 * Options for extra data sent with channel pins update events
 */
export interface ChannelPinsUpdateEventOptions extends EventOptions {
    channel?: TextBasedChannel;
}

/**
 * Channel Update Event Options
 *
 * Options for extra data sent with channel update events
 */
export interface ChannelUpdateEventOptions extends EventOptions {
    oldChannelData?: AnyChannelData;
}

/**
 * Command Update Event Options
 *
 * Options for extra data sent with command update events
 */
export interface CommandUpdateEventOptions extends EventOptions {
    oldCommandData?: CommandData;
}

/**
 * Guild Event Options
 *
 * Options for extra data sent with guild related events
 */
export interface GuildEventOptions extends EventOptions {
    guild?: Guild;
}

/**
 * Guild Emojis Update Event Options
 *
 * Options for extra data sent with guild emojis update events
 */
export interface GuildEmojisUpdateEventOptions extends EventOptions {
    guild?: Guild;
    oldEmojisData: EmojiData[];
}

/**
 * Guild Member Add Event Options
 *
 * Options for extra data sent with guild member add events
 */
export interface GuildMemberAddEventOptions extends EventOptions {
    guild?: Guild;
    user?: User;
}

/**
 * Guild Member Remove Event Options
 *
 * Options for extra data sent with guild member remove events
 */
export interface GuildMemberRemoveEventOptions extends EventOptions {
    member?: Member;
    guild?: Guild;
}

/**
 * Guild Member Update Event Options
 *
 * Options for extra data sent with guild member update events
 */
export interface GuildMemberUpdateEventOptions extends EventOptions {
    guild?: Guild;
    user?: User;
    oldMemberData?: MemberData;
}

/**
 * Guild Role Delete Event Options
 *
 * Options for extra data sent with guild role delete events
 */
export interface GuildRoleDeleteEventOptions extends EventOptions {
    role?: Role;
    guild?: Guild;
}

/**
 * Guild Role Update Event Options
 *
 * Options for extra data sent with guild role update events
 */
export interface GuildRoleUpdateEventOptions extends EventOptions {
    guild?: Guild;
    oldRoleData?: RoleData;
}

/**
 * Guild Update Event Options
 *
 * Options for extra data sent with guild update events
 */
export interface GuildUpdateEventOptions extends EventOptions {
    oldGuildData?: GuildData;
}

/**
 * Invite Delete Event Options
 *
 * Options for extra data sent with invite delete events
 */
export interface InviteDeleteEventOptions extends EventOptions {
    invite?: Invite;
    guild?: Guild;
    channel?: AnyChannel;
}

/**
 * Message Delete Event Options
 *
 * Options for extra data sent with message delete events
 */
export interface MessageDeleteEventOptions extends TextBasedChannelEventOptions {
    message?: Message;
}

/**
 * Message Delete Bulk Event Options
 *
 * Options for extra data sent with message delete bulk events
 */
export interface MessageDeleteBulkEventOptions extends TextBasedChannelEventOptions {
    messages: Message[];
}

/**
 * Message Update Event Options
 *
 * Options for extra data sent with message update events
 */
export interface MessageUpdateEventOptions extends TextBasedChannelEventOptions {
    message?: Message;
    oldMessageData?: MessageData;
}

/**
 * Presence Update Event Options
 *
 * Options for extra data sent with presence update events
 */
export interface PresenceUpdateEventOptions extends EventOptions {
    user?: User;
    oldPresenceData?: PresenceData;
}

/**
 * Reaction Event Options
 *
 * Options for extra data sent with reaction related events
 */
export interface ReactionEventOptions extends TextBasedChannelEventOptions {
    message?: Message;
    user?: User;
}

/**
 * Reaction Bulk Remove Event Options
 *
 * Options for extra data sent with reaction bulk remove related events
 */
export interface ReactionBulkRemoveEventOptions extends TextBasedChannelEventOptions {
    message?: Message;
}

/**
 * Text Based Channel Event Options
 *
 * Options for extra data sent with text based channel related events
 */
export interface TextBasedChannelEventOptions extends EventOptions {
    guild?: Guild;
    channel?: TextBasedChannel;
}

/**
 * Typing Start Event Options
 *
 * Options for extra data sent with typing start events
 */
export interface TypingStartEventOptions extends TextBasedChannelEventOptions {
    user?: User;
}

/**
 * User Update Event Options
 *
 * Options for extra data sent with user update events
 */
export interface UserUpdateEventOptions extends EventOptions {
    oldUserData?: UserData;
}

/**
 * Voice State Update Event Options
 *
 * Options for extra data sent with voice state update events
 */
export interface VoiceStateUpdateEventOptions extends EventOptions {
    guild?: Guild;
    channel?: AnyChannel;
    member?: Member;
    user?: User;
}