import { Base, Client, RawInviteData, UserData } from "../../internal";
import fromData from "./fromData";
import fromRawData from "./fromRawData";
import resolveCode from "./resolveCode";
import updateObject from "./updateObject";

export interface InviteData {
    code: string;
    channelID: string;
    guildID: string;
    createdAt?: number;
    inviter: UserData | null;
    maxAge?: number;
    maxUses?: number;
    temporary?: boolean;
    uses?: number;
    targetUser: TargetUser | null;
    targetUserType: TargetUserType | null;
}

export interface TargetUser {
    id: string;
    username: string;
    discriminator: string;
    avatar: string | null;
}

export type TargetUserType = typeof TARGET_USER_TYPE_STREAM;
export const TARGET_USER_TYPE_STREAM = 1;

export type InviteResolvable = Invite | string;

export default class Invite extends Base<Invite> {

    /**
     * Code
     *
     * The invite's code
     */
    get code(): string {
        return this.id;
    }

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

        // Super
        super(client, {
            id: inviteData.code,
            cacheManager: client._invites
        });

        // Set data
        Invite._updateObject(this, inviteData);

        // Cache invite
        this.client._invites.cache(this.id, this);
    }

    /**
     * From Raw Data
     *
     * Create an `InviteData` object from a `RawInviteData` object
     *
     * @param rawData The raw data from the API
     *
     * @returns {InviteData} The invite data
     */
    static _fromRawData(rawData: RawInviteData): InviteData {
        return fromRawData(rawData);
    }

    /**
     * From Data
     *
     * Create an `Invite` from an `InviteData` object
     *
     * @param client The client
     * @param inviteData The invite data
     *
     * @returns {Invite} The invite
     */
    static fromData(client: Client, inviteData: InviteData): Invite {
        return fromData(client, inviteData);
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

    /**
     * Update Object
     *
     * Update the `Invite` object with data from an `InviteData` object
     *
     * @param invite The invite to update
     * @param inviteData The data to update this invite with
     */
    static _updateObject(invite: Invite, inviteData: InviteData) {
        updateObject(invite, inviteData);
    }

    /**
     * Delete
     *
     * Delete this invite
     *
     * @returns {Promise<InviteData>} The deleted invite's data
     */
    delete(): Promise<InviteData> {
        return this.client.deleteInvite(this);
    }
}