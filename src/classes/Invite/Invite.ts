import { Base, Client, InviteData, RawInviteData, READY_STATE_READY, TargetUser, TargetUserType, User } from "../../internal";
import dataFromRawData from "./dataFromRawData";
import fromData from "./fromData";
import resolveCode from "./resolveCode";
import toData from "./toData";
import updateObject from "./updateObject";
import updateObjectFromData from "./updateObjectFromData";

/**
 * Invite Resolvable
 *
 * The types that can be resolved to an invite
 */
export type InviteResolvable = Invite | InviteData | string;

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
    inviter: User | null;

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

        /**
         * Cache Invite
         *
         * If we need to cache all bans and the clients ready state is `READY`
         * The ready state needs to be `READY` since the client might need to fetch data to cache initial objects
         */
        if (client._invites.cacheAll && client._readyState === READY_STATE_READY) this.client._invites.cache(this.id, this);
    }

    /**
     * From Raw Data
     *
     * Create an `InviteData` object from a `RawInviteData` object
     *
     * @private
     * @param client The client
     * @param rawData The raw data from the API
     *
     * @returns {Invite} The invite
     */
    static _fromRawData(client: Client, rawData: RawInviteData): Invite {
        return Invite.fromData(client, Invite._dataFromRawData(rawData));
    }

    /**
     * Data From Raw Data
     *
     * Create an `InviteData` object from a `RawInviteData` object
     *
     * @private
     * @param rawData The raw data from the API
     *
     * @returns {InviteData} The invite data
     */
    static _dataFromRawData(rawData: RawInviteData): InviteData {
        return dataFromRawData(rawData);
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
     * To Data
     *
     * Create an `InviteData` object from an `Invite`
     *
     * @param invite The invite
     *
     * @returns {InviteData} The invite data
     */
    static toData(invite: Invite): InviteData {
        return toData(invite);
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
     * @private
     * @param invite The invite to update
     * @param inviteData The data to update this invite with
     */
    static _updateObject(invite: Invite, inviteData: InviteData) {
        updateObject(invite, inviteData);
    }

    /**
     * Update Object From Data
     *
     * Update the `Invite` object with data from an `InviteData` object if it's cached
     *
     * @private
     * @param client The client
     * @param inviteData The invite data
     *
     * @returns {Invite | undefined} The invite
     */
    static _updateObjectFromData(client: Client, inviteData: InviteData): Invite | undefined {
        return updateObjectFromData(client, inviteData);
    }

    /**
     * Cache
     *
     * Cache this `Invite`
     *
     * @param expiresIn The amount of time for when this object can be garbage collected
     * `null` if it should never expire from cache
     * `undefined` to use the cache manager's default
     */
    cache(expiresIn?: number | null) {
        this.client._invites.cache(this.id, this, expiresIn);
    }

    /**
     * Delete
     *
     * Delete this invite
     *
     * @param reason The reason for deleting this invite
     *
     * @returns {Promise<Invite>} The deleted invite
     */
    delete(reason?: string): Promise<Invite> {
        return this.client.deleteInvite(this.channelID, this, reason);
    }
}