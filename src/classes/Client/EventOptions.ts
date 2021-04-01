import { AnyChannel, AnyGuildChannel, Ban, Guild, Invite, Member, Message, Presence, Role, User } from "../../internal";

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
 * Guild Event Options
 *
 * Options for extra data sent with guild related events
 */
export interface GuildEventOptions extends EventOptions {
    guild?: Guild;
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
 * Presence Event Options
 *
 * Options for extra data sent with presence related events
 */
export interface PresenceEventOptions extends EventOptions {
    presence?: Presence;
    user?: User;
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
 * Typing Start Event Options
 *
 * Options for extra data sent with typing start events
 */
export interface TypingStartEventOptions extends EventOptions {
    channel?: AnyChannel;
    user?: User;
}

/**
 * User Event Options
 *
 * Options for extra data sent with user related events
 */
export interface UserEventOptions extends EventOptions {
    user?: User;
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