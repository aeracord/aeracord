import { MemberData, UserData } from "../../internal";

/**
 * Invite Data
 *
 * Represents an `Invite`
 */
export interface InviteData {

    /**
     * Code
     *
     * The invite's code
     */
    code: string;

    /**
     * Channel ID
     *
     * The ID of the channel this invite is for
     */
    channelID: string;

    /**
     * Guild ID
     *
     * The ID of the guild this invite is in
     */
    guildID: string;

    /**
     * Created At
     *
     * The timestamp for when the invite was created
     * Can be `undefined` if the bot doesn't have permission to manage the invite's channel
     */
    createdAt?: number;

    /**
     * Inviter
     *
     * The user that created this invite
     */
    inviter: UserData | null;

    /**
     * Max Age
     *
     * The max age of the invite
     * Can be `undefined` if the bot doesn't have permission to manage the invite's channel
     */
    maxAge?: number;

    /**
     * Max Uses
     *
     * The max uses of the invite
     * Can be `undefined` if the bot doesn't have permission to manage the invite's channel
     */
    maxUses?: number;

    /**
     * Temporary
     *
     * Whether or not the invite is temporary
     * Can be `undefined` if the bot doesn't have permission to manage the invite's channel
     */
    temporary?: boolean;

    /**
     * Uses
     *
     * The amount of times this invite has been used
     * Can be `undefined` if the bot doesn't have permission to manage the invite's channel
     */
    uses?: number;

    /**
     * Expires At
     *
     * The timestamp for when this invite expires
     * Can be `undefined` if the invite wasn't fetched with the `withExpiration` option
     * Can be `null` if the invite doesn't expire
     */
    expiresAt?: number | null;

    /**
     * Target Type
     *
     * The type of target for this invite
     */
    targetType: TargetType | null;

    /**
     * Target User
     *
     * The target user for this invite
     */
    targetUser: TargetUser | null;

    /**
     * Stage Instance
     *
     * Data for the stage instance if theres a public stage instance in the channel for this invite
     */
    stageInstance: InviteStageInstance | null;

    /**
     * Fetched At
     *
     * The timestamp for when this invite was fetched
     */
    fetchedAt: number;
}

/**
 * Target Type
 * https://discord.com/developers/docs/resources/invite#invite-object-invite-target-types
 */
export type TargetType = typeof TargetTypes.STREAM | typeof TargetTypes.EMBEDDED_APPLICATION;
export const TargetTypes: {

    /**
     * Stream
     *
     * A stream invite
     */
    STREAM: 1,

    /**
     * Embedded Application
     *
     * An invite for an embedded application
     */
    EMBEDDED_APPLICATION: 2
} = {
    STREAM: 1,
    EMBEDDED_APPLICATION: 2
};

/**
 * Target User
 *
 * The invite's target user
 */
export interface TargetUser {

    /**
     * ID
     *
     * The target user's ID
     */
    id: string;

    /**
     * Username
     *
     * The target user's username
     */
    username: string;

    /**
     * Discriminator
     *
     * The target user's discriminator
     */
    discriminator: string;

    /**
     * Avatar
     *
     * The target user's avatar hash
     */
    avatar: string | null;
}

/**
 * Invite Stage Instance
 *
 * Data for the stage instance if theres a public stage instance in the channel for this invite
 */
export interface InviteStageInstance {

    /**
     * Topic
     *
     * The stage instance's topic
     */
    topic: string;

    /**
     * Participant Count
     *
     * The amount of people in the stage channel
     */
    participantCount: number;

    /**
     * Speaker Count
     *
     * The amount of people speaking in the stage channel
     */
    speakerCount: number;

    /**
     * Members
     *
     * The members in the stage channel
     */
    members: MemberData[];
}