import { Base, Client, RawThreadMemberData, READY_STATE_READY, ThreadMemberData } from "../../internal";
import dataFromRawData from "./dataFromRawData";
import fromData from "./fromData";
import toData from "./toData";
import updateObject from "./updateObject";
import updateObjectFromData from "./updateObjectFromData";

export default class ThreadMember extends Base<ThreadMember> {

    /**
     * Thread ID
     *
     * The ID of the thread channel this thread member is in
     */
    threadID: string;

    /**
     * Guild ID
     *
     * The ID of the guild this thread member is in
     */
    guildID: string;

    /**
     * User ID
     *
     * The user ID of the thread member
     */
    userID: string;

    /**
     * Joined At
     *
     * The timestamp for when the member joined the thread
     */
    joinedAt: number;

    /**
     * Flags
     *
     * The thread member's flags
     */
    flags: number;

    /**
     * Member
     *
     * @param client The client
     * @param threadMemberData Options to initialize this member with
     * @param threadMemberData.guildID The ID of the guild this thread member is in
     * @param threadMemberData.threadID The ID of the thread channel this thread member is in
     * @param threadMemberData.userID The user ID of the thread member
     * @param threadMemberData.joinedAt The timestamp for when the member joined the thread
     * @param threadMemberData.flags The thread member's flags
     */
    constructor(client: Client, threadMemberData: ThreadMemberData) {

        // Super
        super(client, {
            id: `${threadMemberData.threadID}_${threadMemberData.userID}`,
            cacheManager: client._threadMembers._cacheManager
        });

        // Set data
        ThreadMember._updateObject(this, threadMemberData);

        /**
         * Cache Thread Member
         *
         * If we need to cache all thread members and the clients ready state is `READY`
         * The ready state needs to be `READY` since the client might need to fetch data to cache initial objects
         */
        if ((client._threadMembers.cacheAll) && (client._readyState === READY_STATE_READY)) this.cache();
    }

    /**
     * From Raw Data
     *
     * Create a `ThreadMemberData` object from a `RawThreadMemberData` object
     *
     * @private
     * @param client The client
     * @param rawData The raw data from the API
     * @param guildID The ID of the guild this thread member is in
     *
     * @returns {ThreadMember} The thread member
     */
    static _fromRawData(client: Client, rawData: RawThreadMemberData, guildID: string): ThreadMember {
        return ThreadMember.fromData(client, ThreadMember._dataFromRawData(rawData, guildID));
    }

    /**
     * Data From Raw Data
     *
     * Create a `ThreadMemberData` object from a `RawThreadMemberData` object
     *
     * @private
     * @param rawData The raw data from the API
     * @param guildID The ID of the guild this thread member is in
     *
     * @returns {ThreadMemberData} The thread member data
     */
    static _dataFromRawData(rawData: RawThreadMemberData, guildID: string): ThreadMemberData {
        return dataFromRawData(rawData, guildID);
    }

    /**
     * From Data
     *
     * Create a `ThreadMember` from a `ThreadMemberData` object
     *
     * @param client The client
     * @param threadMemberData The thread member data
     *
     * @returns {ThreadMember} The thread member
     */
    static fromData(client: Client, threadMemberData: ThreadMemberData): ThreadMember {
        return fromData(client, threadMemberData);
    }

    /**
     * To Data
     *
     * Create a `ThreadMemberData` object from a `ThreadMember`
     *
     * @param threadMember The thread member
     *
     * @returns {ThreadMemberData} The thread member data
     */
    static toData(threadMember: ThreadMember): ThreadMemberData {
        return toData(threadMember);
    }

    /**
     * Update Object
     *
     * Update the `ThreadMember` object with data from a `ThreadMemberData` object
     *
     * @private
     * @param threadMember The thread member to update
     * @param threadMemberData The data to update this thread member with
     */
    static _updateObject(threadMember: ThreadMember, threadMemberData: ThreadMemberData) {
        updateObject(threadMember, threadMemberData);
    }

    /**
     * Update Object From Data
     *
     * Update the `ThreadMember` object with data from a `ThreadMemberData` object if it's cached
     *
     * @private
     * @param client The client
     * @param threadMemberData The thread member data
     *
     * @returns {ThreadMember | undefined} The thread member
     */
    static _updateObjectFromData(client: Client, threadMemberData: ThreadMemberData): ThreadMember | undefined {
        return updateObjectFromData(client, threadMemberData);
    }

    /**
     * Cache
     *
     * Cache this `ThreadMember`
     *
     * @param expiresIn The amount of time for when this object can be garbage collected
     * `null` if it should never expire from cache
     * `undefined` to use the cache manager's default
     */
    cache(expiresIn?: number | null) {
        this.client._threadMembers.cache(this.threadID, this.userID, this, expiresIn);
    }

    /**
     * Remove
     *
     * Remove this member from the thread
     */
    remove(): Promise<void> {
        return this.client.removeThreadMember(this.threadID, this.userID);
    }
}