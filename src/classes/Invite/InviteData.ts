import { UserData } from "../../internal";

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
     */
    maxAge?: number;

    /**
     * Max Uses
     *
     * The max uses of the invite
     */
    maxUses?: number;

    /**
     * Temporary
     *
     * Whether or not the invite is temporary
     */
    temporary?: boolean;

    /**
     * Uses
     *
     * The amount of times this invite has been used
     */
    uses?: number;
    /**
     * Target User
     *
     * The target user for this invite
     */
    targetUser: TargetUser | null;

    /**
     * Target User Type
     *
     * The type of target user for this invite
     */
    targetUserType: TargetUserType | null;
}

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
 * Target User Type
 * https://discord.com/developers/docs/resources/invite#invite-object-target-user-types
 */
export type TargetUserType = typeof TARGET_USER_TYPE_STREAM;
export const TARGET_USER_TYPE_STREAM = 1;