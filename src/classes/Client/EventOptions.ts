import { AnyChannel, AnyChannelData, AnyGuildChannel, Ban, EmojiData, Guild, GuildData, Invite, Member, MemberData, Message, MessageData, Presence, PresenceData, Role, RoleData, User, UserData } from "../../internal";

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
export interface BanEventOptions extends MemberEventOptions {
    ban?: Ban;
}

/**
 * Channel Event Options
 *
 * Options for extra data sent with channel related events
 */
export interface ChannelEventOptions extends EventOptions {
    channel?: AnyChannel;
}

/**
 * Channel Update Event Options
 *
 * Options for extra data sent with channel update related events
 */
export interface ChannelUpdateEventOptions extends ChannelEventOptions {
    oldChannelData?: AnyChannelData;
}

/**
 * Guild Emojis Update Event Options
 *
 * Options for extra data sent with guild emojis update events
 */
export interface GuildEmojisUpdateEventOptions extends GuildEventOptions {
    oldEmojisData: EmojiData[];
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
 * Guild Update Event Options
 *
 * Options for extra data sent with guild update related events
 */
export interface GuildUpdateEventOptions extends GuildEventOptions {
    oldGuildData?: GuildData;
}

/**
 * Invite Event Options
 *
 * Options for extra data sent with invite related events
 */
export interface InviteEventOptions extends EventOptions {
    invite?: Invite;
    guild?: Guild;
    channel?: AnyGuildChannel;
}

/**
 * Member Event Options
 *
 * Options for extra data sent with member related events
 */
export interface MemberEventOptions extends EventOptions {
    member?: Member;
    guild?: Guild;
    user?: User;
}

/**
 * Member Update Event Options
 *
 * Options for extra data sent with member update related events
 */
export interface MemberUpdateEventOptions extends MemberEventOptions {
    oldMemberData?: MemberData;
}

/**
 * Message Event Options
 *
 * Options for extra data sent with message related events
 */
export interface MessageEventOptions extends EventOptions {
    message?: Message;
    guild?: Guild;
    channel?: AnyChannel;
}

/**
 * Message Update Event Options
 *
 * Options for extra data sent with message update related events
 */
export interface MessageUpdateEventOptions extends MessageEventOptions {
    oldMessageData?: MessageData;
}

/**
 * Message Delete Bulk Event Options
 *
 * Options for extra data sent with message bulk delete related events
 */
export interface MessageDeleteBulkEventOptions extends EventOptions {
    messages: Message[];
    guild?: Guild;
    channel?: AnyChannel;
}

/**
 * Presence Update Event Options
 *
 * Options for extra data sent with presence update events
 */
export interface PresenceUpdateEventOptions extends EventOptions {
    presence?: Presence;
    user?: User;
    oldPresenceData?: PresenceData;
}

/**
 * Reaction Event Options
 *
 * Options for extra data sent with reaction related events
 */
export interface ReactionEventOptions extends EventOptions {
    message?: Message;
    guild?: Guild;
    channel?: AnyChannel;
    user?: User;
}

/**
 * Role Event Options
 *
 * Options for extra data sent with role related events
 */
export interface RoleEventOptions extends EventOptions {
    role?: Role;
    guild?: Guild;
}

/**
 * Role Update Event Options
 *
 * Options for extra data sent with role update related events
 */
export interface RoleUpdateEventOptions extends RoleEventOptions {
    oldRoleData?: RoleData;
}

/**
 * Typing Start Event Options
 *
 * Options for extra data sent with typing start events
 */
export interface TypingStartEventOptions extends EventOptions {
    channel?: AnyChannel;
    user?: User;
}

/**
 * User Update Event Options
 *
 * Options for extra data sent with user update events
 */
export interface UserUpdateEventOptions extends EventOptions {
    user?: User;
    oldUserData?: UserData;
}

/**
 * Voice State Event Options
 *
 * Options for extra data sent with voice state related events
 */
export interface VoiceStateEventOptions extends EventOptions {
    guild?: Guild;
    channel?: AnyGuildChannel;
    member?: Member;
    user?: User;
}

/**
 * Webhooks Update Event Options
 *
 * Options for extra data sent with webhooks update events
 */
export interface WebhooksUpdateEventOptions extends EventOptions {
    channel?: AnyChannel;
    guild?: Guild;
}