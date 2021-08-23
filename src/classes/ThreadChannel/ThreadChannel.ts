import { ChannelTypes, Client, ReadyStates, ThreadChannelData, ThreadMember, ThreadMemberData, UserResolvable } from "../../internal";
import TextBasedChannel from "../TextBasedChannel/TextBasedChannel";
import cacheThreadPermissions, { CacheThreadPermissionsData } from "./cacheThreadPermissions";
import recalculateThreadPermissions from "./recalculateThreadPermissions";
import uncacheThreadPermissions, { UncacheThreadPermissionsData } from "./uncacheThreadPermissions";
import updateObject from "./updateObject";

export type ThreadChannelType = typeof ChannelTypes.NEWS_THREAD | typeof ChannelTypes.PUBLIC_THREAD | typeof ChannelTypes.PRIVATE_THREAD;

export default class ThreadChannel extends TextBasedChannel {

    /**
     * Type
     *
     * The channel's type
     */
    type: ThreadChannelType;

    /**
     * Name
     *
     * The thread's name
     */
    name: string;

    /**
     * Guild ID
     *
     * The ID of the guild this thread is in
     */
    guildID: string;

    /**
     * Parent ID
     *
     * The ID of this thread's parent channel
     */
    parentID: string;

    /**
     * Creator ID
     *
     * The ID of the user that created this thread
     */
    creatorID: string;

    /**
     * Private
     *
     * Whether or not this thread is private
     */
    get private(): boolean {
        return this.type === ChannelTypes.PRIVATE_THREAD;
    }

    /**
     * Archived
     *
     * Whether or not this thread is archived
     */
    archived: boolean;

    /**
     * Auto Archived Duration
     *
     * The amount of time in minutes after inactivity that this thread will automatically be archived
     */
    autoArchivedDuration: number;

    /**
     * Archived At
     *
     * The timestamp for when this thread's archived status was last updated
     */
    archivedAt?: number;

    /**
     * Locked
     *
     * Whether or not this thread is locked
     */
    locked: boolean;

    /**
     * Invitable
     *
     * Whether or not non-moderators can add other non-moderators to this thread
     */
    invitable: boolean;

    /**
     * Member
     *
     * The thread member data for the client
     */
    member?: ThreadMemberData;

    /**
     * Message Count
     *
     * The approximate number of messages in this thread
     * This value stops counting at 50
     */
    messageCount: number;

    /**
     * Member Count
     *
     * The approximate number of members in this thread
     * This value stops counting at 50
     */
    memberCount: number;

    /**
     * Thread Channel
     *
     * @param client The client
     * @param threadChannelData Options to initialize this thread channel with
     * @param threadChannelData.name The thread's name
     * @param threadChannelData.guildID The ID of the guild this thread is in
     * @param threadChannelData.parentID The ID of this thread's parent channel
     * @param threadChannelData.creatorID The ID of the user that created this thread
     * @param threadChannelData.archived Whether or not this thread is archived
     * @param threadChannelData.autoArchivedDuration The amount of time in minutes after inactivity that this thread will automatically be archived
     * @param threadChannelData.archivedAt The timestamp for when this thread's archived status was last updated
     * @param threadChannelData.locked Whether or not this thread is locked
     * @param threadChannelData.member The thread member data for the client
     * @param threadChannelData.messageCount The approximate number of messages in this thread
     * @param threadChannelData.memberCount The approximate number of members in this thread
     */
    constructor(client: Client, threadChannelData: ThreadChannelData) {

        // Super
        super(client, threadChannelData);

        // Set data
        ThreadChannel._updateObject(this, threadChannelData, true);

        /**
         * Cache Thread Channel
         *
         * If we need to cache all thread channels and the clients ready state is `READY`
         * The ready state needs to be `READY` since the client might need to fetch data to cache initial objects
         */
        if ((client._threads.cacheAll) && (client._readyState === ReadyStates.READY)) this.cache();
    }

    /**
     * Update Object
     *
     * Update the `ThreadChannel` object with data from a `ThreadChannelData` object
     *
     * @private
     * @param threadChannel The thread channel to update
     * @param threadChannelData The data to update the thread channel with
     * @param fromConstructor Should only be `true` when called from this class's constructor
     */
    static _updateObject(threadChannel: ThreadChannel, threadChannelData: ThreadChannelData, fromConstructor?: boolean) {
        updateObject(threadChannel, threadChannelData, fromConstructor);
    }

    /**
     * Cache Thread Permissions
     *
     * Cache the thread channel's permissions
     *
     * @private
     * @param client The client
     * @param cacheThreadPermissionsData The data for caching the thread's permissions
     */
    static _cacheThreadPermissions(client: Client, cacheThreadPermissionsData: CacheThreadPermissionsData) {
        cacheThreadPermissions(client, cacheThreadPermissionsData);
    }

    /**
     * Uncache Thread Permissions
     *
     * Uncache the thread channel's permissions
     *
     * @private
     * @param client The client
     * @param uncacheThreadPermissionsData The data for uncaching the thread's permissions
     */
    static _uncacheThreadPermissions(client: Client, uncacheThreadPermissionsData: UncacheThreadPermissionsData) {
        uncacheThreadPermissions(client, uncacheThreadPermissionsData);
    }

    /**
     * Recalculate Thread Permissions
     *
     * Recalculate all the thread channel permissions in a guild
     *
     * @private
     * @param client The client
     * @param guildID The ID of the guild to recalculate the thread channel permissions for
     */
    static _recalculateThreadPermissions(client: Client, guildID: string) {
        recalculateThreadPermissions(client, guildID);
    }

    /**
     * Cache
     *
     * Cache this `ThreadChannel`
     *
     * @param expiresIn The amount of time for when this object can be garbage collected
     * `null` if it should never expire from cache
     * `undefined` to use the cache manager's default
     */
    cache(expiresIn?: number | null) {
        this.client._threads.cache(this.id, this, expiresIn);
    }

    /**
     * Add Member
     *
     * Add a member to this thread
     *
     * @param user The user resolvable for the member to add to the thread
     */
    addMember(user: UserResolvable): Promise<void> {
        return this.client.addThreadMember(this, user);
    }

    /**
     * Get Members
     *
     * Get the members of this thread
     *
     * @returns {Promise<ThreadMember[]>} The thread members
     */
    getMembers(): Promise<ThreadMember[]> {
        return this.client.listThreadMembers(this);
    }

    /**
     * Join
     *
     * Join this thread
     */
    join(): Promise<void> {
        return this.client.joinThread(this);
    }

    /**
     * Leave
     *
     * Leave this thread
     */
    leave(): Promise<void> {
        return this.client.leaveThread(this);
    }

    /**
     * Remove Member
     *
     * Remove a member from this thread
     *
     * @param user The user resolvable for the member to remove from the thread
     */
    removeMember(user: UserResolvable): Promise<void> {
        return this.client.removeThreadMember(this, user);
    }
}