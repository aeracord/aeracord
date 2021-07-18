import { Base, ChannelResolvable, Client, CreateGuildBanData, MemberData, ModifyGuildMemberData, RawMemberData, RoleResolvable, READY_STATE_READY, UserData } from "../../internal";
import dataFromRawData from "./dataFromRawData";
import fromData from "./fromData";
import toData from "./toData";
import updateObject from "./updateObject";
import updateObjectFromData from "./updateObjectFromData";

export default class Member extends Base<Member> {

    /**
     * Guild ID
     *
     * The ID of the guild this member is in
     */
    guildID: string;

    /**
     * Nickname
     *
     * The member's nickname
     */
    nickname: string | null;

    /**
     * Roles
     *
     * The IDs of the roles this member has
     */
    roles: string[];

    /**
     * Joined At
     *
     * The timestamp for when the member joined the guild
     */
    joinedAt: number;

    /**
     * Premium Since
     *
     * The timestamp for when the member started boosting the guild
     */
    premiumSince: number | null;

    /**
     * Pending
     *
     * Whether or not this member has not passed membership screening yet
     */
    pending: boolean;

    /**
     * User
     *
     * The member's user object
     */
    user: UserData;

    /**
     * Member
     *
     * @param client The client
     * @param memberData Options to initialize this member with
     * @param memberData.guildID The ID of the guild this member is in
     * @param memberData.nickname The member's nickname
     * @param memberData.roles The IDs of the roles this member has
     * @param memberData.muted Whether or not this member is muted
     * @param memberData.deafened Whether or not this member is deafened
     * @param memberData.joinedAt The timestamp for when the member joined the guild
     * @param memberData.premiumSince The timestamp for when the member started boosting the guild
     * @param memberData.pending Whether or not this member has not passed membership screening yet
     * @param memberData.user The member's user object
     */
    constructor(client: Client, memberData: MemberData) {

        // Super
        super(client, {
            id: `${memberData.guildID}_${memberData.user.id}`,
            cacheManager: client._members._cacheManager
        });

        // Set data
        Member._updateObject(this, memberData);

        /**
         * Cache Member
         *
         * If we need to cache all members and the clients ready state is `READY`
         * The ready state needs to be `READY` since the client might need to fetch data to cache initial objects
         */
        if ((client._members.cacheAll) && (client._readyState === READY_STATE_READY)) this.cache();
    }

    /**
     * From Raw Data
     *
     * Create a `MemberData` object from a `RawMemberData` object
     *
     * @private
     * @param client The client
     * @param rawData The raw data from the API
     * @param guildID The ID of the guild this member is in
     *
     * @returns {Member} The member
     */
    static _fromRawData(client: Client, rawData: RawMemberData, guildID: string): Member {
        return Member.fromData(client, Member._dataFromRawData(rawData, guildID));
    }

    /**
     * Data From Raw Data
     *
     * Create a `MemberData` object from a `RawMemberData` object
     *
     * @private
     * @param rawData The raw data from the API
     * @param guildID The ID of the guild this member is in
     *
     * @returns {MemberData} The member data
     */
    static _dataFromRawData(rawData: RawMemberData, guildID: string): MemberData {
        return dataFromRawData(rawData, guildID);
    }

    /**
     * From Data
     *
     * Create a `Member` from a `MemberData` object
     *
     * @param client The client
     * @param memberData The member data
     *
     * @returns {Member} The member
     */
    static fromData(client: Client, memberData: MemberData): Member {
        return fromData(client, memberData);
    }

    /**
     * To Data
     *
     * Create a `MemberData` object from a `Member`
     *
     * @param member The member
     *
     * @returns {MemberData} The member data
     */
    static toData(member: Member): MemberData {
        return toData(member);
    }

    /**
     * Update Object
     *
     * Update the `Member` object with data from a `MemberData` object
     *
     * @private
     * @param member The member to update
     * @param memberData The data to update this member with
     */
    static _updateObject(member: Member, memberData: MemberData) {
        updateObject(member, memberData);
    }

    /**
     * Update Object From Data
     *
     * Update the `Member` object with data from a `MemberData` object if it's cached
     *
     * @private
     * @param client The client
     * @param memberData The member data
     *
     * @returns {Member | undefined} The member
     */
    static _updateObjectFromData(client: Client, memberData: MemberData): Member | undefined {
        return updateObjectFromData(client, memberData);
    }

    /**
     * Cache
     *
     * Cache this `Member`
     *
     * @param expiresIn The amount of time for when this object can be garbage collected
     * `null` if it should never expire from cache
     * `undefined` to use the cache manager's default
     */
    cache(expiresIn?: number | null) {
        this.client._members.cache(this.guildID, this.user.id, this, expiresIn);
    }

    /**
     * Add Role
     *
     * Add a role to this member
     *
     * @param role The role to add
     * @param reason The reason for adding the role
     */
    addRole(role: RoleResolvable, reason?: string): Promise<void> {
        return this.client.addGuildMemberRole(this.guildID, this, role, reason);
    }

    /**
     * Add to Thread
     *
     * Add this member to a thread
     *
     * @param channel The thread channel to add this member to
     * @param parentChannel The thread's parent channel
     * Optional, but required to check permissions
     */
    addToThread(channel: ChannelResolvable, parentChannel?: ChannelResolvable): Promise<void> {
        return this.client.addThreadMember(channel, this, parentChannel);
    }

    /**
     * Ban
     *
     * Ban this member from the guild
     *
     * @param createGuildBanData The data for the ban
     */
    ban(createGuildBanData?: CreateGuildBanData): Promise<void> {
        return this.client.createGuildBan(this.guildID, this, createGuildBanData);
    }

    /**
     * Edit
     *
     * Edit this member
     *
     * @param modifyGuildMemberData The data to modify the member
     * @param reason The reason for modifying this member
     *
     * @returns {Promise<Member>} The modified member
     */
    edit(modifyGuildMemberData: ModifyGuildMemberData, reason?: string): Promise<Member> {
        return this.client.modifyGuildMember(this.guildID, this, modifyGuildMemberData, reason);
    }

    /**
     * Unban
     *
     * Unban this member from the guild
     *
     * @param reason The reason for unbanning this member
     */
    unban(reason?: string): Promise<void> {
        return this.client.removeGuildBan(this.guildID, this, reason);
    }

    /**
     * Kick
     *
     * Kick this member from the guild
     *
     * @param reason The reason for kicking this member
     */
    kick(reason?: string): Promise<void> {
        return this.client.removeGuildMember(this.guildID, this, reason);
    }

    /**
     * Remove From Thread
     *
     * Remove this member from a thread
     *
     * @param channel The thread channel to remove this member from
     * @param parentChannel The thread's parent channel
     * Optional, but required to check permissions
     */
    removeFromThread(channel: ChannelResolvable, parentChannel?: ChannelResolvable): Promise<void> {
        return this.client.removeThreadMember(channel, this, parentChannel);
    }

    /**
     * Remove Role
     *
     * Remove a role from this member
     *
     * @param role The role to remove
     * @param reason The reason for removing the role
     */
    removeRole(role: RoleResolvable, reason?: string): Promise<void> {
        return this.client.removeGuildMemberRole(this.guildID, this, role, reason);
    }
}