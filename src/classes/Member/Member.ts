import { Client, RawMemberData, UserData } from "../../internal";
import fromData from "./fromData";
import fromRawData from "./fromRawData";

export interface MemberData {
    guildID: string;
    nickname?: string;
    roles: string[];
    muted?: boolean;
    deafened?: boolean;
    joinedAt: number;
    premiumSince?: number;
    pending?: boolean;
    user: UserData;
}

export default class Member {

    /**
     * Client
     *
     * The client
     */
    client: Client;

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
    nickname?: string;

    /**
     * Roles
     *
     * The IDs of the roles this member has
     */
    roles: string[];

    /**
     * Muted
     *
     * Whether or not this member is muted
     */
    muted: boolean;

    /**
     * Deafened
     *
     * Whether or not this member is deafened
     */
    deafened: boolean;

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
    premiumSince?: number;

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

        // Set data
        this.client = client;
        this.guildID = memberData.guildID;
        this.nickname = memberData.nickname;
        this.roles = memberData.roles;
        this.muted = Boolean(memberData.muted);
        this.deafened = Boolean(memberData.deafened);
        this.joinedAt = memberData.joinedAt;
        this.premiumSince = memberData.premiumSince;
        this.pending = Boolean(memberData.pending);
        this.user = memberData.user;
    }

    /**
     * From Raw Data
     *
     * Create a `MemberData` object from a `RawMemberData` object
     *
     * @param rawData The raw data from the API
     *
     * @returns {MemberData} The member data
     */
    static _fromRawData(rawData: RawMemberData, guildID: string): MemberData {
        return fromRawData(rawData, guildID);
    }

    /**
     * From Data
     *
     * Create a `Member` from a `MemberData` object
     *
     * @param memberData The member data
     *
     * @returns {Member} The member
     */
    static fromData(client: Client, memberData: MemberData): Member {
        return fromData(client, memberData);
    }
}