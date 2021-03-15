import { Client, RawInviteData, User } from "../../internal";
import fromRawData from "./fromRawData";
import resolveCode from "./resolveCode";

export interface InviteData {
    code: string;
    channelID: string;
    guildID: string;
    createdAt: number;
    inviter?: User;
    maxAge?: number;
    maxUses?: number;
    temporary?: boolean;
    uses: number;
    targetUser?: TargetUser;
    targetUserType?: TargetUserType;
}

export interface TargetUser {
    id: string;
    username: string;
    discriminator: string;
    avatar?: string;
}

export type TargetUserType = typeof TARGET_USER_TYPE_STREAM;
export const TARGET_USER_TYPE_STREAM = 1;

export type InviteResolvable = Invite | string;

export default class Invite {

    /**
     * Client
     *
     * The client
     */
    client: Client;

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
    createdAt: number;

    /**
     * Inviter
     *
     * The user that created this invite
     */
    inviter?: User;

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
    temporary: boolean;

    /**
     * Uses
     *
     * The amount of times this invite has been used
     */
    uses: number;

    /**
     * Target User
     *
     * The target user for this invite
     */
    targetUser?: TargetUser;

    /**
     * Target User Type
     *
     * The type of target user for this invite
     */
    targetUserType?: TargetUserType;

    /**
     * Invite
     *
     * @param client The client
     * @param inviteData Options to initialize this invite with
     * @param inviteData.code The invite's code
     * @param inviteData.channelID The ID of the channel this invite is for
     * @param inviteData.guildID The ID of the guild this invite is in
     * @param inviteData.createdAt The timestamp for when the invite was created
     * @param inviteData.inviter The user that created this invite
     * @param inviteData.maxAge The max age of the invite
     * @param inviteData.maxUses The max uses of the invite
     * @param inviteData.temporary Whether or not the invite is temporary
     * @param inviteData.uses The amount of times this invite has been used
     * @param inviteData.targetUser The target user for this invite
     * @param inviteData.targetUserType The type of target user for this invite
     */
    constructor(client: Client, inviteData: InviteData) {

        // Set data
        this.client = client;
        this.code = inviteData.code;
        this.channelID = inviteData.channelID;
        this.guildID = inviteData.guildID;
        this.createdAt = inviteData.createdAt;
        this.inviter = inviteData.inviter;
        this.maxAge = inviteData.maxAge;
        this.maxUses = inviteData.maxUses;
        this.temporary = Boolean(inviteData.temporary);
        this.uses = inviteData.uses;
        this.targetUser = inviteData.targetUser;
        this.targetUserType = inviteData.targetUserType;
    }

    /**
     * From Raw Data
     *
     * Create an `Invite` from a `RawInviteData` object
     *
     * @param rawData The raw data from the API
     *
     * @returns {Invite} The invite
     */
    static _fromRawData(client: Client, rawData: RawInviteData): Invite {
        return fromRawData(client, rawData);
    }

    /**
     * Resolve Code
     *
     * Resolve an object to an invite code
     *
     * @param inviteResolvable The invite resolvable
     *
     * @returns {string | undefined} The resolved invite code, or `undefined` if the invite resolvable is invalid
     */
    static resolveCode(inviteResolvable: InviteResolvable): string | undefined {
        return resolveCode(inviteResolvable);
    }
}